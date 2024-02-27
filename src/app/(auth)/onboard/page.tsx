"use client"

import OnboardingProcess from "@/components/authentication/onboarding-process";
import useCreateCurrentStudent from "@/hooks/student/create-current";
import { CreateCurrentStudentResponse, Student } from "@/types/student";
import { ApplicationError } from "@/utils/error";
import { api } from "@/utils/fetch";
import { checkErrorInstance } from "@/utils/instance/error";
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
    const [isCreateStudentLoading, setIsCreateStudentLoading] = useState<boolean>(false);
    const createCurrentStudent = useCreateCurrentStudent(); 

    const onComplete = () => {
        (async () => {
            try{
                setIsCreateStudentLoading(true);
                
                if(!student) return;

                const response = await api<CreateCurrentStudentResponse>(`/api/v1/student`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(student)
                }, true);
    
                const createdStudent: Student | null = response.data?.data || null;
    
                if(createdStudent === null) throw "Student Not Created"
                
                router.push('/home')
            } catch(err) {
                const error: ApplicationError = checkErrorInstance(err)
                alert(error.message)
            } finally {
                setIsCreateStudentLoading(false);
            }
        })();
    };

    useEffect(() => {
        setIsClient(true);
    }, []);

    return <>{
        isCreateStudentLoading || !isClient ? <p>Loading</p> :
        <OnboardingProcess page={page} setPage={setPage} onComplete={onComplete} student={student} setStudent={setStudent} />
    }</>
}