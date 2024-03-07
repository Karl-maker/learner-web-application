import React, { useEffect, useState } from 'react';
import { MultipleChoice, Question } from '@/types/question';
import { QuizQuestion } from '@/types/quiz';

export type QuestionQuizCardType = {
    index: number;
    height?: number;
    width?: number;
    question: Question;
    quizQuestionProgress: QuizQuestion;
    isLoading: boolean;
    questionIndex: number;
    handleAnswer: (i: number, correct: boolean) => Promise<void>;
}

const QuestionQuizCardDefault: Partial<QuestionQuizCardType> = {
    height: 20,
    width: 20,
}

/**
 * QuestionQuizCard Component
 * @desc Renders question card
 * @todo complete implementation 
 * @hint use Card component in from ../general/card.tsx
 * @param option QuestionQuizCardType - Options for the question card.
 */
const QuestionQuizCard: React.FC<QuestionQuizCardType> = (option: QuestionQuizCardType) => {
    // Merge default options with provided options
    const questionQuizOptions = { ...QuestionQuizCardDefault, ...option };

    const [shuffledChoices, setShuffledChoices] = useState<MultipleChoice[]>([]);

    // Function to shuffle an array
    const shuffleArray = (array: MultipleChoice[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    useEffect(() => {
        if (option.question.multiple_choice) {
            const shuffled = shuffleArray(option.question.multiple_choice);
            setShuffledChoices(shuffled);
        }
    }, [option.question.id, option.question.multiple_choice]);

    return (
        <div style={{ backgroundColor: option.quizQuestionProgress.complete ? 'green' : 'transparent' }}>
            {/* JSX content */}
            {
                !option.isLoading ?
                    <>
                        <h1>{option.question.name}</h1>
                        {
                            shuffledChoices.map((multiple_choice, i) => {
                                return (
                                    <ol key={i} onClick={async () => {
                                        await option.handleAnswer(option.questionIndex, multiple_choice.is_correct);
                                    }}>
                                        {`${i + 1}) ${multiple_choice.content.text ? multiple_choice.content.text : ""}`}
                                    </ol>
                                );
                            })
                        }
                    </>
                    :
                    <p>Loading...</p>
            }
        </div>
    );
}

export default QuestionQuizCard;
