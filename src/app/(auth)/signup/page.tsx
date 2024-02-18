"use client"

import SignUpCard from "@/components/authentication/signup-card";
import useSignUp from "@/hooks/authentication/signup"
import { useRouter } from "next/router";
import { useEffect, useState } from "react"

export default () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const router = useRouter();

    const signupAccount = useSignUp();
    const submit = () => {
        signupAccount.signup(firstName, lastName, email, password, 'student');
    }

    useEffect(() => {
        (async () => {
            if(signupAccount.result) router.push('/login');
        })()
    }, [signupAccount.result]);

    useEffect(() => {
        (async () => {
            if(signupAccount.error) alert(signupAccount.error);
        })()
    }, [signupAccount.error]);

    return <SignUpCard
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        isLoading={signupAccount.isLoading}
        onSubmit={submit}
    />
}