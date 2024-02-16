import { useState } from "react";
import { api } from "@/utils/fetch";
import { ApplicationError } from "@/utils/error";
import { checkErrorInstance } from "@/utils/instance/error";
import { GenerateQuizParams, GenerateQuizResponse, Quiz, UseGenerateQuiz } from "@/types/quiz";

/**
 * @param isLoading value true if request is still loading
 * @param error a ApplicationError or null
 * @param start generate quiz
 * @param quiz quiz
 */

const useGenerateQuiz = () : UseGenerateQuiz => {
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [error, setError] = useState<ApplicationError | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const start = async (params: GenerateQuizParams): Promise<void> => {
        setIsLoading(true);
        try {
            const response = await api<GenerateQuizResponse>(`/api/v1/quiz/start`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(params)
            }, true);

            console.log(`useGenerateQuiz():`, response);
            
            setQuiz(response.data?.data || null);
            setError(null);
        } catch (error: any) {
            setError(checkErrorInstance(error));
            setQuiz(null);
        } finally {
            setIsLoading(false);
        }
    };

    return { quiz, error, isLoading, start };
};

export default useGenerateQuiz;
