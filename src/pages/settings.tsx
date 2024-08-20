// src/pages/settings.tsx
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import useDefaultPromptsContext from '../stores/useDefaultPrompts';
import Markdown from 'react-markdown';
import remarkGfm from "remark-gfm";


const Settings = () => {
    const {
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
        setUserQuestionsPrompt
    } = useDefaultPromptsContext();

    return (
        <div className="p-4 space-y-4">
            <div>
                <label className="block text-lg font-medium">System Prompt</label>
                <MarkdownEditor
                    value={systemPromptPrompt}
                    style={{ height: '200px' }}
                    renderHTML={(text) => <Markdown className="markdown-content" remarkPlugins={[remarkGfm]}>{text}</Markdown>}
                    onChange={({ text }) => setSystemPromptPrompt(text)}
                />
            </div>
            <div>
                <label className="block text-lg font-medium">Schema Prompt</label>
                <MarkdownEditor
                    value={schemaPrompt}
                    style={{ height: '200px' }}
                    renderHTML={(text) => <Markdown className="markdown-content" remarkPlugins={[remarkGfm]}>{text}</Markdown>}
                    onChange={({ text }) => setSchemaPrompt(text)}
                />
            </div>
            <div>
                <label className="block text-lg font-medium">User Questions Prompt</label>
                <MarkdownEditor
                    value={userQuestionsPrompt}
                    style={{ height: '200px' }}
                    renderHTML={(text) => <Markdown className="markdown-content" remarkPlugins={[remarkGfm]}>{text}</Markdown>}
                    onChange={({ text }) => setUserQuestionsPrompt(text)}
                />
            </div>
            <div>
                <label className="block text-lg font-medium">Sample Data Prompt</label>
                <MarkdownEditor
                    value={sampleDataPrompt}
                    style={{ height: '200px' }}
                    renderHTML={(text) => <Markdown className="markdown-content" remarkPlugins={[remarkGfm]}>{text}</Markdown>}
                    onChange={({ text }) => setSampleDataPrompt(text)}
                />
            </div>
            <div>
                <label className="block text-lg font-medium">First Turn Prompt</label>
                <MarkdownEditor
                    value={firstTurnPrompt}
                    style={{ height: '200px' }}
                    renderHTML={(text) => <Markdown className="markdown-content" remarkPlugins={[remarkGfm]}>{text}</Markdown>}
                    onChange={({ text }) => setFirstTurnPrompt(text)}
                />
            </div>
            <div>
                <label className="block text-lg font-medium">Remaining Turns Prompt</label>
                <MarkdownEditor
                    value={remainingTurnsPrompt}
                    style={{ height: '200px' }}
                    renderHTML={(text) => <Markdown className="markdown-content" remarkPlugins={[remarkGfm]}>{text}</Markdown>}
                    onChange={({ text }) => setRemainingTurnsPrompt(text)}
                />
            </div>
        </div>
    );
};

export default Settings;