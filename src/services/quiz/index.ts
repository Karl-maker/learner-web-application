import { GetManyQueryParams } from "@/types/base";
import { GetAllQuizzesResponse, Quiz } from "@/types/quiz";
import { service } from "@/utils/fetch";
import { checkErrorInstance } from "@/utils/instance/error";

export const getAllStudentQuiz = async (student_id: string, options: GetManyQueryParams<Quiz>) => {
    try{
        console.log(`getAllStudentQuiz().params: `, {
            student_id,
            options
        })
        const response = await service<GetAllQuizzesResponse>(`/api/v1/quiz?student_id=${student_id}&sort=${options.sort}&field=${options.field}&page_size=${options.page_size}&page=${options.page}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        console.log(`getAllStudentQuiz():`, response);
        const quizzes: Quiz[] | null = response.data?.data || null;
        return quizzes;
    } catch(err) {
        throw checkErrorInstance(err);
    }
}