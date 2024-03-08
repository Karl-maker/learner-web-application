import { DifficultyLevels } from "@/types/quiz";

export const averageDifficulty = (d: number): DifficultyLevels => {
    if(d > 17) return 'very hard';
    if(d > 13) return 'hard';
    if(d > 7) return 'medium';
    return 'easy';
}