'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type WizardMode = 'orchestrated' | 'simple';

interface WizardState {
    mode: WizardMode;
    query: string;
    files: File[];
    options: {
        optimization: boolean;
        testing: boolean;
        security: boolean;
        docs: boolean;
    };
}

interface WizardContextType {
    state: WizardState;
    setMode: (mode: WizardMode) => void;
    setQuery: (query: string) => void;
    setFiles: (files: File[]) => void;
    setOptions: (options: Partial<WizardState['options']>) => void;
    reset: () => void;
}

const initialState: WizardState = {
    mode: 'orchestrated',
    query: '',
    files: [],
    options: {
        optimization: true,
        testing: true,
        security: false,
        docs: true,
    },
};

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export function WizardProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<WizardState>(initialState);

    const setMode = (mode: WizardMode) => setState((prev) => ({ ...prev, mode }));
    const setQuery = (query: string) => setState((prev) => ({ ...prev, query }));
    const setFiles = (files: File[]) => setState((prev) => ({ ...prev, files }));
    const setOptions = (options: Partial<WizardState['options']>) =>
        setState((prev) => ({ ...prev, options: { ...prev.options, ...options } }));

    const reset = () => setState(initialState);

    return (
        <WizardContext.Provider value={{ state, setMode, setQuery, setFiles, setOptions, reset }}>
            {children}
        </WizardContext.Provider>
    );
}

export function useWizard() {
    const context = useContext(WizardContext);
    if (!context) {
        throw new Error('useWizard must be used within a WizardProvider');
    }
    return context;
}
