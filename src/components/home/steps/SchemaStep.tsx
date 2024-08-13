import React from 'react';
import CollapsableTextArea from '../CollapsableTextArea.tsx';
import usePipelineContext from "../../../stores/usePipelineContext.tsx";

interface SchemaStepProps {
    prompt: string;
    result: string;
    setResult: (value: string) => void;
    onDone: () => void;
    onBack: () => void;
    previewOnly: boolean;
}

const SchemaStep: React.FC<SchemaStepProps> = ({
    onDone,
    onBack,
    previewOnly
}) => {
    const { schema, schemaPrompt, setSchema, } = usePipelineContext();

    return (
    <div>
        <h2 className="text-2xl bg-gray-200 dark:bg-gray-800 text-black dark:text-white p-4 border border-gray-400 dark:border-gray-600 shadow-md">2. Schema</h2>
        <div className="pl-2">
        <CollapsableTextArea
            result={schema}
            previewOnly={previewOnly}
            prompt={schemaPrompt}
            onDone={onDone}
            setResult={setSchema}
            onBack={onBack}
        />
        </div>
    </div>
)};

export default SchemaStep;