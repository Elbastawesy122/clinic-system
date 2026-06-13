import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { QueryProvider } from "@/providers/query-provider";
import AuthProvider from "@/providers/auth-provider";

const geistSans = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "ClinicCare | Smart Appointment Booking System",
  description:
    "A modern healthcare platform for seamless appointment booking, clinic management, and patient-doctor interaction.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
          <Toaster richColors position="top-center" />
        </QueryProvider>
      </body>
    </html>
  );
}
