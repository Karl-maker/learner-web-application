/* eslint-disable */

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

export const metadata = {
    title: "Subject Listing - CXC & CSEC Student Learning App",
    description: "Discover a comprehensive list of subjects provided by our learning platform. Empower yourself for success in CXC and CSEC exams with access to study materials, practice tests, and more!",
};

/**
 * @desc subject list 
 * @todo complete styling 
 */


export default async function CurrentStudentProfilePage() {

    try {

        const page: number = 1;
        const pageSize: number = 5;
        const field: keyof Subject = 'name';
        const sort: 'asc' | 'desc' = 'asc';
    
        const { subjects, results } = await getAllSubjects({ page, page_size: pageSize, field, sort });
    
        return (
            <div>{subjects === null ? 'no subjects' : 
                <div>
                    {/* { Display List of Subjects } */}
                    { subjects.map((subject: Subject, i) => {
                        return <p key={i}>{subject.name}</p>
                    })}
                    <p>results found: {results || 'n/a'}</p>
                </div>
            }</div>
        );

    } catch(err) {
        return (
            <div>
                <p>Apologies, we couldn't retrieve the subjects at the moment. Please try again later.</p>
            </div>
        );
    }

}
