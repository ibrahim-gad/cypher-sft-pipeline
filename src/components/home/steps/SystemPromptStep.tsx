import React from 'react';
import CollapsableTextArea from '../CollapsableTextArea.tsx';
import usePipelineContext from "../../../stores/usePipelineContext.tsx";

interface SystemPromptStepProps {
    prompt: string;
    result: string;
    setResult: (value: string) => void;
    onDone: () => void;
    onBack: () => void;
    previewOnly: boolean;
}

const SystemPromptStep: React.FC<SystemPromptStepProps> = ({
                                                               onDone,
                                                               onBack,
                                                               previewOnly
                                                           }) => {
    const { systemPrompt, systemPromptPrompt, setSystemPrompt, } = usePipelineContext();

    return (
        <div>
            <h2 className="text-2xl bg-gray-200 dark:bg-gray-800 text-black dark:text-white p-4 border border-gray-400 dark:border-gray-600 shadow-md">1. System Prompt</h2>
            <div className="pl-2">
            <CollapsableTextArea
                result={systemPrompt}
                previewOnly={previewOnly}
                prompt={systemPromptPrompt}
                onDone={onDone}
                setResult={setSystemPrompt}
                onBack={onBack}
            />
        </div>
        </div>
    )};

export default SystemPromptStep;