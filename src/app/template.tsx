'use client'

import React, { useEffect, useState, useContext } from 'react';
import { createContext } from 'react';
import useGetCurrentAccount from '@/hooks/account/get-current';
import useGetCurrentStudent from '@/hooks/student/get-current';
import { User, UserContext } from '@/types/user';
import { defaultUser, defaultUserContext } from '@/constants/user';

export const UserAuthContext = createContext<UserContext>(defaultUserContext);

export default function MainTemplate({ children }: { children: React.ReactNode }) {
    const currentAccount = useGetCurrentAccount();
    const currentStudent = useGetCurrentStudent();

    const [user, setUser] = useState<User>(defaultUser);

    useEffect(() => {
        (async () => {
            await currentAccount.get();
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (!currentAccount.account) return;
            if (currentAccount.account.type === 'student') await currentStudent.get();

            setUser(current => ({
                ...current,
                authenticated: true,
                type: currentAccount.account?.type || null,
                details: {
                    ...current.details,
                    first_name: currentAccount.account?.first_name || '',
                    last_name: currentAccount.account?.last_name || '',
                    account_id: currentAccount.account?.id || '',
                },
            }));
        })();
    }, [currentAccount.account]);

    useEffect(() => {
        (async () => {
            if (!currentStudent.student) return;

            setUser(current => ({
                ...current,
                details: {
                    ...current.details,
                    account_id: currentStudent.student?.account_id || '',
                    student_id: currentStudent.student?.id || '',
                },
            }));
        })();
    }, [currentStudent.student]);

    return (
        <UserAuthContext.Provider value={{ user, setUser }}>
            {children}
        </UserAuthContext.Provider>
    );
}
