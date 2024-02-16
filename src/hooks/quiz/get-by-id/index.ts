import { useState } from "react";
import { api } from "@/utils/fetch";
import { ApplicationError } from "@/utils/error";
import { checkErrorInstance } from "@/utils/instance/error";
import { GenerateQuizResponse, GetQuizByIdResponse, Quiz, UseGetQuizById } from "@/types/quiz";

/**
 * @param isLoading value true if request is still loading
 * @param error a ApplicationError or null
 * @param get get quiz by id
 * @param quiz quiz
 */

const useGetQuizById = () : UseGetQuizById => {
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [error, setError] = useState<ApplicationError | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const get = async (quiz_id: string): Promise<void> => {
        setIsLoading(true);
        try {
            const response = await api<GetQuizByIdResponse>(`/api/v1/quiz/${quiz_id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }, true);

            console.log(`useGetQuizById():`, response);
            
            setQuiz(response.data?.data || null);
            setError(null);
        } catch (error: any) {
            setError(checkErrorInstance(error));
            setQuiz(null);
        } finally {
            setIsLoading(false);
        }
    };

    return { quiz, error, isLoading, get };
};

export default useGetQuizById;
