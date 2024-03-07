import { GetQuizByIdResponse, Quiz } from '@/types/quiz';
import { NotFoundError } from '@/utils/error';
import { api } from '@/utils/fetch';
import { useState, useEffect } from 'react';

export type UpdateQuestionStateType = {
    id: string;
}

export const useUpdateQuestionStates = (options: UpdateQuestionStateType) => {
    const [questionIds, setQuestionIds] = useState<Set<string>>(new Set());
    const [quiz, setQuiz] = useState<Quiz>();

    useEffect(() => {
        const handleUpdateQuestionStates = async () => {
            console.log(`handleUpdateQuestionStates()`);
            try {
                const getQuizResponse = await api<GetQuizByIdResponse>(`/api/v1/quiz/${options.id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }, true);
        
                console.log(`useGetQuizById():`, getQuizResponse);
        
                if (!getQuizResponse.data?.data) throw new NotFoundError('Quiz Not Found', 'fatal');
        
                const quizData = getQuizResponse.data.data;
                const questionIdsSet = new Set(quizData.questions.map(question => question.id));
        
                setQuestionIds(questionIdsSet);
                setQuiz(quizData);
            } catch (error) {
                // Handle error
                console.error('Error while updating question states:', error);
            }
        };

        handleUpdateQuestionStates();

        // Cleanup function if needed
        return () => {
            // Cleanup logic if needed
        };
    }, [options.id]); // Dependency array to run the effect when params.id changes

    return { questionIds, quiz };
};
