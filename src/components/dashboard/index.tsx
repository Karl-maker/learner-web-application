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
                
            },
            current: ""
        }}/>
    </>
}