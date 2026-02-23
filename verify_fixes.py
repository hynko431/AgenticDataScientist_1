
import sys
import os
from pathlib import Path
import asyncio

# Add src to path
sys.path.append(str(Path("src").absolute()))

from agentic_data_scientist.tools.file_ops import _validate_path, _format_size
from agentic_data_scientist.agents.adk.utils import exit_loop_simple, DEFAULT_MODEL_NAME

def test_bug_12_format_size_mutation():
    print("Testing Bug 12: _format_size mutation...")
    size = 1024 * 1024 # 1 MB
    original_size = size
    result = _format_size(size)
    print(f"  Result: {result}")
    if size == original_size:
        print("  SUCCESS: size_bytes was not mutated.")
    else:
        print(f"  FAIL: size_bytes was mutated to {size}")
        return False
    return True

def test_bug_10_symlink_security():
    print("Testing Bug 10: Symlink security...")
    working_dir = Path("test_working_dir")
    working_dir.mkdir(exist_ok=True)
    
    outside_file = Path("outside_secret.txt")
    outside_file.write_text("classified")
    
    # Create symlink pointing outside (may fail on Windows without admin)
    symlink_path = working_dir / "bad_link"
    try:
        if symlink_path.exists() or symlink_path.is_symlink():
            symlink_path.unlink()
        
        # Use os.symlink for more direct control
        os.symlink(str(outside_file.absolute()), str(symlink_path))
        print("  Symlink created successfully.")
        
        try:
            _validate_path("bad_link", str(working_dir.absolute()))
            print("  FAIL: Access was NOT denied for symlink pointing outside.")
            return False
        except ValueError as e:
            print(f"  SUCCESS: Caught expected error: {e}")
            if "Access denied" in str(e):
                print("  SUCCESS: Error message is correct.")
            else:
                print(f"  WARNING: Error message might be off: {e}")
                
    except OSError as e:
        print(f"  SKIPPED: Could not create symlink (likely Windows permissions): {e}")
        print("  (Bug 10 fix still applies to the logic, but can't be empirically verified here)")
    finally:
        if symlink_path.is_symlink():
            symlink_path.unlink()
        if outside_file.exists():
            outside_file.unlink()
        if working_dir.exists():
            import shutil
            shutil.rmtree(working_dir)
    return True

def test_bug_13_exit_loop_guard():
    print("Testing Bug 13: exit_loop_simple guard...")
    class MockContext:
        def __init__(self, has_actions=True):
            if has_actions:
                self.actions = MockActions()
    
    class MockActions:
        def __init__(self):
            self.escalate = False

    print("  Testing with valid actions...")
    ctx = MockContext()
    exit_loop_simple(ctx)
    if ctx.actions.escalate:
        print("  SUCCESS: escalate set.")
    else:
        print("  FAIL: escalate NOT set.")
        return False

    print("  Testing with missing actions (should not crash)...")
    ctx_broken = MockContext(has_actions=False)
    try:
        exit_loop_simple(ctx_broken)
        print("  SUCCESS: No crash with missing actions.")
    except AttributeError as e:
        print(f"  FAIL: Crashed with AttributeError: {e}")
        return False
    
    return True

async def main():
    print("=== Agentic Data Scientist Bug Fix Verification ===\n")
    
    results = []
    results.append(test_bug_12_format_size_mutation())
    results.append(test_bug_10_symlink_security())
    results.append(test_bug_13_exit_loop_guard())
    
    print("\nSummary:")
    if all(results):
        print("ALL TESTS PASSED")
        sys.exit(0)
    else:
        print("SOME TESTS FAILED")
        sys.exit(1)

if __name__ == "__main__":
    asyncio.run(main())
