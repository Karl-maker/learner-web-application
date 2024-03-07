import React from "react";

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
};

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
  onSubmit,
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

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col justify-center items-center bg-primary">
        <div className="text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Welcome to ....</h2>
          <p className="text-lg">Sign up now & start learning today</p>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center bg-gray-200">
        <form className="w-3/4">
          <h2 className="text-2xl font-bold mb-4 flex justify-center">
            Create Your Account
          </h2>
          <div className="mb-4">
            <h1 className="text-xl font-bold py-1"> First Name </h1>
            <input
              className="w-full p-2 rounded border border-secondary focus:outline-none focus:border-primary focus:border-2"
              type="text"
              value={firstName}
              onChange={handleFirstNameChange}
              placeholder="First name"
            />
          </div>

          <h1 className="text-xl font-bold py-1"> Last Name </h1>
          <input
            className=" mb-4 w-full p-2 rounded border border-secondary focus:outline-none focus:border-primary focus:border-2"
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
            placeholder="Last name"
          />
          <div className="mb-4">
            <h1 className="text-xl font-bold py-1"> Email </h1>
            <input
              className="w-full p-2 rounded border border-secondary focus:outline-none focus:border-primary focus:border-2"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email"
            />
          </div>
          <div className="mb-4">
            <h1 className="text-xl font-bold py-1"> Password </h1>
            <input
              className="w-full p-2 rounded border border-secondary focus:outline-none focus:border-primary focus:border-2"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
            />
          </div>
          <div className="flex justify-center">
            <button
              className="w-80 bg-primary text-white py-2 px-4 rounded hover:bg-secondary"
              type="submit"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? "Loading..." : "Sign up"}
            </button>
          </div>
          <div>
            <div>
              <h2 className="text-[18px] m-4 pt-4 border-t-4 border-primary flex justify-center">
                Sign Up Using
              </h2>
            </div>
            <div className="space-x-2 flex justify-center">
              <button className="w-32 bg-primary text-white py-2 px-4 rounded hover:bg-secondary">
                Google
              </button>
              <button className="w-32 bg-primary text-white py-2 px-4 rounded hover:bg-secondary">
                Facebook
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpCard;
