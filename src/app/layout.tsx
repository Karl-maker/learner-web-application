import React from 'react';
import { Inter } from "next/font/google";
import Head from 'next/head';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CXC & CSEC Student Learning App",
  description: "Empower yourself for success in CXC and CSEC exams with our comprehensive learning application. Access study materials, practice tests, and more!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content="CXC, CSEC, learning app, study materials, practice tests, exam preparation" />
        <meta name="author" content="Your Name or Company Name" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://yourwebsite.com" />
      </Head>
      <body>
        {children}
      </body>
    </html>
  );
}
