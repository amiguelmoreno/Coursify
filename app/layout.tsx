import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import ToastProvider from "@/components/providers/toastProvider";

import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { ConfettiProvider } from "@/components/providers/confettiProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coursify",
  description: "Online Courses Plattform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={inter.className}>
          <ConfettiProvider></ConfettiProvider>
          <ToastProvider></ToastProvider>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
