"""
Utility functions and configurations for ADK agents.

This module provides model configuration, helper functions, and shared settings
for the ADK agent system.
"""

import logging
import os
from typing import Optional

from dotenv import load_dotenv
from google.adk.models.lite_llm import LiteLlm
from google.adk.tools.tool_context import ToolContext
from google.genai import types


load_dotenv()

logger = logging.getLogger(__name__)


# Model configuration
DEFAULT_MODEL_NAME = os.getenv("DEFAULT_MODEL", "google/gemini-2.5-pro")
REVIEW_MODEL_NAME = os.getenv("REVIEW_MODEL", "google/gemini-2.5-pro")
CODING_MODEL_NAME = os.getenv("CODING_MODEL", "claude-sonnet-4-5-20250929")

# Log default model usage on module load
# Moved to function scope to avoid firing before logging is configured
# logger.info(f"[AgenticDS] DEFAULT_MODEL={DEFAULT_MODEL_NAME}")

# Configure LiteLLM for OpenRouter
# OpenRouter requires specific environment variables and configuration
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_API_BASE = os.getenv("OPENROUTER_API_BASE", "https://openrouter.ai/api/v1")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
OR_APP_NAME = os.getenv("OR_APP_NAME", "Agentic Data Scientist")

# Export for use in event compression
__all__ = [
    'DEFAULT_MODEL_NAME',
    'REVIEW_MODEL_NAME',
    'CODING_MODEL_NAME',  # Export model name strings
    'DEFAULT_MODEL',
    'REVIEW_MODEL',
    'CODING_MODEL',
    'OPENROUTER_API_KEY',
    'OPENROUTER_API_BASE',
    'GEMINI_API_KEY',  # Export for direct Gemini API access
    'OR_APP_NAME',  # Export for OpenRouter app name
    'get_generate_content_config',
    'exit_loop_simple',
    'is_network_disabled',
]

# Set up environment keys
if OPENROUTER_API_KEY:
    os.environ["OPENROUTER_API_KEY"] = OPENROUTER_API_KEY
    logger.info("[AgenticDS] OpenRouter API key configured")

if GEMINI_API_KEY:
    # GOOGLE_API_KEY is used by google-genai and LiteLLM
    os.environ["GOOGLE_API_KEY"] = GEMINI_API_KEY
    logger.info("[AgenticDS] Gemini API key configured")

# Create LiteLLM model instances
def create_model(model_name: str) -> LiteLlm:
    """Create a LiteLlm instance configured for OpenRouter or direct Gemini."""
    logger.info(f"[AgenticDS] Initializing model: {model_name}")
    # If the model name starts with gemini/ or google/ or gemini-, and we have GEMINI_API_KEY,
    # we can use direct AI Studio instead of OpenRouter.
    is_gemini = model_name.startswith(("gemini/", "google/", "gemini-"))
    use_openrouter = OPENROUTER_API_KEY is not None and not (is_gemini and GEMINI_API_KEY)

    return LiteLlm(
        model=model_name,
        num_retries=10,
        timeout=60,
        api_base=OPENROUTER_API_BASE if use_openrouter else None,
        custom_llm_provider="openrouter" if use_openrouter else None,
    )

DEFAULT_MODEL = create_model(DEFAULT_MODEL_NAME)
REVIEW_MODEL = create_model(REVIEW_MODEL_NAME)
CODING_MODEL = create_model(CODING_MODEL_NAME)

# Language requirement (empty for English-only models)
LANGUAGE_REQUIREMENT = ""


def is_network_disabled() -> bool:
    """
    Check if network access is disabled via environment variable.

    Network access is enabled by default. Set DISABLE_NETWORK_ACCESS
    to "true" or "1" to disable network tools.

    Returns
    -------
    bool
        True if network access should be disabled, False otherwise
    """
    disable_network = os.getenv("DISABLE_NETWORK_ACCESS", "").lower()
    return disable_network in ("true", "1")


# DEPRECATED: Use review_confirmation agents instead
# This function is kept for backward compatibility but should not be used in new code.
# Loop exit decisions should be made by dedicated review_confirmation agents with
# structured output and callbacks, not by direct tool calls from review agents.
def exit_loop_simple(tool_context: ToolContext):
    """
    Exit the iterative loop when no further changes are needed.

    DEPRECATED: Use review_confirmation agents instead.

    This function is called by review agents to signal that the iterative
    process should end.

    Parameters
    ----------
    tool_context : ToolContext
        The tool execution context

    Returns
    -------
    dict
        Empty dictionary (tools should return JSON-serializable output)
    """
    if hasattr(tool_context, 'actions') and tool_context.actions:
        tool_context.actions.escalate = True
    return {}


def get_generate_content_config(temperature: float = 0.0, output_tokens: Optional[int] = None) -> types.GenerateContentConfig:
    """
    Create a GenerateContentConfig with retry settings.

    Parameters
    ----------
    temperature : float, optional
        Sampling temperature (default: 0.0)
    output_tokens : int, optional
        Maximum output tokens

    Returns
    -------
    types.GenerateContentConfig
        Configuration for content generation
    """
    return types.GenerateContentConfig(
        temperature=temperature,
        top_p=0.95,
        seed=42,
        max_output_tokens=output_tokens,
        http_options=types.HttpOptions(
            retry_options=types.HttpRetryOptions(
                attempts=50,
                initial_delay=1.0,
                max_delay=30,
                exp_base=1.5,
                jitter=0.5,
                http_status_codes=[429, 500, 502, 503, 504],
            )
        ),
    )
