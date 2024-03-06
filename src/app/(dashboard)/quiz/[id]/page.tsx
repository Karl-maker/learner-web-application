"use client"

import QuestionQuizCard from "@/components/question/question-quiz-card";
import useGetQuizById from "@/hooks/quiz/get-by-id";
import useUpdateQuizById from "@/hooks/quiz/update-by-id";
import { GetQuestionByIdResponse, Question } from "@/types/question";
import { GetQuizByIdResponse, Quiz, QuizQuestion, QuizQuestionResult } from "@/types/quiz";
import { ApplicationError, NotFoundError } from "@/utils/error";
import { api } from "@/utils/fetch";
import { useEffect, useMemo, useState } from "react";

export default function QuizPage({ params }: { params: { id: string } }) {
    const [questions, setQuestions] = useState<Record<string, Question>>({});
    const [studentQuestionStates, setStudentQuestionStates] = useState<QuizQuestion[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [complete, setComplete] = useState<boolean>(false);
    const [initialLoad, setInitialLoad] = useState<boolean>(true);
    const updateQuiz = useUpdateQuizById();

    async function handleUpdateQuestionStates() {
        console.log(`handleUpdateQuestionStates()`);
        const getQuizResponse = await api<GetQuizByIdResponse>(`/api/v1/quiz/${params.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }, true);

        console.log(`useGetQuizById():`, getQuizResponse);

        if(!getQuizResponse.data?.data) throw new NotFoundError('Quiz Not Found', 'fatal');

        const questionIds: Set<string> = new Set();
        const quiz: Quiz = getQuizResponse.data?.data;
        let current_question = quiz.questions.reduce((count, obj) => {
            return count + (obj.complete ? 1 : 0);
        }, 0);

        setComplete(quiz.complete);
        setStudentQuestionStates(quiz.questions);

        return {questionIds, quiz}
    }
    async function handleAnswer(i: number, correct: boolean): Promise<void> {
        if(complete) return;
        if(studentQuestionStates[i].complete) return;

        alert(`Question No.${i} is ${correct ? 'correct' : 'wrong'}`);

        const updatedResults = studentQuestionStates;

        updatedResults[i] = {
            ...studentQuestionStates[i],
            earned_marks: correct ? studentQuestionStates[i].possible_marks : 0,
            complete: true,
        }

        const hasFalseAttribute = updatedResults.some(obj => !obj.complete);

        const result: QuizQuestionResult = {
            complete: hasFalseAttribute ? false : true,
            questions: updatedResults
        };

        await updateQuiz.update(params.id, result);
    } 
    function handleClickNext() {
        if(currentQuestion + 1 >= studentQuestionStates.length) return;
        setCurrentQuestion(current => current + 1);
    }
    function handleClickBack() {
        if(currentQuestion === 0) return;
        setCurrentQuestion(current => current - 1);
    }

    useEffect(() => {
        (async() => {
            try {
                setInitialLoad(true);

                const { questionIds, quiz } = await handleUpdateQuestionStates()

                quiz.questions.forEach((question) => {
                    questionIds.add(question.id);
                });

                const questionsResponse = await Promise.all(Array.from(questionIds).map(async (question_id) => {
                    const result = await api<GetQuestionByIdResponse>(`/api/v1/question/${question_id}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }, true);

                    return result.data?.data

                }));

                console.log(`questionsResponse: `, questionsResponse)

                questionsResponse.forEach((q) => {
                    if(!q?.id) return;
                    setQuestions(questions => {
                        return {
                            ...questions,
                            [q?.id]: q
                        }
                    })
                })
            } catch(err) {
                setInitialLoad(false);
            } finally {
                setInitialLoad(false);
            }
        })();
    }, [params.id]);

    useEffect(() => {
        (async () => {
            if(!updateQuiz.quiz) return;

            await handleUpdateQuestionStates();
        })();
    }, [updateQuiz.quiz])

    return <>
        {
            initialLoad ? <p>Loading</p> : <>
                <p>{`Quiz: ${params.id} Q: ${currentQuestion + 1}`}</p>
                {
                    (!complete) ? <QuestionQuizCard 
                        index={currentQuestion}
                        question={questions[studentQuestionStates[currentQuestion].id]} 
                        quizQuestionProgress={studentQuestionStates[currentQuestion]} 
                        isLoading={false} 
                        questionIndex={currentQuestion} 
                        handleAnswer={handleAnswer} 
                    /> : <p>Completed!</p>
                }
                <button onClick={handleClickBack}>Back</button>
                <button onClick={handleClickNext}>Next</button>
            </>
        }
    </>

}
