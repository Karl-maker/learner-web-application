/* eslint-disable */

"use server"

import { getAccountById } from "@/services/account";
import { getAllStudentQuiz } from "@/services/quiz";
import { getStudentById } from "@/services/student";
import { Quiz } from "@/types/quiz";
import StudentQuizzesWidget from "@/widgets/quiz/student-quizzes";
import type { Metadata, ResolvingMetadata } from 'next'
import Image from "next/image";
 
type StudentProfileProps = {
  params: { id: string };
  query: any;
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

export default async function StudentProfilePage({ params, query }: StudentProfileProps) {

    try {
        const student = await getStudentById(params.id);
        const account = student?.account_id ? await getAccountById(student?.account_id) : null;
        const quizzes = await getAllStudentQuiz(params.id, {
            sort: 'desc',
            field: query?.field as keyof Quiz || 'created_at',
            page_size: 10,
            page: Number(query?.page) || 1,
        });

        return (
          <div className="p-8">
          {student === null ? (
              <p>No student data found.</p>
          ) : (
              <>
                  <h2 className="text-2xl font-bold mb-4">Student Information</h2>
                  {account && (
                      <p className="text-lg font-semibold mb-2">{`${account.first_name} ${account.last_name}`}</p>
                  )}
                  {student.profile?.picture?.url ? (
                      <div className="avatar">
                          <div className="w-12 rounded-full">
                              <Image
                                  src={student.profile?.picture?.url}
                                  alt={`${account?.first_name || 'Student'}'s profile image`}
                                  width={80}
                                  height={80}
                              />
                          </div>
                      </div>
                  ) : (
                      <div className="avatar placeholder">
                          <div className="bg-neutral text-neutral-content rounded-full w-12">
                              <span className="text-3xl">{account?.first_name.charAt(0) || ''}</span>
                          </div>
                      </div>
                  )}
                  {student.school?.name && <p className="text-lg font-semibold mb-2">{student.school?.name}</p>}
                  {student.location?.country && <p className="text-lg font-semibold mb-2">{student.location?.country}</p>}
                  {student.grade && <p className="text-lg font-semibold mb-2">Grade: {student.grade}</p>}
                  {quizzes && <StudentQuizzesWidget data={quizzes || []} />}
              </>
          )}
      </div>
      );

    } catch(err) {

        return (
            <div>
                <p>Apologies, we couldn't retrieve the student at the moment. Please try again later.</p>
            </div>
        );
    }
}