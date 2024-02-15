import { useState } from "react";
import { api } from "@/utils/fetch";
import { ApplicationError } from "@/utils/error";
import { checkErrorInstance } from "@/utils/instance/error";
import { CreateCurrentStudentInput, CreateCurrentStudentResponse, Student, UseCreateCurrentStudent } from "@/types/student";

/**
 * @param isLoading value true if request is still loading
 * @param error a ApplicationError or null
 * @param create method to activate creating the current student profile details
 * @param student The current student profile 
 */

const useCreateCurrentStudent = () : UseCreateCurrentStudent => {
    const [student, setStudent] = useState<Student | null>(null);
    const [error, setError] = useState<ApplicationError | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const create = async (input: CreateCurrentStudentInput): Promise<void> => {
        setIsLoading(true);
        try {
            const response = await api<CreateCurrentStudentResponse>(`/api/v1/student`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(input)
            }, true);

            console.log(`useCreateCurrentStudent():`, response);

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

    return { student, error, isLoading, create };
};

export default useCreateCurrentStudent;
