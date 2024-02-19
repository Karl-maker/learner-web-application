'use client'

import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import { useRouter } from 'next/navigation'
import { User, UserContext } from '@/types/user';
import { defaultUser, defaultUserContext } from '@/constants/user';
import { GetCurrentAccountResponse } from '@/types/account';
import { api } from '@/utils/fetch';
import { GetCurrentStudentResponse } from '@/types/student';
import { usePathname } from 'next/navigation'

export const UserAuthContext = createContext<UserContext>(defaultUserContext);

export default function MainTemplate({ children }: { children: React.ReactNode }) {

    const [user, setUser] = useState<User>(defaultUser);
    const pathname = usePathname()
    const router = useRouter();

    useEffect(() => {
        (async () => {
            console.log('MainTemplate: Render')
            const getCurrentAccountResponse = await api<GetCurrentAccountResponse>(`/api/v1/account`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }, true);

            if(!getCurrentAccountResponse.data?.data) return;

            const account = getCurrentAccountResponse.data?.data;

            setUser(current => ({
                ...current,
                authenticated: true,
                type: account?.type || null,
                details: {
                    ...current.details,
                    first_name: account?.first_name || '',
                    last_name: account?.last_name || '',
                    account_id: account?.id || '',
                },
            }));
        
            if(getCurrentAccountResponse.data.data.type !== 'student') return;

            const getCurrentStudentResponse = await api<GetCurrentStudentResponse>(`/api/v1/student`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }, true);

            const pathsToCheck = ['home', 'quiz'];

            // Check if the current path is not included in the list of paths
            if (!getCurrentStudentResponse.data?.data && pathsToCheck.includes(pathname)) router.push("/onboard");
            
            const student = getCurrentStudentResponse.data?.data;

            setUser(current => ({
                ...current,
                authenticated: true,
                details: {
                    ...current.details,
                    account_id: student?.account_id || '',
                    student_id: student?.id || '',
                },
            }));

        })();
    }, []);

    return (
        <UserAuthContext.Provider value={{ user, setUser }}>
            {children}
        </UserAuthContext.Provider>
    );
}
