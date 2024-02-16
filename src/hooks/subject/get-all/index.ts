import { useState } from "react";
import { api } from "@/utils/fetch";
import { ApplicationError } from "@/utils/error";
import { checkErrorInstance } from "@/utils/instance/error";
import { GetManyQueryParams } from "@/types/base";
import { GetAllSubjectsResponse, Subject, UseGetAllSubjects } from "@/types/subject";

/**
 * @param isLoading value true if request is still loading
 * @param error a ApplicationError or null
 * @param getAll method to getting all subjects
 * @param subjects list all subjects
 */

const useGetAllSubjects = () : UseGetAllSubjects => {
    const [subjects, setSubjects] = useState<Subject[] | null>(null);
    const [amount, setAmount] = useState<number | null>(null);
    const [error, setError] = useState<ApplicationError | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getAll = async (params: GetManyQueryParams<Subject>): Promise<void> => {
        setIsLoading(true);
        try {
            const response = await api<GetAllSubjectsResponse>(`/api/v1/subject?sort=${params.sort}&field=${params.field}&page_size=${params.page_size}&page=${params.page}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }, true);

            console.log(`useGetAllSubjects():`, response);

            const subjects: Subject[] | null = response.data?.data || null;
            
            setSubjects(subjects);
            setAmount(response.data?.amount || null);
            setError(null);
        } catch (error: any) {
            setError(checkErrorInstance(error));
            setSubjects(null);
            setAmount(null);
        } finally {
            setIsLoading(false);
        }
    };

    return { subjects, error, isLoading, getAll, amount };
};

export default useGetAllSubjects;
