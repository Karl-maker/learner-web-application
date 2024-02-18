"use client"

import { UserAuthContext } from "@/app/template";
import Header from "./header";
import Navigation from "./nav";
import { useContext } from "react";

export default function Dashboard () {

    const { user } = useContext(UserAuthContext);

    return <>
        <Header name={user.details?.first_name || ""} isLoggedIn={user.authenticated}/>
        <Navigation options={{
            profile: {
                name: user.details?.first_name || "",
                picture: user.details?.profile?.picture?.url || ""
            },
            precentage: 0,
            display: false,
            items: {
                profile: {
                    name: "Profile",
                    alt: "Student Profile",
                    path: "/profile",
                    disable: false,
                    icon: {
                        active: <></>,
                        inactive: <></>
                    },
                },
                settings: {
                    name: "Settings",
                    alt: "Settings",
                    path: "/setting",
                    disable: false,
                    icon: {
                        active: <></>,
                        inactive: <></>
                    },
                }
            },
            current: ""
        }}/>
    </>
}