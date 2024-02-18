import React from "react";

// Define the type for the profile avatar options
export type LoginCardType = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  onSubmit: () => void;
};

/**
 * LoginCard Component
 * @desc Renders login area
 * @todo complete implementation
 * @hint use Card component in from ../general/card.tsx
 * @param option LoginCardType
 */
const LoginCard: React.FC<LoginCardType> = ({
  email,
  setEmail,
  password,
  setPassword,
  isLoading,
  onSubmit,
}) => {
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="flex justify-center h-screen items-center">
      <div className="">
        <form
          className="flex flex-col gap-2 border-solid border bg-primary p-8 text-white sm:max-auto w-[800px] h-[600px] justify-center rounded-xl"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-center py-4">
            <h1 className="text-4xl justify-center">Login </h1>
          </div>
          <div className=" grid grid-row-2 justify-center">
            <h2 className="text-[21px] font-bold py-4">Username/Email</h2>
            <input
              className="border-solid rounded p-2 text-black items-center w-[400px]"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email"
            />
          </div>
          <div className=" grid grid-row-2 justify-center">
            <h2 className="text-[21px] font-bold py-4"> Password </h2>
            <input
              className="border-solid rounded p-2 text-black items-center w-[400px]"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
            />
          </div>
          <div className="flex justify-center py-4 border-b-4">
            <button
              className=" bg-secondary text-[21px] w-[150px] rounded p-2 font-bold hover:border-white hover:bg-primary hover:duration-200 "
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </div>
          <h2 className="flex justify-center text-[18px] "> or log in using</h2>
          <div className="flex py-2 flex-col-2 justify-center gap-4">
            <button className=" bg-secondary text-[21px] w-[150px] rounded p-2 font-bold  hover:border-white hover:bg-primary hover:duration-200">
              Google
            </button>
            <button className=" bg-secondary text-[21px] w-[150px] rounded p-2 font-bold  hover:border-white hover:bg-primary hover:duration-200">
              Facebook
            </button>
          </div>
          <div className="flex flex-col- justify-center gap-2">
            <h2 className=" flex justify-center text-[18px]">Not a Member?</h2>
            <h2 className=" flex justify-center text-[18px] underline underline-offset-4 decoration-solid decoration-white hover:decoration-secondary hover:text-secondary cursor-pointer">
              Sign Up Now !
            </h2>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginCard;
