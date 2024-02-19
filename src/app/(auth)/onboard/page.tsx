"use client"

import { UserAuthContext } from "@/app/template";
import OnboardingProcess from "@/components/authentication/onboarding-process";
import useCreateCurrentStudent from "@/hooks/student/create-current";
import { Student } from "@/types/student";
import { useContext, useEffect, useState } from "react"

/**
 * @note The "Start By Telling Me About Yourself" page
 */

export default function Onboard() {

    const [student, setStudent] = useState<Omit<Student, 'account_id' | 'id'>>({});
    const [page, setPage] = useState<number>(1);
    const createCurrentStudent = useCreateCurrentStudent(); 

    const onComplete = () => {
        (async () => {
            if(!student) return;

            createCurrentStudent.create({
                ...student
            });
        })();
    };

    return <>{
        createCurrentStudent.isLoading ? <p>Loading</p> :
        <OnboardingProcess page={page} setPage={setPage} onComplete={onComplete} student={student} setStudent={setStudent} />
    }</>
}