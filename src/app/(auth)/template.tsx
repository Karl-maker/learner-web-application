'use client'

import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { createContext } from 'react';
import { useRouter } from 'next/navigation'
import { User, UserContext } from '@/types/user';
import { defaultUser, defaultUserContext } from '@/constants/user';
import { usePathname } from 'next/navigation'
import { UserAuthContext } from '../template';

export default function AuthTemplate({ children }: { children: React.ReactNode }) {

    const { user } = useContext(UserAuthContext);
    const pathname = usePathname()
    const router = useRouter();

    useLayoutEffect(() => {
        (async () => {
            console.log('AuthTemplate: Render');
            const pathsToCheck = ['/login', '/signup'];
            // Check if the current path is not included in the list of paths
            if (pathsToCheck.includes(pathname) && user.authenticated) router.push("/home");
        })();
    }, [user, pathname, router]);

    return (
        <>
            {children}
        </>
    );
}
