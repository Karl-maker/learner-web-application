import { useState } from "react";
import { api } from "@/utils/fetch";
import { ApplicationError } from "@/utils/error";
import { checkErrorInstance } from "@/utils/instance/error";
import { GetCurrentStudentResponse, GetStudentByIdResponse, Student, UseGetCurrentStudent, UseGetStudentById } from "@/types/student";

/**
 * @param isLoading value true if request is still loading
 * @param error a ApplicationError or null
 * @param get method to activate getting the current student profile details
 * @param student The student profile by id
 */

const useGetStudentById = () : UseGetStudentById => {
    const [student, setStudent] = useState<Student | null>(null);
    const [error, setError] = useState<ApplicationError | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const get = async (student_id: string): Promise<void> => {
        setIsLoading(true);
        try {
            const response = await api<GetStudentByIdResponse>(`/api/v1/student/${student_id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }, true);

            console.log(`useGetStudentById():`, response);

            const student: Student | null = response.data?.data || null;
            
            setStudent(student);
            setError(null);
        } catch (error: any) {
            setError(checkErrorInstance(error));
            setStudent(null);
        } finally {
            setIsLoading(false);
        }
    };

    return { student, error, isLoading, get };
};

export default useGetStudentById;
