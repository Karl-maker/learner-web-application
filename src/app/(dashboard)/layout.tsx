"use server"

import Dashboard from "@/components/dashboard";
 
export default async function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  
    return (
        <>
            {/* dashboard deals with context of header and nav bar */}
            <Dashboard/>
            <main>
                {children}
            </main>
        </>
    );
}
  