"use client";

import { UserAuthContext } from "@/app/template";
import ProfileAvatar from "@/components/profile/profile-avatar";
import useGetCurrentStudent from "@/hooks/student/get-current";
import { Navigation } from "@/types/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

const navSkeletonStudentInfoLoad = (width: number = 20) => `skeleton w-${width} h-4 m-1`;

/**
 * @FIXME bring account and logout at the bottom
 */

export type NavigationBarOptions = {
  options: Navigation;
};

const NavigationBar: React.FC<NavigationBarOptions> = (
  input: NavigationBarOptions
) => {
  const route = useRouter();
  const { user } = useContext(UserAuthContext);
  const current_student = useGetCurrentStudent();

  useEffect(() => {
    (async () => {
      await current_student.get();
    })();
  }, [user]);

  return (
    <div className="flex flex-col justify-between">
      <nav className="bg-tertiary w-[300px] h-screen p-5 drop-shadow-lg">
        <div>
          <p className="text-center mb-3 mt-1">Learner Hub</p>
          <div className="text-center">
            { (user.details || current_student.isLoading) && <ProfileAvatar src={user.details?.profile?.picture?.url} name={user.details?.first_name || ''} width={120} height={120} isLoading={current_student.isLoading}/>}
          </div>
          <div className="flex flex-col gap-1 mt-4 mb-4 items-center">
            { current_student.isLoading ? <div className={navSkeletonStudentInfoLoad(16)}></div> : <p>{ user.details?.first_name ? `${user.details?.first_name} ${user.details?.last_name}` : ""}</p> }
            { current_student.isLoading ? <div className={navSkeletonStudentInfoLoad(32)}></div> : <p> { current_student.student?.school?.name || '' } </p> }
            { current_student.isLoading ? <div className={navSkeletonStudentInfoLoad(16)}></div> : <p> { current_student.student?.grade ? `Grade ${current_student.student?.grade}` : "" || ''  } </p> }
          </div>
        </div>
        <div className='flex flex-col justify-between' >
          <div>
            <ul className="menu [&_li>*]:rounded-none">
                {Object.entries(input.options.items).filter(([k, val]) => val.t === 1).map(([key, value]) => {
                  // Check if the item should be displayed
                  if (value.auth && !user.authenticated) return null;

                  const typeVal = value.t; // value.t is a number from 1 to 3 you can use to give different styles to conditionally. login is 3, account is 2 and all the rest are 1
                  return (
                    <li>
                    {
                      !input.options.loading ?   
                        <>
                        {
                          value.action === undefined ?
                          <Link href={`${value.path}`} className='p-5 text-xl justify-center hover:border-secondary hover:border-l-2'>
                            { value.t === 1 ? value.icon.active : '&' }
                            { value.name }
                          </Link> 
                          :
                          <div onClick={() => value.action} className='p-5 text-xl justify-center hover:border-secondary hover:border-l-2'>
                            { value.t === 1 ? value.icon.active : '&' }
                            { value.name }
                          </div>
                        }
                        </>  
                        : 
                        <div className="skeleton h-12 w-full"></div>
                    }
                    </li>
                  );
                })}
              </ul>
          </div>
          <div >
            <ul className="menu [&_li>*]:rounded-none">
              {Object.entries(input.options.items).filter(([k, val]) => val.t === 2).map(([key, value]) => {
                // Check if the item should be displayed
                if (value.auth && !user.authenticated) return null;

                const typeVal = value.t; // value.t is a number from 1 to 3 you can use to give different styles to conditionally. login is 3, account is 2 and all the rest are 1
                return (
                  <li>
                  {
                    !input.options.loading ?   
                      <>
                      {
                        value.action === undefined ?
                        <Link href={`${value.path}`} className='p-5 text-xl justify-center hover:border-secondary hover:border-l-2'>
                          { value.t === 1 ? value.icon.active : '&' }
                          { value.name }
                        </Link> 
                        :
                        <div onClick={() => value.action} className='p-5 text-xl justify-center hover:border-secondary hover:border-l-2'>
                          { value.t === 1 ? value.icon.active : '&' }
                          { value.name }
                        </div>
                      }
                      </>  
                      : 
                      <div className="skeleton h-12 w-full"></div>
                  }
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;
