import React, { useState, useEffect } from 'react';
import usePipelineContext from "../../../stores/usePipelineContext";
import {toast} from "react-toastify";

// Define the Question type
type Question = {
    turn: number;
    question: string;
};

// Update the state and function signatures
const EditQuestionsTab: React.FC = () => {
    const { userQuestions, setUserQuestions } = usePipelineContext();
    const [questions, setQuestions] = useState<Question[]>(eval(userQuestions));

    useEffect(() => {
        setQuestions((prevQuestions: Question[]) => [...prevQuestions].sort((a: Question, b: Question) => a.turn - b.turn));
    }, []);

    const handleAddQuestion = () => {
        const newTurn = questions.length > 0 ? Math.max(...questions.map((q: Question) => q.turn)) + 1 : 1;
        const newQuestion: Question = { turn: newTurn, question: "" };
        setQuestions([...questions, newQuestion].sort((a: Question, b: Question) => a.turn - b.turn));
    };

    const handleEditQuestion = (turn: number, value: string) => {
        const updatedQuestions = questions.map((q: Question) => q.turn === turn ? { ...q, question: value } : q);
        setQuestions(updatedQuestions.sort((a: Question, b: Question) => a.turn - b.turn));
    };

    const handleDeleteQuestion = (turn: number) => {
        const updatedQuestions = questions.filter((q: Question) => q.turn !== turn);
        setQuestions(updatedQuestions.sort((a: Question, b: Question) => a.turn - b.turn));
    };

    const handleSave = () => {
        setUserQuestions(JSON.stringify(questions));
        toast.success("Questions saved successfully");
    };

    return (
        <div className="p-4">
            <h3 className="text-xl mb-4">Edit Questions</h3>
            {questions.map((q: Question) => (
                <div key={q.turn} className="mb-2 flex items-center">
                    <textarea
                        value={q.question}
                        onChange={(e) => handleEditQuestion(q.turn, e.target.value)}
                        className="flex-1 px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-gray-900 dark:bg-gray-700 dark:text-white"
                    />
                    <button
                        onClick={() => handleDeleteQuestion(q.turn)}
                        className="ml-2 px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Delete
                    </button>
                </div>
            ))}
            <button
                onClick={handleAddQuestion}
                className="w-full mb-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
                Add Question
            </button>
            <button
                onClick={handleSave}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                Save Changes
            </button>
        </div>
    );
};

export default EditQuestionsTab;