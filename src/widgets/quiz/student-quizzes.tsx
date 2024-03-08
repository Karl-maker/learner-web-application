import { QuizResultCard } from '@/components/quiz/result';
import { Quiz } from '@/types/quiz'
import { averageDifficulty } from '@/utils/difficulty';
import React from 'react';
 
export default function StudentQuizzesWidget({
  data,
}: { data: Quiz[] }) {
  return (
    <ol>
        {
            data.map((quiz: Quiz, key: number) => {

                const completedQuestions = quiz.questions.filter((question) => question.earned_marks === question.possible_marks);

                let averageDifficultySum: number = 0;
                let totalMarks: number = 0;
                let totalCorrect: number = 0;

                quiz.questions.forEach((question) => {
                    averageDifficultySum += question.tier_level;
                    totalCorrect += question.earned_marks;
                    totalMarks += question.possible_marks;
                });


                const difficulty = averageDifficulty(averageDifficultySum / quiz.questions.length)

                return <li key={key} className='mt-2 mb-2'><QuizResultCard 
                    questions={{
                        amount: {
                            total: totalMarks,
                            correct: totalCorrect
                        },
                        overallDifficulty: difficulty,
                        dateOfAttempt: quiz.created_at,
                        complete: quiz.complete
                    }} topics={[]} id={quiz.id}
                /></li>
            })
        }
    </ol>
  )
}