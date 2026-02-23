

"""
Implementation loop agents for ADK system.

This module creates the coding and review agents that work together in an
iterative loop to implement and verify solutions.
"""

import logging
import logging.handlers
import queue

from google.adk.agents.callback_context import CallbackContext
from google.adk.planners import BuiltInPlanner
from google.genai import types

from agentic_data_scientist.agents.adk.event_compression import create_compression_callback
from agentic_data_scientist.agents.adk.loop_detection import LoopDetectionAgent
from agentic_data_scientist.agents.adk.review_confirmation import create_review_confirmation_agent
from agentic_data_scientist.agents.adk.utils import CODING_MODEL, CODING_MODEL_NAME, REVIEW_MODEL, get_generate_content_config
from agentic_data_scientist.prompts import load_prompt


# ---------------------------------------------------------------------------
# Async logging — QueueHandler is non-blocking; a daemon thread (QueueListener)
# drains the queue and dispatches to the real StreamHandler.
# ---------------------------------------------------------------------------
_log_queue: queue.Queue = queue.Queue(-1)  # unbounded; never blocks callers

_stream_handler = logging.StreamHandler()
_stream_handler.setFormatter(
    logging.Formatter(
        "%(asctime)s %(levelname)-8s %(name)s — %(message)s",
        datefmt="%Y-%m-%dT%H:%M:%S",
    )
)

_queue_listener = logging.handlers.QueueListener(
    _log_queue, _stream_handler, respect_handler_level=True
)
_queue_listener.start()  # daemon thread — cleaned up automatically on process exit

logger = logging.getLogger(__name__)
logger.addHandler(logging.handlers.QueueHandler(_log_queue))
logger.propagate = False  # prevent double-emission via the root logger

# Configuration
TOOL_LOOP_LIMIT = 5
CODING_EVENT_LIMIT = 100
MAX_EVENTS_TO_KEEP = 20


def trim_history_to_recent_events(callback_context: CallbackContext, max_events: int = CODING_EVENT_LIMIT):
    """
    Simple callback to keep only the most recent events in history.

    This prevents token overflow by maintaining a fixed window of context.

    Parameters
    ----------
    callback_context : CallbackContext
        The callback context with session access
    max_events : int, optional
        Maximum number of events to keep (default: CODING_EVENT_LIMIT)
    """
    try:
        session = callback_context._invocation_context.session
        events = session.events
    except AttributeError as e:
        logger.warning(f"[DEBUG] Cannot access session events: {e}")
        return

    logger.info(f"[DEBUG] trim_history_to_recent_events called: {len(events)} events, max={max_events}")

    if len(events) > max_events:
        # Keep only the most recent events
        # CRITICAL FIX: Use slice assignment instead of pop(0) in loop
        # pop(0) is O(N) per operation, making this O(N²) total
        # Slice assignment is O(N) total - much more efficient
        events_to_remove = len(events) - max_events
        logger.info(f"[DEBUG] Trimming {events_to_remove} old events, keeping {max_events} most recent")

        # Efficient slice removal: events[:] = events[start:] modifies list in-place
        events[:] = events[events_to_remove:]

        logger.info(f"[DEBUG] After trimming: {len(events)} events remain")


