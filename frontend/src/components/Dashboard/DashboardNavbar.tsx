"use client";

import { Bell } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserDropdown } from "@/components/User/User";
import { useAuthStore } from "@/store/auth-store";

export function DashboardNavbar() {
    const user = useAuthStore((s) => s.user);

    const Title =
        user?.role === "admin" || user?.role === "doctor"
            ? "Clinic Dashboard"
            : "My Appointments";

    return (
        <header className="h-20 border-b bg-white flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
                {user?.role === "admin" || user?.role === "doctor" ? (
                    <SidebarTrigger />
                ) : null}
                <h2 className="font-bold text-xl">
                    {Title}
                </h2>
            </div>
            <div className="flex items-center gap-4">
                <button aria-label="Close menu" className="relative size-11 rounded-full bg-[#f5fbfb] flex items-center justify-center cursor-pointer">
                    <Bell className="size-5" />
                    <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full" />
                </button>
                <UserDropdown />
            </div>
        </header>
    );
}