"use client"

import useGetCurrentStudent from "@/hooks/student/get-current";
import { useEffect } from "react";

/**
 * @desc student profiles are here and can display information about students
 * @todo complete styling 
 */


export default function CurrentStudentProfilePage() {

    const getStudentById = useGetCurrentStudent();

    useEffect(() => {
        (async () => {
            getStudentById.get();
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if(getStudentById.error) alert(getStudentById.error.message);
        })();
    }, [getStudentById.error]);


    return (
        <div>{getStudentById.student === null ? 'no student' : `Student's School: ${getStudentById.student.school?.name}`}</div>
    );
}