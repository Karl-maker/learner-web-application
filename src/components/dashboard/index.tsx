"use client"

import { UserAuthContext } from "@/app/template";
import Header from "./header";
import Navigation from "./nav";
import { useContext, useEffect, useState } from "react";
import { NavigationItem } from "@/types/navigation";
import { usePathname } from "next/navigation";

export default function Dashboard () {

    const { user } = useContext(UserAuthContext);
    const pathname = usePathname()
    const [current, setCurrent] = useState<string>('subject');
    const navItems = {
        subject: {
            t: 1,
            name: "Subjects",
            alt: "Subjects",
            path: "/subject",
            disable: false,
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
            path: "/student",
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
            path: "/home",
            action: () => {
                console.log('logout')
            },
            disable: !user.authenticated,
            icon: {
                active: <></>,
                inactive: <></>
            },
        }
    };

    useEffect(() => {
        const path = pathname;
        const foundItem = Object.entries(navItems).find(item => item[1]['path'] === path);
        setCurrent(foundItem ? foundItem[0] : "");
    }, [pathname]);

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