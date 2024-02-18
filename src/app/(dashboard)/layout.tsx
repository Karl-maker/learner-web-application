"use server"

import Header from "@/components/layout/header/context";
import Navigation from "@/components/layout/nav/context";
 
export default async function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  
    return (
        <>
            {/* navigation / bav bar code here which uses dashboard.navigation for the value */}
            <Navigation/>
            <Header/>
            <main>
                {children}
            </main>
        </>
    );
}
  