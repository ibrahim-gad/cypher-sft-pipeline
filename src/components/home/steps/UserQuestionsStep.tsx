import React from 'react';
import CollapsableTextArea from '../CollapsableTextArea.tsx';
import usePipelineContext from "../../../stores/usePipelineContext.tsx";
import EditQuestionsTab from '../tabs/EditQuestionsTab';

interface UserQuestionsStepProps {
    prompt: string;
    result: string;
    setResult: (value: string) => void;
    onDone: () => void;
    onBack: () => void;
    previewOnly: boolean;
}

const UserQuestionsStep: React.FC<UserQuestionsStepProps> = ({
    onDone,
    onBack,
    previewOnly
}) => {
    const {userQuestions, userQuestionsPrompt, setUserQuestions, } = usePipelineContext();

    return (
    <div>
        <h2 className="text-2xl bg-gray-200 dark:bg-gray-800 text-black dark:text-white p-4 border border-gray-400 dark:border-gray-600 shadow-md">3. User Questions</h2>
        <div className="pl-2">
        <CollapsableTextArea
            result={userQuestions}
            previewOnly={previewOnly}
            prompt={userQuestionsPrompt}
            onDone={onDone}
            setResult={setUserQuestions}
            onBack={onBack}
            extraTabs={[{ name: 'Questions', component: EditQuestionsTab }]}
        />
        </div>
    </div>
)};

export default UserQuestionsStep;