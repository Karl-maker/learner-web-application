"use client"

import { UserAuthContext } from "@/app/template";
import Header from "./header";
import Navigation from "./nav";
import { use, useContext, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { NavigationItem } from "@/types/navigation";
import { logout } from "@/services/authentication";

// React Icons

import { MdOutlineDashboard } from 'react-icons/md';
import { BiBook } from 'react-icons/bi';
import { LiaTrophySolid } from 'react-icons/lia';
import { GrLineChart } from 'react-icons/gr';

export default function Dashboard () {

    const { user, isLoading } = useContext(UserAuthContext);
    const pathname = usePathname()
    const [current, setCurrent] = useState<string>('subject');
    const navItems = useMemo<Record<string, NavigationItem>>(() => ({
        dashboard: {
            t: 1,
            name: "Dashboard",
            alt: "Dashboard",
            path: "/home",
            auth: true,
            disable: !user.authenticated,
            highlight: true,
            icon: {
                active: <MdOutlineDashboard/>,
                inactive: <></>
            },
        },
        subject: {
            t: 1,
            name: "Subjects",
            alt: "Subjects",
            path: "/subject",
            disable: false,
            auth: false,
            highlight: true,
            icon: {
                active: <BiBook/>,
                inactive: <></>
            },
        },
        // quiz: {
        //     t: 1,
        //     name: "Quiz",
        //     alt: "Quiz",
        //     path: "/quiz",
        //     auth: true,
        //     disable: !user.authenticated,
        //     highlight: true,
        //     icon: {
        //         active: <></>,
        //         inactive: <></>
        //     },
        // },
        // leaderboard: {
        //     t: 1,
        //     name: "Leaderboards",
        //     alt: "Leaderboards",
        //     path: "/leaderboard",
        //     auth: false,
        //     disable: false,
        //     highlight: true,
        //     icon: {
        //         active: <></>,
        //         inactive: <></>
        //     },
        // },
        stats: {
            t: 1,
            name: "Awards",
            alt: "Awards",
            path: "/stats",
            auth: false,
            disable: !user.authenticated,
            highlight: true,
            icon: {
                active: <LiaTrophySolid/>,
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
            highlight: true,
            icon: {
                active: <GrLineChart />,
                inactive: <></>
            },
        },
        account: {
            t: 2,
            name: "Account",
            alt: "Account",
            path: user.details?.student_id ? `/student/${user.details?.student_id}?page=1&sort=desc&field=created_at` : '/onboard',
            auth: true,
            disable: !user.authenticated,
            highlight: true,
            icon: {
                active: <></>,
                inactive: <></>
            },
        },
        logout: {
            t: 2,
            name: "Logout",
            alt: "Logout",
            path: '/home',
            auth: true,
            highlight: false,
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
    }, [pathname, navItems, isLoading]);

    return <>
        {/* <Header name={user.details?.first_name || ""} isLoggedIn={user.authenticated} isLoading={isLoading} picture={user.details?.profile?.picture?.url || ''}/> */}
        <Navigation options={{
            loading: isLoading,
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