import { useState } from "react";
import { api } from "@/utils/fetch";
import { ApplicationError } from "@/utils/error";
import { checkErrorInstance } from "@/utils/instance/error";
import { GenerateQuizResponse, GetQuizByIdResponse, Quiz, QuizQuestionResult, UpdateQuizByIdResponse, UseGetQuizById, UseUpdateQuizById } from "@/types/quiz";

/**
 * @param isLoading value true if request is still loading
 * @param error a ApplicationError or null
 * @param update update quiz by id
 * @param quiz quiz
 */

const useUpdateQuizById = () : UseUpdateQuizById => {
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [error, setError] = useState<ApplicationError | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const update = async (quiz_id: string, options: QuizQuestionResult): Promise<void> => {
        setIsLoading(true);
        try {
            const response = await api<UpdateQuizByIdResponse>(`/api/v1/quiz/${quiz_id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(options)
            }, true);

            console.log(`useUpdateQuizById():`, response);
            
            setQuiz(response.data?.data || null);
            setError(null);
        } catch (error: any) {
            setError(checkErrorInstance(error));
            setQuiz(null);
        } finally {
            setIsLoading(false);
        }
    };

    return { quiz, error, isLoading, update };
};

export default useUpdateQuizById;
