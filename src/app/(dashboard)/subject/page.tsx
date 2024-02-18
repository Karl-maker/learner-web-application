"use client"

import useGetAllSubjects from "@/hooks/subject/get-all";
import { Subject } from "@/types/subject";
import { useEffect, useState } from "react";

/**
 * @desc subject list 
 * @todo complete styling 
 */


export default function CurrentStudentProfilePage() {

    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(5);
    const [field, setField] = useState<keyof Subject>('name');
    const [sort, setSort] = useState<'asc' | 'desc'>('asc');

    const getSubjects = useGetAllSubjects();

    useEffect(() => {
        (async () => {
            getSubjects.getAll({ page, page_size: pageSize, field, sort });
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if(getSubjects.error) alert(getSubjects.error.message);
        })();
    }, [getSubjects.error]);


    return (
        <div>{getSubjects.subjects === null ? 'no subjects' : 
            <div>
                {/* { Display List of Subjects } */}
                { getSubjects.subjects.map((subject: Subject) => {
                    return <p>{subject.name}</p>
                })}
                <p>results found: {getSubjects.amount || 'n/a'}</p>
            </div>
        }</div>
    );
}