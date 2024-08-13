// src/components/ui/ResultTab.tsx
import { FaCopy } from "react-icons/fa";
import MarkdownEditor from "react-markdown-editor-lite";
import Markdown from "react-markdown";

const ResultTab = ({ value, onChange, onCopy, onAdvance, onBack, previewOnly, canAdvance }: { value: string, onChange: any, onCopy: any, onAdvance: any, onBack: any, previewOnly: boolean, canAdvance: boolean }) => {
    return (
        <div className="relative">
            <div className="flex justify-end">
            <button
                onClick={() => onCopy(value)}
                className="p-2 bg-green-500 my-1 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center"
            >
                <FaCopy className="text-white text-xl mr-2"/> Copy Result
            </button>
            </div>
            <MarkdownEditor
                className="w-full p-2 border border-gray-300 rounded-md"
                value={value}
                onChange={({ text }) => onChange(text)}
                style={{ minHeight: '300px', height: '500px' }}
                renderHTML={(text) => <Markdown>{text}</Markdown>}
            />
            {!previewOnly &&
                <div className="flex justify-between">
                    <button
                        onClick={onBack}
                        className="mt-2 px-4 py-2 bg-pink-600 text-white rounded-md"
                    >
                        {"<< Back to Prompt"}
                    </button>
                    <button
                        onClick={onAdvance}
                        className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={!canAdvance}
                    >
                        {"Advance >>"}
                    </button>
                </div>
            }
        </div>
    );
};

export default ResultTab;