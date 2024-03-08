import { UseBase } from "../base";

export type Quiz = {
    student_id: string; 
    questions: QuizQuestion[];
    type: QuizType;
    complete: boolean;
    score: number;
    created_at: Date;
    updated_at: Date;
    id: string;
    v: number;
}

export type QuizQuestion = {
    id: string;
    possible_marks: number;
    earned_marks: number;
    complete: boolean;
    message?: string;
    tier_level: number;
}

export type QuizQuestionResult = {
    complete: boolean;
    questions: QuizQuestion[];
}

export type QuizType = 'generated';

export type GenerateQuizResponse = {
    data: Quiz | null;
}

export type UpdateQuizByIdResponse = {
    data: Quiz | null;
    status: boolean;
}

export type GetQuizByIdResponse = {
    data: Quiz | null;
}

export type GetAllQuizzesResponse = {
    data: Quiz[] | null;
}

export type GenerateQuizParams = {
    "no_of_questions": number;
    "topic"?: string;
    "difficulty": number;
    "range": number;
}

export type DifficultyLevels = 'easy' | 'medium' | 'hard' | 'very hard'

export type UseGenerateQuiz = UseBase & {
    start: (params: GenerateQuizParams) => Promise<void>;
    quiz: Quiz | null;
}

export type UseGetQuizById = UseBase & {
    get: (params: string) => Promise<void>;
    quiz: Quiz | null;
}

export type UseUpdateQuizById = UseBase & {
    update: (id: string, options: QuizQuestionResult) => Promise<void>;
    quiz: Quiz | null;
}