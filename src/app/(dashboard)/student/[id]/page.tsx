"use server"

import { GetStudentByIdResponse, Student } from "@/types/student";
import { service } from "@/utils/fetch";
import { checkErrorInstance } from "@/utils/instance/error";

const getStudentById = async (id: string): Promise<Student | null> => {
    try{
        const response = await service<GetStudentByIdResponse>(`/api/v1/student/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        console.log(`getStudentById():`, response);
        const student: Student | null = response.data?.data || null;
        return student;
    } catch(err) {
        throw checkErrorInstance(err);
    }
}


/**
 * @desc student profiles are here and can display information about students
 * @todo complete styling 
 */


export default async function StudentProfilePage({ params }: { params: { id: string } }) {
    const student = await getStudentById(params.id);

    return (
        <div>{student === null ? 'no student' : `Student's School: ${student.school?.name}`}</div>
    );
}