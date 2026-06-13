"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserDropdown } from "@/components/User/User";
import { useAuthStore } from "@/store/auth-store";

export function DashboardNavbar() {
    const user = useAuthStore((s) => s.user);

    const isStaff =
        user?.role === "admin" || user?.role === "doctor";

    const title = isStaff ? "Clinic Dashboard" : "My Appointments";

    return (
        <header className="h-20 border-b bg-white flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
                {isStaff && (
                    <SidebarTrigger className="cursor-pointer" />
                )}

                <div className="flex flex-col leading-tight">
                    <h2 className="font-bold text-xl">{title}</h2>
                    <span className="text-xs text-muted-foreground capitalize">
                        {user?.role}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <UserDropdown />
            </div>
        </header>
    );
}