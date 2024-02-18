import { Navigation } from "@/types/navigation";

export type NavigationBarOptions = {
    options: Navigation;
}

const NavigationBar: React.FC<NavigationBarOptions> = (input: NavigationBarOptions) => {

    return (
        <div>
            <nav>
                {/* JSX content */}
            </nav>
        </div>
    );
}

export default NavigationBar;