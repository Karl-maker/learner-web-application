/* eslint-disable */

"use server"

import { getAllSubjects } from "@/services/subject";
import {  Subject } from "@/types/subject";

/**
 * @desc subject list 
 * @todo complete styling 
 */


export default async function CurrentStudentProfilePage() {

    try {

        const page: number = 1;
        const pageSize: number = 5;
        const field: keyof Subject = 'name';
        const sort: 'asc' | 'desc' = 'asc';
    
        const { subjects, results } = await getAllSubjects({ page, page_size: pageSize, field, sort });
    
        return (
            <div>{subjects === null ? 'no subjects' : 
                <div>
                    {/* { Display List of Subjects } */}
                    { subjects.map((subject: Subject, i) => {
                        return <p key={i}>{subject.name}</p>
                    })}
                    <p>results found: {results || 'n/a'}</p>
                </div>
            }</div>
        );

    } catch(err) {
        return (
            <div>
                <p>Apologies, we couldn't retrieve the subjects at the moment. Please try again later.</p>
            </div>
        );
    }

}
