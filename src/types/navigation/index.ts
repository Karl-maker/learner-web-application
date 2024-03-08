export type Navigation = {
    profile: {
        name: string;
        picture: string;
    };
    precentage: number;
    display: boolean;
    items: Record<string, NavigationItem>;
    current: string;
    loading: boolean;
};

export type NavigationContext = {
    navigation: Navigation;
    setNavigation: (dashboard: Navigation) => void;
};

export type NavigationItem = {
    t: number;
    name: string;
    alt: string;
    path?: string;
    action?: Function;
    disable: boolean;
    auth: boolean;
    highlight: boolean;
    icon: {
        active: JSX.Element;
        inactive: JSX.Element;
    };
};
