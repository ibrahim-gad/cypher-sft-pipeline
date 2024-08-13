// src/stores/usePipelineContext.tsx
import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { loadState, saveState } from '../lib/localStorageUtils';
import useDefaultPromptsContext from "./useDefaultPrompts.tsx";

// Define the shape of the context state
interface PipelineContextState {
    step: number;
    domain: string;
    subdomain: string;
    taxonomyL1: string;
    taxonomyL2: string;
    scenario: string;
    systemPrompt: string;
    schema: string;
    userQuestions: string;
    firstTurnQuestion: string;
    remainingTurnsQuestions: string;
    sampleData: string;
    firstTurn: string;
    remainingTurns: string;
    systemPromptPrompt: string;
    schemaPrompt: string;
    userQuestionsPrompt: string;
    sampleDataPrompt: string;
    firstTurnPrompt: string;
    remainingTurnsPrompt: string;
    setStep: (value: number) => void;
    setDomain: (value: string) => void;
    setSubdomain: (value: string) => void;
    setTaxonomyL1: (value: string) => void;
    setTaxonomyL2: (value: string) => void;
    setScenario: (value: string) => void;
    setSystemPrompt: (value: string) => void;
    setSchema: (value: string) => void;
    setUserQuestions: (value: string) => void;
    setSampleData: (value: string) => void;
    setFirstTurn: (value: string) => void;
    setRemainingTurns: (value: object) => void;
    setSystemPromptPrompt: (value: string) => void;
    setSchemaPrompt: (value: string) => void;
    setUserQuestionsPrompt: (value: string) => void;
    setSampleDataPrompt: (value: string) => void;
    setFirstTurnPrompt: (value: string) => void;
    setRemainingTurnsPrompt: (value: string) => void;
}

// Create the context
export const PipelineContext = createContext<PipelineContextState | undefined>(undefined);

