"use client"

import useGenerateQuiz from "@/hooks/quiz/generate";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'

/**
 * @desc List of past quizzes and option to start a new one
 * @todo complete styling 
 */

export default function QuizPage() {

    const router = useRouter()
    const generateQuiz = useGenerateQuiz();
    const submit = () => {
        generateQuiz.start({
            no_of_questions: 5,
            difficulty: 4,
            range: 1,
            topic: "Simplification"
        });
    }

    useEffect(() => {
        (async () => {
            if(generateQuiz.quiz?.id) router.push(`/dashboard/quiz/${generateQuiz.quiz?.id}`)
        })();
    }, [generateQuiz.quiz]);

    return (
        <div>
            <button onClick={submit} disabled={generateQuiz.isLoading}>
                { generateQuiz.isLoading ? 'Loading..' : 'Start Quiz' }
            </button>
        </div>
    );
}