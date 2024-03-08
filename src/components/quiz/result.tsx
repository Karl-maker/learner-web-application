import { DifficultyLevels } from "@/types/quiz";

export type QuizResultType = {
     questions: {
        amount: {
            total: number;
            correct: number;
        };
        overallDifficulty: DifficultyLevels;
        dateOfAttempt: Date;
        complete: boolean;
     };
     topics: string[];
}

export const QuizResultCard : React.FC<QuizResultType> = (option: QuizResultType) => {
    return (
        <div className="p-8 bg-white shadow-md rounded-lg">
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Quiz Result</h2>
                <p className="text-gray-800 mb-2 font-bold text-2xl">{`${option.questions.amount.correct / option.questions.amount.total}%`}</p>
                <p className="text-gray-600 mb-2">{option.questions.amount.correct} / {option.questions.amount.total}</p>
                <p className="text-gray-500 mb-1">{option.questions.complete ? 'Complete' : 'Incomplete'}</p>
                <p className="text-gray-500 mb-1">{option.questions.overallDifficulty}</p>
                <p className="text-gray-500 mb-1">{new Date(option.questions.dateOfAttempt).toLocaleDateString()}</p>
            </div>
            <div>
                <div className="flex flex-wrap">
                    {option.topics.map((topic, index) => (
                        <span key={index} color="info" className="mr-2 mb-2">
                            {topic}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}