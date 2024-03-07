import { GetManyQueryParams } from "@/types/base";
import { GetAllSubjectsResponse, Subject } from "@/types/subject";
import { service } from "@/utils/fetch";
import { checkErrorInstance } from "@/utils/instance/error";

export const getAllSubjects = async (params: GetManyQueryParams<Subject>): Promise<{ subjects: Subject[], results: number }> => {
    try {
        const response = await service<GetAllSubjectsResponse>(`/api/v1/subject?sort=${params.sort}&field=${params.field}&page_size=${params.page_size}&page=${params.page}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        console.log(`getAllSubjects():`, response);

        return {
            subjects: response.data?.data || [],
            results: response.data?.amount || 0
        };
    } catch (error: any) {
        throw checkErrorInstance(error)
    }
}