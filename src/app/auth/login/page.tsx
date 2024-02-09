"use client"

import LoginCard from "@/components/authentication/login-card"
import useLogin from "@/hooks/authentication/login"
import { useEffect, useState } from "react"

export default () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const loginAccount = useLogin();
    const submit = () => {
        loginAccount.login(email, password);
    }

    useEffect(() => {
        (async () => {
            if(loginAccount.isLoggedIn) alert(`Login Success`)
        })()
    }, [loginAccount.isLoggedIn]);

    return <LoginCard 
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        isLoading={loginAccount.isLoading}
        onSubmit={submit}
    />
}