"use client"

import useGetStudentById from "@/hooks/student/get-by-id";
import { useEffect } from "react";

/**
 * @desc student profiles are here and can display information about students
 * @todo complete styling 
 */


export default function StudentProfilePage({ params }: { params: { id: string } }) {
    const getStudentById = useGetStudentById();

    useEffect(() => {
        (async () => {
            getStudentById.get(params.id);
        })();
    }, [params.id]);

    useEffect(() => {
        (async () => {
            if(getStudentById.error) alert(getStudentById.error.message);
        })();
    }, [getStudentById.error]);


    return (
        <div>{getStudentById.student === null ? 'no student' : `Student's School: ${getStudentById.student.school?.name}`}</div>
    );
}