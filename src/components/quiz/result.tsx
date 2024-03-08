import { DifficultyLevels } from "@/types/quiz";
import { daysAgo } from "@/utils/date";
import Link from "next/link";

export type QuizResultType = {
    id: string;
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

export const QuizResultCard: React.FC<QuizResultType> = (option: QuizResultType) => {
    const { total, correct } = option.questions.amount;
    const correctPercentage = (correct / total) * 100;

    const difficultyBadge = (d: DifficultyLevels) => {
        if (d === 'easy') return 'badge-success';
        if (d === 'medium') return 'badge-warning';
        if (d === 'hard' || d === 'very hard') return 'badge-error';
    };

    return (
        <Link href={`/quiz/${option.id}`}>
            <div className="p-8 bg-white shadow-md rounded-lg relative">
                <div className="absolute top-3 right-3">
                    <p className={`m-1 badge badge-outline ${option.questions.complete ? 'badge-success' : 'badge-error'}`}>{option.questions.complete ? 'Complete' : 'Incomplete'}</p>
                    <p className={`m-1 badge badge-outline ${difficultyBadge(option.questions.overallDifficulty)}`}>{option.questions.overallDifficulty}</p>
                </div>
                <div className="flex items-center">
                    <div className="flex items-center">
                        <p className="radial-progress mr-4 bg-primary text-primary-content border-4 border-primary" style={{"--value": correctPercentage, "--thickness": "2px" } as React.CSSProperties} role="progressbar">{`${correctPercentage}%`}</p>
                        <div className="text-sm text-gray-600">{`${correct}/${total}`}</div>
                    </div>
                </div>
                <div className="absolute bottom-3 right-3">
                    <p className="text-gray-500 mb-1">{daysAgo(new Date(option.questions.dateOfAttempt))}</p>
                </div>
                <div>
                    <div className="flex flex-wrap">
                        {option.topics.map((topic, index) => (
                            <span key={index} className="mr-2 mb-2 text-info">
                                {topic}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );
}
