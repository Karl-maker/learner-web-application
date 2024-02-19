import { UseBase } from "../base";

export type Student = {
    id: string;
    account_id: string; // FK
    username?: string;
    display_name?: string;
    school?: {
        name?: string;
    };
    location?: {
        country: string;
    };
    birth_of_date?: Date;
    grade?: number;
    profile?: {
        picture?: {
            id: string;
            ext: string;
            url: string;
        }
    };
}

export type GetCurrentStudentResponse = {
    data: Student
}

export type GetStudentByIdResponse = {
    data: Student
}

export type CreateCurrentStudentResponse = {
    data: Student
}

export type UpdateCurrentStudentResponse = {
    data: Student;
    updated: boolean;
}

export type UseGetCurrentStudent = UseBase & {
    student: Student | null;
    get: () => Promise<void>;
}

export type UseGetStudentById = UseBase & {
    student: Student | null;
    get: (student_id: string) => Promise<void>;
}

export type UseCreateCurrentStudent = UseBase & {
    student: Student | null;
    create: (input: CreateCurrentStudentInput) => Promise<void>;
}

export type UseUpdateCurrentStudent = UseBase & {
    student: Student | null;
    status: boolean | null;
    update: (input: UpdateCurrentStudentInput) => Promise<void>;
}

export type CreateCurrentStudentInput = Omit<Student, 'id' | 'account_id'>;

export type UpdateCurrentStudentInput = { 
    username?: string;
    display_name?: string;
    school?: {
        name?: string;
    };
    location?: {
        country: string;
        district: string;
    };
    grade?: number;
}