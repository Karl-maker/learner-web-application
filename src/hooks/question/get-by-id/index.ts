import { useState } from "react";
import { api } from "@/utils/fetch";
import { ApplicationError } from "@/utils/error";
import { checkErrorInstance } from "@/utils/instance/error";
import { GetManyQueryParams } from "@/types/base";
import { GetAllSubjectsResponse, Subject } from "@/types/subject";
import { GetQuestionByIdResponse, Question, UseGetQuestionById } from "@/types/question";

/**
 * @param isLoading value true if request is still loading
 * @param error a ApplicationError or null
 * @param getAll method to getting all subjects
 * @param question 
 */

const useGetQuestionById = () : UseGetQuestionById => {
    const [question, setQuestion] = useState<Question | null>(null);
    const [error, setError] = useState<ApplicationError | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const get = async (params: string): Promise<void> => {
        setIsLoading(true);
        try {
            const response = await api<GetQuestionByIdResponse>(`/api/v1/question/${params}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }, true);

            console.log(`useGetQuestionById():`, response);
            
            setQuestion(response.data?.data || null);
            setError(null);
        } catch (error: any) {
            setError(checkErrorInstance(error));
            setQuestion(null);
        } finally {
            setIsLoading(false);
        }
    };

    return { question, error, isLoading, get };
};

export default useGetQuestionById;
