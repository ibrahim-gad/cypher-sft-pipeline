// src/components/home/steps/CleanSchemaStep.tsx
import React from 'react';
import CollapsableTextArea from '../CollapsableTextArea.tsx';
import usePipelineContext from "../../../stores/usePipelineContext.tsx";

const CleanSchemaStep: React.FC = () => {
    const { cleanSchemaPrompt, cleanedSchema, setCleanedSchema } = usePipelineContext();

    return (
        <div>
            <h2 className="text-2xl bg-gray-200 dark:bg-gray-800 text-black dark:text-white p-4 border border-gray-400 dark:border-gray-600 shadow-md">6. Clean Schema</h2>
            <CollapsableTextArea
                result={cleanedSchema}
                previewOnly={true}
                prompt={cleanSchemaPrompt}
                onDone={() => {}}
                setResult={setCleanedSchema}
                onBack={() => {}}
            />
        </div>
    );
};

export default CleanSchemaStep;