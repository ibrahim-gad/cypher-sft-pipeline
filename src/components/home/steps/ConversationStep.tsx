import React from 'react';
import CollapsableTextArea from '../CollapsableTextArea.tsx';
import usePipelineContext from "../../../stores/usePipelineContext.tsx";

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
    const { firstTurn, firstTurnPrompt, setFirstTurn, remainingTurnsPrompt, setRemainingTurns, remainingTurns, remainingTurnsQuestions } = usePipelineContext();

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
    return (
        <div>
            <h2 className="text-2xl bg-gray-200 dark:bg-gray-800 text-black dark:text-white p-4 border border-gray-400 dark:border-gray-600 shadow-md">5. Conversation</h2>
            <div className="pl-2">
                <h3 className="text-xl bg-gray-100 dark:bg-gray-700 text-black dark:text-white p-2 border border-gray-300 dark:border-gray-500">Turn 1</h3>
                <CollapsableTextArea
                    result={firstTurn}
                    previewOnly={previewOnly}
                    prompt={firstTurnPrompt}
                    onDone={onDone}
                    setResult={setFirstTurn}
                    onBack={onBack}
                />
                {parsedRemainingTurnsQuestions.map((question: TurnQuestion, index: number) => (
                    <React.Fragment key={'Turn' + (index + 2)}>
                        <h3 className="text-xl bg-gray-100 dark:bg-gray-700 text-black dark:text-white p-2 border border-gray-300 dark:border-gray-500">Turn {index + 2}</h3>
                        <CollapsableTextArea
                            result={getTurn(index + 2)}
                            previewOnly={previewOnly}
                            prompt={remainingTurnsPrompt}
                            onDone={onDone}
                            setResult={setTurn.bind(null, index + 2)}
                            onBack={onBack}
                            extraReplacements={[{ key: 'FOLLOW_UP', value: question.question }]}
                        />
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default ConversationStep;