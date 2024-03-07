export const metadata = {
    title: "Subject Listing - CXC & CSEC Student Learning App",
    description: "Discover a comprehensive list of subjects provided by our learning platform. Empower yourself for success in CXC and CSEC exams with access to study materials, practice tests, and more!",
};

export default function SubjectLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  
    return (
      <>{children}</>
    );
  }