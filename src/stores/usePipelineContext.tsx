import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { loadState, saveState } from '../lib/localStorageUtils';
import useDefaultPromptsContext from "./useDefaultPrompts.tsx";
import { saveAs } from "file-saver";

import { toast } from 'react-toastify';

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
    cleanedSchema: string;
    userQuestions: string;
    firstTurnQuestion: string;
    remainingTurnsQuestions: string;
    sampleData: string;
    firstTurn: string;
    remainingTurns: string;
    systemPromptPrompt: string;
    schemaPrompt: string;
    cleanSchemaPrompt: string;
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
    setCleanedSchema: (value: string) => void;
    setUserQuestions: (value: string) => void;
    setSampleData: (value: string) => void;
    setFirstTurn: (value: string) => void;
    setRemainingTurns: (value: object) => void;
    setSystemPromptPrompt: (value: string) => void;
    setSchemaPrompt: (value: string) => void;
    setCleanSchemaPrompt: (value: string) => void;
    setUserQuestionsPrompt: (value: string) => void;
    setSampleDataPrompt: (value: string) => void;
    setFirstTurnPrompt: (value: string) => void;
    setRemainingTurnsPrompt: (value: string) => void;
    clearAllChanges: () => void;
    exportPipelineContext: () => void;
    importPipelineContext: (file: File) => void;

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
        cleanSchemaPrompt: defaultCleanSchemaPrompt
    } = useDefaultPromptsContext();

    const [step, setStep] = useState<number>(parseInt(loadState('step', '0')));

    const [domain, setDomain] = useState<string>(loadState('domain', ''));
    const [subdomain, setSubdomain] = useState<string>(loadState('subdomain', ''));
    const [taxonomyL1, setTaxonomyL1] = useState<string>(loadState('taxonomyL1', ''));
    const [taxonomyL2, setTaxonomyL2] = useState<string>(loadState('taxonomyL2', ''));
    const [scenario, setScenario] = useState<string>(loadState('scenario', ''));

    const [systemPrompt, setSystemPrompt] = useState<string>(loadState('systemPrompt', ''));
    const [schema, setSchema] = useState<string>(loadState('schema', ''));
    const [cleanedSchema, setCleanedSchema] = useState<string>(loadState('cleanedSchema', ''));
    const [sampleData, setSampleData] = useState<string>(loadState('sampleData', ''));
    const [userQuestions, setUserQuestions] = useState<string>(loadState('userQuestions', '[]'));

    const [firstTurn, setFirstTurn] = useState<string>(loadState('firstTurn', ''));
    const [remainingTurns, setRemainingTurns] = useState(JSON.parse(loadState('remainingTurns', '{}')));

    const [firstTurnQuestion, setFirstTurnQuestion] = useState<string>(loadState('firstTurnQuestion', ''));
    const [remainingTurnsQuestions, setRemainingTurnsQuestions] = useState<string>(loadState('remainingTurnsQuestions', '[]'));

    const [systemPromptPrompt, setSystemPromptPrompt] = useState<string>(loadState('systemPromptPrompt', defaultSystemPromptPrompt));
    const [schemaPrompt, setSchemaPrompt] = useState<string>(loadState('schemaPrompt', defaultSchemaPrompt));
    const [cleanSchemaPrompt, setCleanSchemaPrompt] = useState<string>(loadState('cleanSchemaPrompt', defaultCleanSchemaPrompt));
    const [userQuestionsPrompt, setUserQuestionsPrompt] = useState<string>(loadState('userQuestionsPrompt', defaultUserQuestionsPrompt));
    const [sampleDataPrompt, setSampleDataPrompt] = useState<string>(loadState('sampleDataPrompt', defaultSampleDataPrompt));
    const [firstTurnPrompt, setFirstTurnPrompt] = useState<string>(loadState('firstTurnPrompt', defaultFirstTurnPrompt));
    const [remainingTurnsPrompt, setRemainingTurnsPrompt] = useState<string>(loadState('remainingTurnsPrompt', defaultRemainingTurnsPrompt));
    const [hasError, setHasError] = useState(false);

    const clearAllChanges = () => {
        setStep(0);
        setDomain('');
        setSubdomain('');
        setTaxonomyL1('');
        setTaxonomyL2('');
        setScenario('');
        setSystemPrompt('');
        setSchema('');
        setSampleData('');
        setUserQuestions('[]');
        setFirstTurn('');
        setRemainingTurns({});
        setFirstTurnQuestion('');
        setRemainingTurnsQuestions('[]');
        setSystemPromptPrompt(defaultSystemPromptPrompt);
        setSchemaPrompt(defaultSchemaPrompt);
        setUserQuestionsPrompt(defaultUserQuestionsPrompt);
        setSampleDataPrompt(defaultSampleDataPrompt);
        setFirstTurnPrompt(defaultFirstTurnPrompt);
        setRemainingTurnsPrompt(defaultRemainingTurnsPrompt);
    };
    // Update `src/stores/usePipelineContext.tsx`


