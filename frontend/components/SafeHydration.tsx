'use client';

import React, { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => { };

/**
 * SafeHydration component prevents hydration mismatches by ensuring
 * that the children are only rendered on the client side after the 
 * initial hydration is complete.
 * 
 * We use useSyncExternalStore to reliably detect if we are on the client
 * without triggering 'cascading renders' lint warnings associated with 
 * useEffect + setState.
 */
export function SafeHydration({ children }: { children: React.ReactNode }) {
    const isClient = useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false
    );

    if (!isClient) {
        return null;
    }

    return <>{children}</>;
}
