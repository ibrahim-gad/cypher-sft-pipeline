import { useState } from "react";
import usePipelineContext from "../../stores/usePipelineContext.tsx";
import PromptTab from "./PromptTab";
import ResultTab from "./ResultTab";

interface Replacement {
    key: string;
    value: string;
}

interface CollapsableTextAreaProps {
    prompt: string;
    result: string;
    setResult: (value: string) => void;
    onDone: () => void;
    onBack: () => void;
    previewOnly: boolean;
    extraReplacements?: Replacement[];
}

const CollapsableTextArea: React.FC<CollapsableTextAreaProps> = ({ prompt, result, setResult, onDone, onBack, previewOnly, extraReplacements }) => {
    const { firstTurnQuestion, domain, subdomain, taxonomyL1, taxonomyL2, scenario, systemPrompt, schema, userQuestions } = usePipelineContext();

    const [activeTab, setActiveTab] = useState<'prompt' | 'result'>('prompt');
    const [leftEditorValue, setLeftEditorValue] = useState(prompt);

    const canAdvance = activeTab === 'result' && !!result;

    const copyToClipboard = (value: string) => {
        let tempValue = value
            .replace(/\[\[domain\]\]/g, domain)
            .replace(/\[\[subdomain\]\]/g, subdomain)
            .replace(/\[\[taxonomyL1\]\]/g, taxonomyL1)
            .replace(/\[\[taxonomyL2\]\]/g, taxonomyL2)
            .replace(/\[\[scenario\]\]/g, scenario)
            .replace(/\[\[systemPrompt\]\]/g, systemPrompt)
            .replace(/\[\[schema\]\]/g, schema)
            .replace(/\[\[firstTurnQuestion\]\]/g, firstTurnQuestion)
            .replace(/\[\[userQuestions\]\]/g, userQuestions);

        if (extraReplacements) {
            extraReplacements.forEach(({ key, value }) => {
                const regex = new RegExp(`\\[\\[${key}\\]\\]`, 'g');
                tempValue = tempValue.replace(regex, value);
            });
        }
        navigator.clipboard.writeText(tempValue).then(() => {
            console.log("Text copied to clipboard");
        }).catch(err => {
            console.error("Failed to copy text: ", err);
        });
    };

    const handleBack = () => {
        setResult("");
        onBack();
    };

    return (
        <div className="flex flex-col w-full h-full border border-gray-400 ">
            <div className="flex justify-start border-b bg-gray-200 dark:bg-gray-800 text-black dark:text-white shadow-md">
                <button
                    className={`p-4 ${activeTab === 'prompt' ? 'border-b-2 border-gray-400 dark:border-gray-600 bg-gray-300 dark:bg-gray-700' : ''}`}
                    onClick={() => setActiveTab('prompt')}
                >
                    Prompt
                </button>
                <button
                    className={`p-4 ${activeTab === 'result' ? 'border-b-2 border-gray-400 dark:border-gray-600 bg-gray-300 dark:bg-gray-700' : ''}`}
                    onClick={() => setActiveTab('result')}
                >
                    Result
                </button>
            </div>
            <div className="border border-gray-400 dark:border-gray-600 bg-gray-100 dark:bg-gray-900 p-4">
                {activeTab === 'prompt' && (
                    <PromptTab
                        value={leftEditorValue}
                        onChange={setLeftEditorValue}
                        onCopy={copyToClipboard}
                        onNext={() => setActiveTab('result')}
                        onBack={handleBack}
                        previewOnly={previewOnly}
                        extraReplacements={extraReplacements}
                    />
                )}
                {activeTab === 'result' && (
                    <ResultTab
                        value={result}
                        onChange={setResult}
                        onCopy={copyToClipboard}
                        onAdvance={onDone}
                        onBack={() => setActiveTab('prompt')}
                        previewOnly={previewOnly}
                        canAdvance={canAdvance}
                    />
                )}
            </div>
        </div>
    );
};

export default CollapsableTextArea;