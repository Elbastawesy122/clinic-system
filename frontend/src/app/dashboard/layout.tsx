"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/Dashboard/DashboardSidebar";
import { DashboardNavbar } from "@/components/Dashboard/DashboardNavbar";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { refreshTokenApi } from "@/api/auth.api";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    const accessToken = useAuthStore((state) => state.accessToken);
    const setAccessToken = useAuthStore((state) => state.setAccessToken);

    const didRun = useRef(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                if (accessToken) return;

                const res = await refreshTokenApi();

                setAccessToken(res.data.accessToken);
            } catch {
                router.replace("/user/login");
            }
        };

        if (!didRun.current) {
            didRun.current = true;
            checkAuth();
        }
    }, [accessToken, router, setAccessToken]);

    return (
        <SidebarProvider>
            <DashboardSidebar />
            <main className="w-full min-h-screen bg-[#f5fbfb]">
                <DashboardNavbar />
                <div className="p-6">{children}</div>
            </main>
        </SidebarProvider>
    );
}