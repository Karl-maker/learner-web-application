"use client"
import NavigationBar from "@/components/layout/navigation-bar";
import { defaultNavigation, defaultNavigationLayoutContext } from "@/constants/navigation";
import { Navigation, NavigationContext } from "@/types/navigation";
import { createContext, useState, useMemo } from "react";
  
export const NavigationLayoutContext = createContext<NavigationContext>(defaultNavigationLayoutContext)
  
export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const [navigation, setNavigation] = useState<Navigation>(defaultNavigation);
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
                                <main>{children}</main>
                            </NavigationBar>
                        </>
                ), [navigation])}
            </div>
        </NavigationLayoutContext.Provider>
    );
}
  