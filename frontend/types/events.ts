// TypeScript types mirroring Python events.py

export type EventType =
    | 'message'
    | 'function_call'
    | 'function_response'
    | 'file_created'
    | 'usage'
    | 'keepalive'
    | 'error'
    | 'completed';

export interface BaseEvent {
    type: EventType;
    timestamp?: string;
}

export interface MessageEvent extends BaseEvent {
    type: 'message';
    content: string;
    author: string;
    is_thought: boolean;
}

export interface FunctionCallEvent extends BaseEvent {
    type: 'function_call';
    name: string;
    arguments: Record<string, unknown>;
    call_id?: string;
}

export interface FunctionResponseEvent extends BaseEvent {
    type: 'function_response';
    name: string;
    response: string;
    call_id?: string;
}

export interface FileCreatedEvent extends BaseEvent {
    type: 'file_created';
    path: string;
    size?: number;
}

export interface UsageEvent extends BaseEvent {
    type: 'usage';
    input_tokens?: number;
    output_tokens?: number;
    cached_tokens?: number;
}

export interface KeepaliveEvent extends BaseEvent {
    type: 'keepalive';
}

export interface ErrorEvent extends BaseEvent {
    type: 'error';
    message: string;
}

export interface CompletedEvent extends BaseEvent {
    type: 'completed';
    duration: number;
    files_created: string[];
}

export type AgentEvent =
    | MessageEvent
    | FunctionCallEvent
    | FunctionResponseEvent
    | FileCreatedEvent
    | UsageEvent
    | KeepaliveEvent
    | ErrorEvent
    | CompletedEvent;

// Session types
export interface SessionSummary {
    session_id: string;
    query: string;
    mode: 'orchestrated' | 'simple';
    status: 'running' | 'completed' | 'error';
    created_at: string;
    duration: number | null;
    files_created: string[];
    error: string | null;
}

export interface FileNode {
    name: string;
    path: string;
    type: 'file' | 'directory';
    size?: number;
    children?: FileNode[];
}
