export const metadata = {
    title: "Student Details - CXC & CSEC Student Learning App",
    description: "Explore detailed information about students using our learning platform. Empower yourself for success in CXC and CSEC exams by accessing student profiles, progress tracking, and more!",
};  

export default function StudentByIdLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  
    return (
      <>{children}</>
    );
  }