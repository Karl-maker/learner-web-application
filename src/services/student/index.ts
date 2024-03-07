import { GetStudentByIdResponse, Student } from "@/types/student";
import { service } from "@/utils/fetch";
import { checkErrorInstance } from "@/utils/instance/error";

export const getStudentById = async (id: string): Promise<Student | null> => {
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