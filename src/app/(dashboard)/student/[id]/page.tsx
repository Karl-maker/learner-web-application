/* eslint-disable */

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

export const metadata = {
    title: "Student Details - CXC & CSEC Student Learning App",
    description: "Explore detailed information about students using our learning platform. Empower yourself for success in CXC and CSEC exams by accessing student profiles, progress tracking, and more!",
};  

/**
 * @desc student profiles are here and can display information about students
 * @todo complete styling 
 */

export default async function StudentProfilePage({ params }: { params: { id: string } }) {

    try {
        const student = await getStudentById(params.id);

        return (
            <div>{student === null ? 'no student' : `Student's School: ${student.school?.name}`}</div>
        );

    } catch(err) {

        return (
            <div>
                <p>Apologies, we couldn't retrieve the student at the moment. Please try again later.</p>
            </div>
        );
    }
}