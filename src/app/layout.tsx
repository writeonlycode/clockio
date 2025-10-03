import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.JS Todo List with Supabase",
  description:
    "This project is a robust, production-ready Todo List application built with **Next.js**, **Supabase**, and **Chadcn UI components**. It serves as a template for modern web development, incorporating best practices for app architecture, state management, and data handling.",
};

type Props = Readonly<{ children: React.ReactNode; navbar: React.ReactNode }>;

export default function LayoutRoot({ children, navbar }: Props) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} dark flex min-h-screen flex-col antialiased overflow-x-hidden`}
      >
        {navbar}
        {children}
      </body>
    </html>
  );
}
