'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { AgentEvent } from '@/types/events';
import { streamUrl } from '@/lib/api';

interface UseSSEOptions {
    onDone?: () => void;
    onError?: (err: string) => void;
}

export function useSSE(sessionId: string | null, opts?: UseSSEOptions) {
    const [events, setEvents] = useState<AgentEvent[]>([]);
    const [isDone, setIsDone] = useState(false);
    const esRef = useRef<EventSource | null>(null);

    const reset = useCallback(() => {
        setEvents([]);
        setIsDone(false);
    }, []);

    useEffect(() => {
        if (!sessionId) return;

        // Close any previous connection
        esRef.current?.close();
        reset();

        const es = new EventSource(streamUrl(sessionId));
        esRef.current = es;

        es.onmessage = (e) => {
            const raw = e.data as string;
            if (raw === '[DONE]') {
                setIsDone(true);
                es.close();
                opts?.onDone?.();
                return;
            }
            try {
                const event = JSON.parse(raw) as AgentEvent;
                setEvents((prev) => [...prev, event]);
                if (event.type === 'error') {
                    opts?.onError?.((event as import('@/types/events').ErrorEvent).message);
                }
            } catch {
                // ignore malformed
            }
        };

        es.onerror = () => {
            setIsDone(true);
            es.close();
        };

        return () => {
            es.close();
        };
    }, [sessionId]); // eslint-disable-line react-hooks/exhaustive-deps

    return { events, isDone, reset };
}
