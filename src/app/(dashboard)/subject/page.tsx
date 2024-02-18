"use server"

import { GetManyQueryParams } from "@/types/base";
import { GetAllSubjectsResponse, Subject } from "@/types/subject";
import { service } from "@/utils/fetch";
import { checkErrorInstance } from "@/utils/instance/error";

const getAllSubjects = async (params: GetManyQueryParams<Subject>): Promise<{ subjects: Subject[], results: number }> => {
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

/**
 * @desc subject list 
 * @todo complete styling 
 */


export default async function CurrentStudentProfilePage() {

    const page: number = 1;
    const pageSize: number = 5;
    const field: keyof Subject = 'name';
    const sort: 'asc' | 'desc' = 'asc';

    const { subjects, results } = await getAllSubjects({ page, page_size: pageSize, field, sort });

    return (
        <div>{subjects === null ? 'no subjects' : 
            <div>
                {/* { Display List of Subjects } */}
                { subjects.map((subject: Subject) => {
                    return <p>{subject.name}</p>
                })}
                <p>results found: {results || 'n/a'}</p>
            </div>
        }</div>
    );
}