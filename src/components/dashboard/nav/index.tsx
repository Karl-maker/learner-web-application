"use client"

import { Navigation } from "@/types/navigation";
import { useRouter } from "next/navigation";

export type NavigationBarOptions = {
    options: Navigation;
}

const NavigationBar: React.FC<NavigationBarOptions> = (input: NavigationBarOptions) => {

    const route = useRouter();

    return (
        <div>
            <nav style={{ backgroundColor: 'green', padding: '5px'}}>
                {/* JSX content */}
                <p>Navigation Bar</p>
                <h1>{input.options.profile.name || ""}</h1>
                {Object.entries(input.options.items).map(([key, value]) => {

                    const typeVal = value.t; // value.t is a number from 1 to 3 you can use to give different styles to conditionally. login is 3, account is 2 and all the rest are 1

                    return <div style={{ backgroundColor: input.options.current === key ? 'blue' : 'red'}} key={key} onClick={() => {
                        if(value.action) value.action();
                        if(value.path) route.push(value.path);
                    }}>
                        {value.name}
                    </div>
                })}
            </nav>
        </div>
    );
}

export default NavigationBar;