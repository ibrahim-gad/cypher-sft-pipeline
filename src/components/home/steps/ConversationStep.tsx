import React from 'react';
import CollapsableTextArea from '../CollapsableTextArea.tsx';
import usePipelineContext from "../../../stores/usePipelineContext.tsx";
import EditQuestionsTab from "../tabs/EditQuestionsTab.tsx";

interface ConversationStepProps {
    firstTurnPrompt: string;
    remainingTurnsPrompt: string;
    firstTurn: string;
    setFirstTurn: (value: string) => void;
    handleFollowUpChanges: (value: string) => void;
    onDone: () => void;
    onBack: () => void;
    previewOnly: boolean;
}

interface TurnQuestion {
    turn: number;
    question: string;
}

const ConversationStep: React.FC<ConversationStepProps> = ({
                                                               onDone,
                                                               onBack,
                                                               previewOnly
                                                           }) => {
    const { firstTurnQuestion, systemPrompt, firstTurn, firstTurnPrompt, setFirstTurn, remainingTurnsPrompt, setRemainingTurns, remainingTurns, remainingTurnsQuestions } = usePipelineContext();

    const parsedRemainingTurnsQuestions: TurnQuestion[] = eval(remainingTurnsQuestions).sort((item: TurnQuestion) => item.turn);
    const setTurn = (turn: number, value: string) => {
        setRemainingTurns((prev: Record<number, string>) => {
            const filteredTurns = { ...prev };
            filteredTurns[turn] = value;
            return filteredTurns;
        });
    };
    const getTurn = (turn: number) => {
        return remainingTurns[turn] || '';
    }
    const copySystemPrompt = () => {
        navigator.clipboard.writeText(systemPrompt).then(() => {
            console.log('System prompt copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy system prompt: ', err);
        });
    };
    const copyFirstTurnQuestion = () => {
        navigator.clipboard.writeText(firstTurnQuestion).then(() => {
            console.log('First turn question copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy First turn question: ', err);
        });
    };
    const copyTurnQuestion = (question: string) => {
        navigator.clipboard.writeText(question).then(() => {
            console.log('First turn question copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy First turn question: ', err);
        });
    };

    return (
        <div>
            <h2 className="text-2xl bg-gray-200 dark:bg-gray-800 text-black dark:text-white p-4 border border-gray-400 dark:border-gray-600 shadow-md">5. Conversation</h2>
            <div className="pl-2">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl bg-gray-100 dark:bg-gray-700 text-black dark:text-white p-2 border border-gray-300 dark:border-gray-500">Turn
                        1</h3>
                    <div>
                        <button
                            onClick={copySystemPrompt}
                            className="ml-2 px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Copy System Prompt
                        </button>
                        <button
                            onClick={copyFirstTurnQuestion}
                            className="ml-2 px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Copy First Turn Question
                        </button>
                    </div>
                </div>
                <CollapsableTextArea
                    result={firstTurn}
                    previewOnly={previewOnly || 0 < parsedRemainingTurnsQuestions.length - 1}
                    prompt={firstTurnPrompt}
                    onDone={onDone}
                    setResult={setFirstTurn}
                    onBack={onBack}
                    extraTabs={[{ name: 'Questions', component: EditQuestionsTab }]}

                />
                {parsedRemainingTurnsQuestions.map((question: TurnQuestion, index: number) => (
                    <React.Fragment key={'Turn' + (index + 2)}>
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl bg-gray-100 dark:bg-gray-700 text-black dark:text-white p-2 border border-gray-300 dark:border-gray-500">Turn {index + 2}</h3>
                            <button
                                onClick={copyTurnQuestion.bind(null, question.question)}
                                className="ml-2 px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Copy Turn {index+2}'s Question
                            </button>
                        </div>
                        <CollapsableTextArea
                            result={getTurn(index + 2)}
                            previewOnly={previewOnly || index < parsedRemainingTurnsQuestions.length - 1}
                            prompt={remainingTurnsPrompt}
                            onDone={onDone}
                            setResult={setTurn.bind(null, index + 2)}
                            extraTabs={[{ name: 'Questions', component: EditQuestionsTab }]}
                            onBack={onBack}
                            extraReplacements={[{key: 'FOLLOW_UP', value: question.question}]}
                        />
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default ConversationStep;