// Define the provider component
export const PipelineProvider = ({ children }: { children: ReactNode }) => {
    const {
        firstTurnPrompt: defaultFirstTurnPrompt,
        remainingTurnsPrompt: defaultRemainingTurnsPrompt,
        sampleDataPrompt: defaultSampleDataPrompt,
        schemaPrompt: defaultSchemaPrompt,
        systemPromptPrompt: defaultSystemPromptPrompt,
        userQuestionsPrompt: defaultUserQuestionsPrompt,
    } = useDefaultPromptsContext();

    const [step, setStep] = useState<number>(parseInt(loadState('step', '0')));

    const [domain, setDomain] = useState<string>(loadState('domain', ''));
    const [subdomain, setSubdomain] = useState<string>(loadState('subdomain', ''));
    const [taxonomyL1, setTaxonomyL1] = useState<string>(loadState('taxonomyL1', ''));
    const [taxonomyL2, setTaxonomyL2] = useState<string>(loadState('taxonomyL2', ''));
    const [scenario, setScenario] = useState<string>(loadState('scenario', ''));

    const [systemPrompt, setSystemPrompt] = useState<string>(loadState('systemPrompt', ''));
    const [schema, setSchema] = useState<string>(loadState('schema', ''));
    const [sampleData, setSampleData] = useState<string>(loadState('sampleData', ''));
    const [userQuestions, setUserQuestions] = useState<string>(loadState('userQuestions', '[]'));

    const [firstTurn, setFirstTurn] = useState<string>(loadState('firstTurn', ''));
    const [remainingTurns, setRemainingTurns] = useState(JSON.parse(loadState('remainingTurns', '{}')));

    const [firstTurnQuestion, setFirstTurnQuestion] = useState<string>(loadState('firstTurnQuestion', ''));
    const [remainingTurnsQuestions, setRemainingTurnsQuestions] = useState<string>(loadState('remainingTurnsQuestions', '[]'));

    const [systemPromptPrompt, setSystemPromptPrompt] = useState<string>(loadState('systemPromptPrompt', defaultSystemPromptPrompt));
    const [schemaPrompt, setSchemaPrompt] = useState<string>(loadState('schemaPrompt', defaultSchemaPrompt));
    const [userQuestionsPrompt, setUserQuestionsPrompt] = useState<string>(loadState('userQuestionsPrompt', defaultUserQuestionsPrompt));
    const [sampleDataPrompt, setSampleDataPrompt] = useState<string>(loadState('sampleDataPrompt', defaultSampleDataPrompt));
    const [firstTurnPrompt, setFirstTurnPrompt] = useState<string>(loadState('firstTurnPrompt', defaultFirstTurnPrompt));
    const [remainingTurnsPrompt, setRemainingTurnsPrompt] = useState<string>(loadState('remainingTurnsPrompt', defaultRemainingTurnsPrompt));

    useEffect(() => {
        saveState('step', ''+step);
    }, [step]);

    useEffect(() => {
        saveState('domain', domain);
    }, [domain]);

    useEffect(() => {
        saveState('subdomain', subdomain);
    }, [subdomain]);

    useEffect(() => {
        saveState('taxonomyL1', taxonomyL1);
    }, [taxonomyL1]);

    useEffect(() => {
        saveState('taxonomyL2', taxonomyL2);
    }, [taxonomyL2]);

    useEffect(() => {
        saveState('scenario', scenario);
    }, [scenario]);

    useEffect(() => {
        saveState('systemPrompt', systemPrompt);
    }, [systemPrompt]);

    useEffect(() => {
        saveState('schema', schema);
    }, [schema]);

    useEffect(() => {
        saveState('userQuestions', userQuestions);
        try {
            setFirstTurnQuestion(eval(userQuestions).filter((item: { turn: number }) => item.turn == 1)[0]?.question || '');
            setRemainingTurnsQuestions(JSON.stringify(eval(userQuestions).filter((item: { turn: number }) => item.turn > 1)));
        } catch (e) {
            console.log("error", e);
        }
    }, [userQuestions]);

    useEffect(() => {
        saveState('firstTurnQuestion', firstTurnQuestion);
    }, [firstTurnQuestion]);
    useEffect(() => {
        saveState('remainingTurnsQuestions', remainingTurnsQuestions);
    }, [remainingTurnsQuestions]);

    useEffect(() => {
        saveState('sampleData', sampleData);
    }, [sampleData]);

    useEffect(() => {
        saveState('firstTurn', firstTurn);
    }, [firstTurn]);

    useEffect(() => {
        saveState('remainingTurns', JSON.stringify(remainingTurns));
    }, [remainingTurns]);

    useEffect(() => {
        saveState('systemPromptPrompt', systemPromptPrompt);
    }, [systemPromptPrompt]);

    useEffect(() => {
        saveState('schemaPrompt', schemaPrompt);
    }, [schemaPrompt]);

    useEffect(() => {
        saveState('userQuestionsPrompt', userQuestionsPrompt);
    }, [userQuestionsPrompt]);

    useEffect(() => {
        saveState('sampleDataPrompt', sampleDataPrompt);
    }, [sampleDataPrompt]);

    useEffect(() => {
        saveState('firstTurnPrompt', firstTurnPrompt);
    }, [firstTurnPrompt]);

    useEffect(() => {
        saveState('remainingTurnsPrompt', remainingTurnsPrompt);
    }, [remainingTurnsPrompt]);

    return (
        <PipelineContext.Provider value={{
            step,
            domain,
            subdomain,
            taxonomyL1,
            taxonomyL2,
            scenario,
            systemPrompt,
            schema,
            userQuestions,
            firstTurnQuestion,
            remainingTurnsQuestions,
            sampleData,
            firstTurn,
            remainingTurns,
            systemPromptPrompt,
            schemaPrompt,
            userQuestionsPrompt,
            sampleDataPrompt,
            firstTurnPrompt,
            remainingTurnsPrompt,
            setStep,
            setDomain,
            setSubdomain,
            setTaxonomyL1,
            setTaxonomyL2,
            setScenario,
            setSystemPrompt,
            setSchema,
            setUserQuestions,
            setSampleData,
            setFirstTurn,
            setRemainingTurns,
            setSystemPromptPrompt,
            setSchemaPrompt,
            setUserQuestionsPrompt,
            setSampleDataPrompt,
            setFirstTurnPrompt,
            setRemainingTurnsPrompt
        }}>
            {children}
        </PipelineContext.Provider>
    );
};

const usePipelineContext = () => {
    const context = useContext(PipelineContext);
    if (!context) {
        throw new Error('usePipeline must be used within a PipelineProvider');
    }
    return context;
};

export default usePipelineContext;