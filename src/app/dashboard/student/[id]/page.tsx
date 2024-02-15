"use client"

import useGetStudentById from "@/hooks/student/get-by-id";
import { Student } from "@/types/student";
import { useEffect, useState } from "react";

/**
 * @desc student profiles are here and can display information about students
 * @todo complete styling 
 */


export default function StudentProfilePage({ params }: { params: { id: string } }) {
    // const { navigation, setNavigation } = useContext(NavigationLayoutContext);
    // const updateDashboard = () => {
    //     setNavigation({
    //         ...navigation,
    //         precentage: navigation.precentage + 0.1,
    //     })
    // }

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