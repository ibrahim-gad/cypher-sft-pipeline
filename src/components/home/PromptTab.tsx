import { useState } from "react";
import { FaCopy } from "react-icons/fa";
import MarkdownEditor from "react-markdown-editor-lite";
import Markdown from "react-markdown";
import usePipelineContext from "../../stores/usePipelineContext.tsx";
import remarkGfm from "remark-gfm";

interface Replacement {
    key: string;
    value: string;
}

interface PromptTabProps {
    value: string;
    onChange: (text: string) => void;
    onCopy: (value: string) => void;
    onNext: () => void;
    onBack: () => void;
    previewOnly: boolean;
    extraReplacements?: Replacement[];
}

const PromptTab: React.FC<PromptTabProps> = ({ value, onChange, onCopy, onNext, onBack, previewOnly, extraReplacements }) => {
    const { userQuestions, firstTurn, remainingTurns, firstTurnQuestion, domain, subdomain, taxonomyL1, taxonomyL2, scenario, systemPrompt, schema } = usePipelineContext();
    const [activeTab, setActiveTab] = useState<'prompt' | 'variables' | 'preview'>('prompt');

    const renderPreview = (text: string): string => {
        return extraReplacements
            ? extraReplacements.reduce((acc: string, { key, value }: Replacement) => acc.replace(new RegExp(`\\[\\[${key}\\]\\]`, 'g'), value), text)
            : text
                .replace(/\[\[domain\]\]/g, domain)
                .replace(/\[\[subdomain\]\]/g, subdomain)
                .replace(/\[\[taxonomyL1\]\]/g, taxonomyL1)
                .replace(/\[\[taxonomyL2\]\]/g, taxonomyL2)
                .replace(/\[\[scenario\]\]/g, scenario)
                .replace(/\[\[systemPrompt\]\]/g, systemPrompt)
                .replace(/\[\[schema\]\]/g, schema)
                .replace(/\[\[firstTurnQuestion\]\]/g, firstTurnQuestion)
                .replace(/\[\[userQuestions\]\]/g, userQuestions)
                .replace(/\[\[firstTurn\]\]/g, JSON.stringify(firstTurn))
                .replace(/\[\[remainingTurns\]\]/g, JSON.stringify(remainingTurns));
    };

    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex justify-center border-b">
                <div className="flex mx-auto ">
                    <button
                        className={`p-2 ${activeTab === 'prompt' ? 'border-b-2 border-blue-500' : ''}`}
                        onClick={() => setActiveTab('prompt')}
                    >
                        Prompt
                    </button>
                    {/*<button*/}
                    {/*    className={`p-2 ${activeTab === 'variables' ? 'border-b-2 border-blue-500' : ''}`}*/}
                    {/*    onClick={() => setActiveTab('variables')}*/}
                    {/*>*/}
                    {/*    Variables*/}
                    {/*</button>*/}
                    <button
                        className={`p-2 ${activeTab === 'preview' ? 'border-b-2 border-blue-500' : ''}`}
                        onClick={() => setActiveTab('preview')}
                    >
                        Preview
                    </button>
                </div>
                <button
                    onClick={() => onCopy(value)}
                    className="p-2 bg-orange-500 my-1 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center"
                >
                    <FaCopy className="text-white text-xl mr-2"/> Copy Prompt
                </button>
            </div>
            {activeTab === 'prompt' && (
                <div className="relative p-4">
                    <MarkdownEditor
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={value}
                        readOnly={previewOnly}
                        onChange={({ text }) => onChange(text)}
                        style={{ minHeight: '300px', height: '500px' }}
                        renderHTML={(text) => <Markdown className="markdown-content" remarkPlugins={[remarkGfm]}>{text}</Markdown>}
                    />
                </div>
            )}
            {activeTab === 'variables' && (
                <div className="p-4">
                    {/* Variables tab content will go here */}
                </div>
            )}
            {activeTab === 'preview' && (
                <div className="p-4">
                    <MarkdownEditor
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={renderPreview(value)}
                        readOnly={true}
                        style={{ minHeight: '300px', height: '500px' }}
                        renderHTML={(text) => <Markdown className="markdown-content" remarkPlugins={[remarkGfm]}>{text}</Markdown>}
                    />
                </div>
            )}
            {!previewOnly &&
                <div className="flex justify-between">
                    <button
                        onClick={onBack}
                        className="mt-2 px-4 py-2 bg-pink-600 text-white rounded-md"
                    >
                        {"<< Back"}
                    </button>
                    <button
                        onClick={onNext}
                        className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md"
                    >
                        {"Next >>"}
                    </button>
                </div>
            }
        </div>
    );
};

export default PromptTab;