"use client"

import SignUpCard from "@/components/authentication/signup-card";
import useSignUp from "@/hooks/authentication/signup"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

const SignUpPage = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();

    const signupAccount = useSignUp();
    const submit = () => {
        signupAccount.signup(firstName, lastName, email, password, 'student');
    }

    useEffect(() => {
        setIsClient(true);
    }, []);

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

    if (!isClient) return <p>Loading</p>;
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

SignUpPage.displayName = 'SignUpPage';

export default SignUpPage;
