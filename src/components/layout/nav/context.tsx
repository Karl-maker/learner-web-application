"use client"

import NavigationBar from "./bar";

export default function Navigation () {
    return <NavigationBar options={{
        profile: {
            name: "",
            picture: ""
        },
        precentage: 0,
        display: false,
        items: {
            
        },
        current: ""
    }}/>
}