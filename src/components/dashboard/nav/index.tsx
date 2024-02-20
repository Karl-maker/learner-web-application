"use client";

import { Navigation } from "@/types/navigation";
import { useRouter } from "next/navigation";

export type NavigationBarOptions = {
  options: Navigation;
};

const NavigationBar: React.FC<NavigationBarOptions> = (
  input: NavigationBarOptions
) => {
  const route = useRouter();

  return (
    <div className="flex">
      <nav className="bg-primary w-[300px] h-screen p-5 drop-shadow-lg">
        <p className="text-white text-2xl py-3 border-solid flex justify-center pb-8 ">
          Navigation Bar
        </p>
        <h1 className="text-white py-2">{input.options.profile.name || ""}</h1>
        {Object.entries(input.options.items).map(([key, value]) => {
          const typeVal = value.t; // value.t is a number from 1 to 3 you can use to give different styles to conditionally. login is 3, account is 2 and all the rest are 1
          return (
            <div
              key={key}
              onClick={() => {
                if (value.action) value.action();
                if (value.path) route.push(value.path);
              }}
              className={`py-1  cursor-pointer flex justify-center border-solid border-white hover:bg-secondary hover:rounded hover:py-1 ${
                input.options.current === key
                  ? "bg-secondary rounded py-1 drop-shadow-md"
                  : "bg-primary border-solid border-white border rounded m-2  "
              }`}
            >
              <span className="text-white font-bold py-2">{value.name}</span>
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default NavigationBar;
