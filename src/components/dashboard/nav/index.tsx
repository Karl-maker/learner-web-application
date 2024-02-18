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
                    return <div style={{ backgroundColor: 'blue'}} key={key} onClick={() => {
                        route.push(value.path);
                    }}>
                        {value.name}
                    </div>
                })}
            </nav>
        </div>
    );
}

export default NavigationBar;