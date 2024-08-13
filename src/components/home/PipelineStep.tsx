import { motion } from 'framer-motion';
import usePipelineContext from '../../stores/usePipelineContext.tsx';
import SystemPromptStep from "./steps/SystemPromptStep.tsx";
import SchemaStep from "./steps/SchemaStep.tsx";
import UserQuestionsStep from "./steps/UserQuestionsStep.tsx";
import SampleDataStep from "./steps/SampleDataStep.tsx";
import ConversationStep from "./steps/ConversationStep.tsx";

interface PipelineStepProps {
    currentStep: number;
}

const PipelineStep: React.FC<PipelineStepProps> = ({ currentStep }) => {
    const { step, setStep,  } = usePipelineContext();

    const handleAdvance = () => {
        setStep(currentStep + 1);
    };

    const stepComponents: { [key: number]: React.ElementType } = {
        1: SystemPromptStep,
        2: SchemaStep,
        3: UserQuestionsStep,
        4: SampleDataStep,
        5: ConversationStep
    };

    const StepComponent = stepComponents[currentStep];

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-4"
        >
            {StepComponent && (
                <StepComponent
                    onDone={handleAdvance}
                    onBack={setStep.bind(null, currentStep - 1)}
                    previewOnly={step > currentStep}
                />
            )}
        </motion.div>
    );
};

export default PipelineStep;