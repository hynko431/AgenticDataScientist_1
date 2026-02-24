"""
Utility functions for agent orchestration.

Provides logic for normalizing stage indices and ensuring state consistency.
"""

import logging
from typing import Any, Dict, List

logger = logging.getLogger(__name__)

def normalize_stages(stages: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Ensure all stages have sequential indices and consistent structure.
    
    This fixes issues where the stage_reflector might provide duplicate indices
    or inconsistent fields.
    
    Parameters
    ----------
    stages : List[Dict[str, Any]]
        The list of stages from state.
        
    Returns
    -------
    List[Dict[str, Any]]
        Normalized list of stages.
    """
    if not stages:
        return []
        
    normalized = []
    # Sort by original index if present, or maintain order
    source_stages = sorted(stages, key=lambda x: x.get("index", 0))
    
    for i, stage in enumerate(source_stages):
        normalized_stage = {
            "index": i,
            "title": stage.get("title", f"Stage {i}"),
            "description": stage.get("description", "No description provided"),
            "completed": stage.get("completed", False),
            "implementation_result": stage.get("implementation_result"),
        }
        normalized.append(normalized_stage)
        
    return normalized

def deduplicate_stages(stages: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Remove stages with identical titles and descriptions.
    
    Parameters
    ----------
    stages : List[Dict[str, Any]]
        The list of stages.
        
    Returns
    -------
    List[Dict[str, Any]]
        Deduplicated list.
    """
    seen = set()
    deduped = []
    for s in stages:
        # Create a signature for the stage
        sig = (s.get("title", "").strip().lower(), s.get("description", "").strip().lower())
        if sig not in seen:
            deduped.append(s)
            seen.add(sig)
    return deduped
