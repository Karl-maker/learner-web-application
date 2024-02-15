import { useState } from "react";
import { api } from "@/utils/fetch";
import { ApplicationError } from "@/utils/error";
import { checkErrorInstance } from "@/utils/instance/error";
import { CreateCurrentStudentInput, CreateCurrentStudentResponse, Student, UpdateCurrentStudentInput, UpdateCurrentStudentResponse, UseCreateCurrentStudent, UseUpdateCurrentStudent } from "@/types/student";

/**
 * @param isLoading value true if request is still loading
 * @param error a ApplicationError or null
 * @param create method to activate creating the current student profile details
 * @param student The current student profile 
 */

const useUpdateCurrentStudent = () : UseUpdateCurrentStudent => {
    const [student, setStudent] = useState<Student | null>(null);
    const [status, setStatus] = useState<boolean | null>(null);
    const [error, setError] = useState<ApplicationError | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const update = async (input: UpdateCurrentStudentInput): Promise<void> => {
        setIsLoading(true);
        try {
            const response = await api<UpdateCurrentStudentResponse>(`/api/v1/student`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(input)
            }, true);

            console.log(`useCreateCurrentStudent():`, response);

            const student: Student | null = response.data?.data || null;
            const success: boolean = response.data?.updated || false;

            setStatus(success);
            setStudent(student);
            setError(null);
        } catch (error: any) {
            setError(checkErrorInstance(error));
            setStatus(false);
            setStudent(null);
        } finally {
            setIsLoading(false);
        }
    };

    return { student, error, isLoading, status, update };
};

export default useUpdateCurrentStudent;
