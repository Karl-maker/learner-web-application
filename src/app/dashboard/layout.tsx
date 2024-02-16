"use client"
import HeaderBar from "@/components/layout/header-bar";
import NavigationBar from "@/components/layout/navigation-bar";
import { defaultNavigation, defaultNavigationLayoutContext } from "@/constants/navigation";
import { Navigation, NavigationContext } from "@/types/navigation";
import { createContext, useState, useMemo, useContext } from "react";
import { UserAuthContext } from "../template";
  
export const NavigationLayoutContext = createContext<NavigationContext>(defaultNavigationLayoutContext)
  
export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const [navigation, setNavigation] = useState<Navigation>(defaultNavigation);
    const { user } = useContext(UserAuthContext);
    const navigationValue = useMemo(
        () => ({ navigation, setNavigation }), 
        [navigation]
    );
  
    return (
        <NavigationLayoutContext.Provider value={navigationValue}>
            <div>
                {useMemo(() => (
                        <>
                            {/* navigation / bav bar code here which uses dashboard.navigation for the value */}
                            <NavigationBar options={navigation}>
                            <HeaderBar name={`${user.details?.first_name || ""} ${user.details?.last_name || ""}`} isLoggedIn={user.authenticated} />
                                <main>
                                    {children}
                                </main>
                            </NavigationBar>
                        </>
                ), [navigation, user])}
            </div>
        </NavigationLayoutContext.Provider>
    );
}
  