// Add the export function inside the context
    const exportPipelineContext = () => {
        const data = JSON.stringify({
            step, domain, subdomain, taxonomyL1, taxonomyL2, scenario, systemPrompt, schema, cleanedSchema,
            userQuestions, firstTurnQuestion, remainingTurnsQuestions, sampleData, firstTurn, remainingTurns,
            systemPromptPrompt, schemaPrompt, cleanSchemaPrompt, userQuestionsPrompt, sampleDataPrompt,
            firstTurnPrompt, remainingTurnsPrompt
        }, null, 2);

        const blob = new Blob([data], { type: 'application/json' });
        saveAs(blob, 'pipelineContext.json');
    };

// Add the import function inside the context
    const importPipelineContext = (file: File) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            if (event.target?.result) {
                const data = JSON.parse(event.target.result as string);
                setStep(data.step);
                setDomain(data.domain);
                setSubdomain(data.subdomain);
                setTaxonomyL1(data.taxonomyL1);
                setTaxonomyL2(data.taxonomyL2);
                setScenario(data.scenario);
                setSystemPrompt(data.systemPrompt);
                setSchema(data.schema);
                setCleanedSchema(data.cleanedSchema);
                setUserQuestions(data.userQuestions);
                setFirstTurnQuestion(data.firstTurnQuestion);
                setRemainingTurnsQuestions(data.remainingTurnsQuestions);
                setSampleData(data.sampleData);
                setFirstTurn(data.firstTurn);
                setRemainingTurns(data.remainingTurns);
                setSystemPromptPrompt(data.systemPromptPrompt);
                setSchemaPrompt(data.schemaPrompt);
                setCleanSchemaPrompt(data.cleanSchemaPrompt);
                setUserQuestionsPrompt(data.userQuestionsPrompt);
                setSampleDataPrompt(data.sampleDataPrompt);
                setFirstTurnPrompt(data.firstTurnPrompt);
                setRemainingTurnsPrompt(data.remainingTurnsPrompt);
            }
        };
        reader.readAsText(file);
    };

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
        saveState('cleanedSchema', cleanedSchema);
    }, [cleanedSchema]);

    useEffect(() => {
        try {
            setFirstTurnQuestion(eval(userQuestions).filter((item: { turn: number }) => item.turn == 1)[0]?.question || '');
            setRemainingTurnsQuestions(JSON.stringify(eval(userQuestions).filter((item: { turn: number }) => item.turn > 1)));
            saveState('userQuestions', userQuestions);
        } catch (e) {
            setHasError(true);  // Set error state
            console.log("error", e);
        }
    }, [userQuestions, setUserQuestions]);
    useEffect(() => {
        if (hasError) {
            setUserQuestions(loadState('userQuestions', '[]'));
            toast.error("Error parsing the questions");
            setHasError(false);  // Reset error state
        }
    }, [hasError]);
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
        saveState('cleanSchemaPrompt', cleanSchemaPrompt);
    }, [cleanSchemaPrompt]);

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
            setRemainingTurnsPrompt,
            clearAllChanges,
            cleanedSchema,
            setCleanedSchema,
            cleanSchemaPrompt,
            setCleanSchemaPrompt,
            exportPipelineContext,
            importPipelineContext
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