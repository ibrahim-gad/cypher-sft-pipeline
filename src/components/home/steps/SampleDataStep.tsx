import React from 'react';
import CollapsableTextArea from '../CollapsableTextArea.tsx';
import usePipelineContext from "../../../stores/usePipelineContext.tsx";

interface SampleDataStepProps {
    prompt: string;
    result: string;
    setResult: (value: string) => void;
    onDone: () => void;
    onBack: () => void;
    previewOnly: boolean;
}

const SampleDataStep: React.FC<SampleDataStepProps> = ({
    onDone,
    onBack,
    previewOnly
}) => {
    const { sampleData,  sampleDataPrompt, setSampleData,  } = usePipelineContext();

    return (
    <div>
        <h2 className="text-2xl bg-gray-200 dark:bg-gray-800 text-black dark:text-white p-4 border border-gray-400 dark:border-gray-600 shadow-md">4. Sample Data</h2>
        <div className="pl-2">
        <CollapsableTextArea
            result={sampleData}
            previewOnly={previewOnly}
            prompt={sampleDataPrompt}
            onDone={onDone}
            setResult={setSampleData}
            onBack={onBack}
        />
    </div>
    </div>
)};

export default SampleDataStep;