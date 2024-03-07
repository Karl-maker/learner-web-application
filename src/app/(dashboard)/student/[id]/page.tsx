/* eslint-disable */

"use server"

import { getAccountById } from "@/services/account";
import { getStudentById } from "@/services/student";
import type { Metadata, ResolvingMetadata } from 'next'
 
type StudentProfileProps = {
  params: { id: string }
}
 
export async function generateMetadata(
  { params }: StudentProfileProps,
  parent: ResolvingMetadata
): Promise<Metadata> {

  const id = params.id
  const student = await getStudentById(id);
  const account = student?.account_id ? await getAccountById(student?.account_id) : null;
  const title = `CXC & CSEC ${student?.display_name || account?.first_name || student?.school?.name || "" }'s Student Profile`
 
  return {
    title,
    openGraph: {
      title,
      description: `Explore ${student?.display_name || account?.first_name || 'this student'}'s academic journey at ${student?.school?.name}! Dive into ${student?.display_name || account?.first_name || 'this student'}'s achievements, interests, and educational milestones. Get insights into ${student?.display_name || account?.first_name ||  'this student'}'s educational background, extracurricular activities, and aspirations. Discover how ${student?.display_name || account?.first_name || 'this student'} is shaping their future at ${student?.school?.name || 'their school'} through their unique talents and experiences. Learn more about ${student?.display_name || account?.first_name ||  'this student'}'s contributions to the school community and their personal growth as a student. Stay updated with ${student?.display_name || account?.first_name ||  'this student'}'s latest accomplishments and educational endeavors at ${student?.school?.name || 'their school'}.`,
      siteName: "CXC & CSEC Learners Hub"
    },
  }
}

/**
 * @desc student profiles are here and can display information about students
 * @todo complete styling 
 */

export default async function StudentProfilePage({ params }: StudentProfileProps) {

    try {
        const student = await getStudentById(params.id);
        const account = student?.account_id ? await getAccountById(student?.account_id) : null;

        return (
            <div>{student === null ? 'no student' : `Student's School: ${student.school?.name}`}</div>
        );

    } catch(err) {

        return (
            <div>
                <p>Apologies, we couldn't retrieve the student at the moment. Please try again later.</p>
            </div>
        );
    }
}