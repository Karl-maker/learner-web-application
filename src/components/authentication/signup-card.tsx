import React from 'react';

// Define the type for the profile avatar options
export type SignUpCardType = {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    firstName: string;
    setFirstName: React.Dispatch<React.SetStateAction<string>>;
    lastName: string;
    setLastName: React.Dispatch<React.SetStateAction<string>>;
    isLoading: boolean;
    onSubmit: () => void;
}

/**
 * SignUpCard Component
 * @desc Renders signup area
 * @todo complete implementation 
 * @hint use Card component in from ../general/card.tsx
 * @param option SignUpCardType 
 */
const SignUpCard: React.FC<SignUpCardType> = ({ 
    email,
    setEmail,
    password, 
    setPassword,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    isLoading, 
    onSubmit 
}) => {
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={firstName}
                    onChange={handleFirstNameChange}
                    placeholder="First name"
                />
                <input
                    type="text"
                    value={lastName}
                    onChange={handleLastNameChange}
                    placeholder="Last name"
                />
                <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Password"
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Submit'}
                </button>
            </form>
        </div>
    );
}


export default SignUpCard;

