"use client"

import LoginCard from "@/components/authentication/login-card"
import useLogin from "@/hooks/authentication/login"
import { GetCurrentStudentResponse } from "@/types/student"
import { api } from "@/utils/fetch"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const router = useRouter();
    const loginAccount = useLogin();
    const submit = () => {
        loginAccount.login(email, password);
    }

    useEffect(() => {
        (async () => {
            if(!loginAccount.isLoggedIn) return;
            const result = await api<GetCurrentStudentResponse>("/api/v1/student", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }, true);

            if(!result.data?.data) router.push("/onboard");
            router.push("/home");
        })()
    }, [loginAccount.isLoggedIn]);

    useEffect(() => {
        (async () => {
            if(loginAccount.error) alert(loginAccount.error);
        })()
    }, [loginAccount.error]);

    return <LoginCard 
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        isLoading={loginAccount.isLoading}
        onSubmit={submit}
    />
}