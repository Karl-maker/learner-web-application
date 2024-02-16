import { GetManyQueryParams, UseBase } from "../base";

export type Subject = {            
    "id": string;
    "name": string;
    "description": string;
    "created_at": Date;
    "updated_at": Date;
    "v": number;
};

export type GetAllSubjectsResponse = {
    data: Subject[];
    amount: number;
}

export type UseGetAllSubjects = UseBase & {
    getAll(options: GetManyQueryParams<Subject>): Promise<void>;
    subjects: Subject[] | null;
    amount: number | null;
}