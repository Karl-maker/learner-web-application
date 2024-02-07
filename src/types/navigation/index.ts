export type Navigation = {
    profile: {
        name: string;
        picture: string;
    };
    precentage: number;
    display: boolean;
    items: Record<string, NavigationItem>;
    current: string;
};

export type NavigationContext = {
    navigation: Navigation;
    setNavigation: (dashboard: Navigation) => void;
};

export type NavigationItem = {
    name: string;
    alt: string;
    path: string;
    disable: boolean;
    icon: {
        active: React.ReactNode;
        inactive: React.ReactNode;
    };
};