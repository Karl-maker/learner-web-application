"use client"

import React, { useEffect, useState } from "react";
import QuestionQuizCard from "@/components/question/question-quiz-card";
import useGetQuestionById from "@/hooks/question/get-by-id";
import useGetQuizById from "@/hooks/quiz/get-by-id";
import useUpdateQuizById from "@/hooks/quiz/update-by-id";
import { QuizQuestionResult } from "@/types/quiz";

export default function QuizPage({ params }: { params: { id: string } }) {
    const getQuizById = useGetQuizById();
    const getQuestionById = useGetQuestionById();
    const updateQuizById = useUpdateQuizById();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number | null>(null);
    const [quizQuestionResult, setQuizQuestionResult] = useState<QuizQuestionResult | null>(null);
    const [completedQuiz, setCompletedQuiz] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            await getQuizById.get(params.id);
        })();
    }, [params.id]);

    useEffect(() => {
        if (!getQuizById.quiz?.questions) return;

        const recentQuestionIndex = getQuizById.quiz.questions.findIndex(question => !question.completed);
        setCurrentQuestionIndex(recentQuestionIndex >= 0 ? recentQuestionIndex : 0);

        setQuizQuestionResult({
            complete: getQuizById.quiz.complete,
            questions: getQuizById.quiz.questions
        });

        setCompletedQuiz(getQuizById.quiz.complete);

    }, [getQuizById.quiz]);

    useEffect(() => {
        if (currentQuestionIndex === null || !getQuizById.quiz?.questions) return;

        const questionId = getQuizById.quiz.questions[currentQuestionIndex].id;
        getQuestionById.get(questionId);
    }, [currentQuestionIndex]);

    useEffect(() => {
        if (!quizQuestionResult) return;
        if(completedQuiz) return;
        setCompletedQuiz(quizQuestionResult.complete)
        updateQuizById.update(params.id, quizQuestionResult);
    }, [quizQuestionResult]);

    const onNextQuestion = () => {
        if (currentQuestionIndex === null || !getQuizById.quiz?.questions) return;
        const newIndex = currentQuestionIndex + 1;
        if (newIndex < getQuizById.quiz.questions.length) setCurrentQuestionIndex(newIndex);
    };

    const onPreviousQuestion = () => {
        if (currentQuestionIndex === null || !getQuizById.quiz?.questions) return;
        const newIndex = currentQuestionIndex - 1;
        if (newIndex >= 0) setCurrentQuestionIndex(newIndex);
    };

    const onComplete = () => {
        if(completedQuiz) return;
        setQuizQuestionResult(quizQuestion => quizQuestion ? { ...quizQuestion, complete: true } : null);
    };

    const handleUpdateAnswer = async (questionIndex: number, correct: boolean) => {
        if (!quizQuestionResult || !quizQuestionResult.questions) return;
        if(completedQuiz) return;

        const newQuizQuestionResults = [...quizQuestionResult.questions];
        const question = newQuizQuestionResults[questionIndex];

        newQuizQuestionResults[questionIndex] = {
            ...question,
            completed: true,
            earned_marks: correct ? question.possible_marks : 0
        };

        setQuizQuestionResult(quizQuestion => quizQuestion ? { ...quizQuestion, questions: newQuizQuestionResults } : null);

        alert(`Answer is ${correct ? 'right' : 'wrong'}`);

        if (currentQuestionIndex === newQuizQuestionResults.length - 1) onComplete();
        else onNextQuestion();
    };

    return (
        <div>
            {getQuizById.isLoading ? <p>Loading...</p> :
                <>
                    {getQuizById.quiz ?
                        <div>
                            <p>Quiz ID: {getQuizById.quiz.id}</p>
                            {currentQuestionIndex !== null && getQuestionById.question && !completedQuiz &&
                                <QuestionQuizCard
                                    question={getQuestionById.question}
                                    quizQuestionProgress={getQuizById.quiz.questions[currentQuestionIndex]}
                                    isLoading={getQuestionById.isLoading}
                                    questionIndex={currentQuestionIndex}
                                    handleAnswer={handleUpdateAnswer}
                                />
                            }
                            {
                                completedQuiz &&
                                <div>
                                    Completed Quiz
                                </div>
                            }
                        </div> :
                        <p>No Quiz</p>
                    }
                </>
            }
        </div>
    );
}
