import { Navigation, NavigationContext } from "@/types/navigation"

export const defaultNavigation: Navigation = {
    precentage: 0,
    display: true,
    items: {},
    current: "",
    profile: {
        name: "",
        picture: ""
    }
}

export const defaultNavigationLayoutContext: NavigationContext = {
    navigation: defaultNavigation,
    setNavigation: (navigation: Navigation) => {}
}
