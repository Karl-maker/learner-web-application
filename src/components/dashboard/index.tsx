"use client"

import { UserAuthContext } from "@/app/template";
import Header from "./header";
import Navigation from "./nav";
import { useContext, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { NavigationItem } from "@/types/navigation";
import { logout } from "@/services/authentication";

export default function Dashboard () {

    const { user } = useContext(UserAuthContext);
    const pathname = usePathname()
    const [current, setCurrent] = useState<string>('subject');
    const navItems = useMemo<Record<string, NavigationItem>>(() => ({
        subject: {
            t: 1,
            name: "Subjects",
            alt: "Subjects",
            path: "/subject",
            disable: false,
            auth: false,
            icon: {
                active: <></>,
                inactive: <></>
            },
        },
        leaderboard: {
            t: 1,
            name: "Leaderboards",
            alt: "Leaderboards",
            path: "/leaderboard",
            auth: false,
            disable: false,
            icon: {
                active: <></>,
                inactive: <></>
            },
        },
        stats: {
            t: 1,
            name: "Awards & Points",
            alt: "Awards and Points",
            path: "/stats",
            auth: false,
            disable: !user.authenticated,
            icon: {
                active: <></>,
                inactive: <></>
            },
        },
        progression: {
            t: 1,
            name: "Progression",
            alt: "Progression",
            path: "/progression",
            auth: true,
            disable: !user.authenticated,
            icon: {
                active: <></>,
                inactive: <></>
            },
        },
        account: {
            t: 2,
            name: "Account",
            alt: "Account",
            path: user.details?.student_id ? `/student/${user.details?.student_id}` : '/onboard',
            auth: true,
            disable: !user.authenticated,
            icon: {
                active: <></>,
                inactive: <></>
            },
        },
        logout: {
            t: 3,
            name: "Logout",
            alt: "Logout",
            path: '/home',
            auth: true,
            action: () => {
                logout();
            },
            disable: !user.authenticated,
            icon: {
                active: <></>,
                inactive: <></>
            },
        }
    }), [user.authenticated, user.details?.student_id]);
    useEffect(() => {
        const path = pathname;
        const foundItem = Object.entries(navItems).find(item => item[1]['path'] === path);
        setCurrent(foundItem ? foundItem[0] : "");
    }, [pathname, navItems]);

    return <>
        <Header name={user.details?.first_name || ""} isLoggedIn={user.authenticated}/>
        <Navigation options={{
            profile: {
                name: user.details?.first_name || "",
                picture: user.details?.profile?.picture?.url || ""
            },
            precentage: 0,
            display: false,
            items: navItems,
            current
        }}/>
    </>
}