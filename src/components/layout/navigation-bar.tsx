import { Navigation } from "@/types/navigation";

export type NavigationBarOptions = {
    options: Navigation;
    children: React.ReactNode;
}

const NavigationBar: React.FC<NavigationBarOptions> = (input: NavigationBarOptions) => {

    return (
        <div>
            <nav>
                {/* JSX content */}
            </nav>
            {input.children}
        </div>
    );
}

export default NavigationBar;