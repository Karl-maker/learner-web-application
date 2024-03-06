'use client'

import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { UserAuthContext } from '../template';

export default function AuthTemplate({ children }: { children: React.ReactNode }) {

    const { user } = useContext(UserAuthContext);
    const pathname = usePathname()
    const router = useRouter();

    useEffect(() => {
        (async () => {
            console.log('DashboardTemplate: Render');
            const pathsToCheck = ['/home', '/quiz'];
            // Check if the current path is not included in the list of paths
            if (user.authenticated && pathsToCheck.includes(pathname) && !user.details?.student_id) router.push("/onboard");
        })();
    }, [user.details]);

    return (
        <>
            {children}
        </>
    );
}