def make_implementation_agents(working_dir: str, tools: list):
    """
    Create the implementation agents (coding + review + confirmation).

    Parameters
    ----------
    working_dir : str
        Working directory for the session
    tools : list
        List of tool functions available to agents

    Returns
    -------
    tuple
        (coding_agent, review_agent, review_confirmation_agent)
    """
    logger.info(f"[AgenticDS] Initializing implementation agents with {len(tools)} tools")

    # Create compression callbacks before the if/else block so they are available in both branches.
    logger.info("[AgenticDS] Creating coding compression callback (event_threshold=60, overlap_size=20)")
    coding_compression_callback = create_compression_callback(
        event_threshold=60,
        overlap_size=20,
    )
    logger.info("[AgenticDS] Coding compression callback created")

    # If the coding model is Gemini, use a standard LoopDetectionAgent with coding instructions.
    # Otherwise, use the specialized ClaudeCodeAgent.
    is_gemini_coding = CODING_MODEL_NAME.startswith(("gemini/", "google/", "gemini-"))

    if is_gemini_coding:
        logger.info(f"[AgenticDS] Using Gemini-based coding agent with model: {CODING_MODEL_NAME}")
        logger.info("[AgenticDS] Loading coding prompt: 'coding_base'")
        coding_prompt = load_prompt("coding_base")
        logger.info("[AgenticDS] Coding prompt loaded successfully")

        logger.info("[AgenticDS] Instantiating Gemini LoopDetectionAgent as coding_agent")
        coding_agent = LoopDetectionAgent(
            name="coding_agent",
            description="A coding agent that uses Gemini to implement plans.",
            instruction=coding_prompt,
            model=CODING_MODEL,
            tools=tools,
            planner=BuiltInPlanner(
                thinking_config=types.ThinkingConfig(
                    include_thoughts=True,
                    thinking_budget=-1,
                ),
            ),
            generate_content_config=get_generate_content_config(temperature=0.0),
            output_key="implementation_summary",
            after_agent_callback=coding_compression_callback,
        )
        logger.info("[AgenticDS] Gemini coding_agent instantiated")
    else:
        logger.info(f"[AgenticDS] Using ClaudeCodeAgent for coding with model: {CODING_MODEL_NAME}")
        logger.info("[AgenticDS] Importing ClaudeCodeAgent")
        from agentic_data_scientist.agents.claude_code import ClaudeCodeAgent

        logger.info(f"[AgenticDS] Instantiating ClaudeCodeAgent (working_dir='{working_dir}')")
        coding_agent = ClaudeCodeAgent(
            name="coding_agent",
            description="A coding agent that uses Claude Code SDK to implement plans.",
            working_dir=working_dir,
            output_key="implementation_summary",
            after_agent_callback=coding_compression_callback,  # Explicit callback for event compression
        )
        logger.info("[AgenticDS] ClaudeCodeAgent coding_agent instantiated")

    # Review Agent - Uses ADK with loop detection
    logger.info("[AgenticDS] Creating review agent")

    # Load review prompt
    logger.info("[AgenticDS] Loading review prompt: 'coding_review'")
    review_prompt = load_prompt("coding_review")
    logger.info("[AgenticDS] Review prompt loaded successfully")

    # Create compression callback for review agent
    logger.info("[AgenticDS] Creating review compression callback (event_threshold=40, overlap_size=20)")
    review_compression_callback = create_compression_callback(
        event_threshold=40,
        overlap_size=20,
    )
    logger.info("[AgenticDS] Review compression callback created")

    logger.info("[AgenticDS] Instantiating LoopDetectionAgent as review_agent")
    review_agent = LoopDetectionAgent(
        name="review_agent",
        description="Reviews implementation and provides feedback or approval.",
        instruction=review_prompt,
        model=REVIEW_MODEL,
        tools=tools,
        planner=BuiltInPlanner(
            thinking_config=types.ThinkingConfig(
                include_thoughts=True,
                thinking_budget=-1,
            ),
        ),
        generate_content_config=get_generate_content_config(temperature=0.0),
        output_key="review_feedback",
        include_contents="none",
        after_agent_callback=review_compression_callback,
    )
    logger.info("[AgenticDS] review_agent instantiated")

    logger.info("[AgenticDS] Creating review confirmation agent (auto_exit_on_completion=True, prompt='implementation_review_confirmation')")
    review_confirmation_agent = create_review_confirmation_agent(
        auto_exit_on_completion=True, prompt_name="implementation_review_confirmation"
    )
    logger.info("[AgenticDS] review_confirmation_agent created")

    logger.info("[AgenticDS] Implementation agents created successfully — returning (coding_agent, review_agent, review_confirmation_agent)")

    # Return coding agent, review agent, AND review confirmation agent
    return (
        coding_agent,
        review_agent,
        review_confirmation_agent,
    )
