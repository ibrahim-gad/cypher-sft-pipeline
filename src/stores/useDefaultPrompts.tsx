// src/stores/useDefaultPrompts.tsx
import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { loadState, saveState } from '../lib/localStorageUtils';
import {
    defaultFirstTurnPrompt,
    defaultRemainingTurnsPrompt,
    defaultSampleDataPrompt,
    defaultSchemaPrompt,
    defaultSystemPromptPrompt,
    defaultUserQuestionsPrompt,
    defaultCleanSchemaPrompt
} from "../lib/defaultPrompts.ts";

// Define the shape of the context state
interface DefaultPromptsContextState {
    firstTurnPrompt: string;
    remainingTurnsPrompt: string;
    sampleDataPrompt: string;
    schemaPrompt: string;
    cleanSchemaPrompt: string;
    systemPromptPrompt: string;
    userQuestionsPrompt: string;
    setFirstTurnPrompt: (value: string) => void;
    setRemainingTurnsPrompt: (value: string) => void;
    setSampleDataPrompt: (value: string) => void;
    setSchemaPrompt: (value: string) => void;
    setSystemPromptPrompt: (value: string) => void;
    setUserQuestionsPrompt: (value: string) => void;
    setCleanSchemaPrompt: (value: string) => void;
}

// Create the context
export const DefaultPromptsContext = createContext<DefaultPromptsContextState | undefined>(undefined);

// Define the provider component
export const DefaultPromptsProvider = ({ children }: { children: ReactNode }) => {
    const [firstTurnPrompt, setFirstTurnPrompt] = useState<string>(loadState('firstTurnPrompt', defaultFirstTurnPrompt));
    const [remainingTurnsPrompt, setRemainingTurnsPrompt] = useState<string>(loadState('remainingTurnsPrompt', defaultRemainingTurnsPrompt));
    const [sampleDataPrompt, setSampleDataPrompt] = useState<string>(loadState('sampleDataPrompt', defaultSampleDataPrompt));
    const [schemaPrompt, setSchemaPrompt] = useState<string>(loadState('schemaPrompt', defaultSchemaPrompt));
    const [systemPromptPrompt, setSystemPromptPrompt] = useState<string>(loadState('systemPromptPrompt', defaultSystemPromptPrompt));
    const [userQuestionsPrompt, setUserQuestionsPrompt] = useState<string>(loadState('userQuestionsPrompt', defaultUserQuestionsPrompt));
    const [cleanSchemaPrompt, setCleanSchemaPrompt] = useState<string>(loadState('cleanSchemaPrompt', defaultCleanSchemaPrompt));

    useEffect(() => {
        saveState('firstTurnPrompt', firstTurnPrompt);
    }, [firstTurnPrompt]);

    useEffect(() => {
        saveState('remainingTurnsPrompt', remainingTurnsPrompt);
    }, [remainingTurnsPrompt]);

    useEffect(() => {
        saveState('sampleDataPrompt', sampleDataPrompt);
    }, [sampleDataPrompt]);

    useEffect(() => {
        saveState('schemaPrompt', schemaPrompt);
    }, [schemaPrompt]);

    useEffect(() => {
        saveState('systemPromptPrompt', systemPromptPrompt);
    }, [systemPromptPrompt]);

    useEffect(() => {
        saveState('userQuestionsPrompt', userQuestionsPrompt);
    }, [userQuestionsPrompt]);

    return (
        <DefaultPromptsContext.Provider value={{
            firstTurnPrompt,
            remainingTurnsPrompt,
            sampleDataPrompt,
            schemaPrompt,
            systemPromptPrompt,
            userQuestionsPrompt,
            setFirstTurnPrompt,
            setRemainingTurnsPrompt,
            setSampleDataPrompt,
            setSchemaPrompt,
            setSystemPromptPrompt,
            setUserQuestionsPrompt,
            cleanSchemaPrompt,
            setCleanSchemaPrompt
        }}>
            {children}
        </DefaultPromptsContext.Provider>
    );
};

const useDefaultPromptsContext = () => {
    const context = useContext(DefaultPromptsContext);
    if (!context) {
        throw new Error('useDefaultPromptsContext must be used within a DefaultPromptsProvider');
    }
    return context;
};

export default useDefaultPromptsContext;