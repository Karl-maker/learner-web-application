"use client"

import OnboardingProcess from "@/components/authentication/onboarding-process";
import useCreateCurrentStudent from "@/hooks/student/create-current";
import { Student } from "@/types/student";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

/**
 * @note The "Start By Telling Me About Yourself" page
 */

export default function Onboard() {
    const [student, setStudent] = useState<Omit<Student, 'account_id' | 'id'>>({});
    const [page, setPage] = useState<number>(1);
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const createCurrentStudent = useCreateCurrentStudent(); 

    const onComplete = () => {
        (async () => {
            if(!student) return;

            createCurrentStudent.create({
                ...student
            });
        })();
    };

    useEffect(() => {
        setIsClient(true);
      }, []);

    useEffect(() => {
        (() => {
            if(!createCurrentStudent.student) return;
            router.push('/home')
        })();
    }, [createCurrentStudent.student])

    if (!isClient) return <p>Loading</p>;

    return <>{
        createCurrentStudent.isLoading ? <p>Loading</p> :
        <OnboardingProcess page={page} setPage={setPage} onComplete={onComplete} student={student} setStudent={setStudent} />
    }</>
}