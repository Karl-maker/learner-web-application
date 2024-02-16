import { UseBase } from "../base";
import { MediaTypes } from "../media";

export type Question = {
    "id": string;
    "name": string;
    "tier_level": number;
    "marks": number;
    "content": Content[];
    "multiple_choice"?: MultipleChoice[];
    "description": string;
    "topic": string;
    "created_at": Date;
    "updated_at": Date;
    "v": number;
};

export type Content = {
    type: MediaTypes;
    url?: string;
    ext?: string;
    id?: string;
    text?: string;
};

export type MultipleChoice = {
    "is_correct": boolean;
    "content": Content;
};

export type UseGetQuestionById = UseBase & {
    question: Question | null;
    get: (question_id: string) => Promise<void>;
};

export type GetQuestionByIdResponse = {
    data: Question;
};