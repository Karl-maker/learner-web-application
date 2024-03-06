'use client'

import React, { useLayoutEffect, useState } from 'react';
import { createContext } from 'react';
import { User, UserContext } from '@/types/user';
import { defaultUser, defaultUserContext } from '@/constants/user';
import { GetCurrentAccountResponse } from '@/types/account';
import { api } from '@/utils/fetch';
import { GetCurrentStudentResponse } from '@/types/student';

export const UserAuthContext = createContext<UserContext>(defaultUserContext);

export default function MainTemplate({ children }: { children: React.ReactNode }) {

    const [user, setUser] = useState<User>(defaultUser);

    useLayoutEffect(() => {
        (async () => {
            console.log('MainTemplate: Render')
            const [getCurrentAccountResponse, getCurrentStudentResponse] = await Promise.all([
                await api<GetCurrentAccountResponse>(`/api/v1/account`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }, true),
                await api<GetCurrentStudentResponse>(`/api/v1/student`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }, true)

            ])

            console.log('Promise.all(): ', [getCurrentAccountResponse, getCurrentStudentResponse])

            if(!getCurrentAccountResponse.data?.data) return;

            const account = getCurrentAccountResponse.data?.data;
            const student = getCurrentStudentResponse.data?.data;

            setUser(current => ({
                ...current,
                authenticated: true,
                type: account?.type || null,
                details: {
                    ...current.details,
                    first_name: account?.first_name || '',
                    last_name: account?.last_name || '',
                    account_id: account?.id || '',
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
