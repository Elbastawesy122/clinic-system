"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    LayoutDashboard,
    CalendarDays,
    Users,
    Building2,
    Stethoscope,
} from "lucide-react";

import { useAuthStore } from "@/store/auth-store";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

import { cn } from "@/lib/utils";

export const DashboardSidebar = () => {
    const user = useAuthStore((s) => s.user);
    const pathname = usePathname();

    const adminItems = [
        { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
        { title: "Appointments", url: "/dashboard/appointments", icon: CalendarDays },
        { title: "Patients", url: "/dashboard/patients", icon: Users },
        { title: "Clinics", url: "/dashboard/clinics", icon: Building2 },
        { title: "Doctors", url: "/dashboard/doctors", icon: Stethoscope },
    ];

    const doctorItems = [
        { title: "Appointments", url: "/dashboard/appointments", icon: CalendarDays },
        { title: "Patients", url: "/dashboard/patients", icon: Users },
    ];

    const items =
        user?.role === "admin"
            ? adminItems
            : user?.role === "doctor"
                ? doctorItems
                : [];

    if (user?.role === "patient") return null;

    return (
        <Sidebar className="border-r bg-white dark:bg-neutral-950">
            {/* HEADER */}
            <SidebarHeader className="p-6 space-y-2">
                <div className="text-xl font-black tracking-tight text-[#409D9B]">
                    Clinic System
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                        Dashboard Panel
                    </span>

                    <span className="text-[10px] px-2 py-1 rounded-full bg-[#409D9B]/10 text-[#409D9B] font-medium capitalize">
                        {user?.role}
                    </span>
                </div>
            </SidebarHeader>

            {/* CONTENT */}
            <SidebarContent className="px-2">
                <SidebarGroup>
                    <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Navigation
                    </div>

                    <SidebarMenu>
                        {items.map((item) => {
                            const isActive = pathname === item.url;

                            return (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link
                                            href={item.url}
                                            className={cn(
                                                "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-all duration-200",
                                                "hover:bg-[#409D9B]/10 hover:text-[#409D9B]",
                                                isActive &&
                                                "bg-[#409D9B]/15 text-[#409D9B] font-medium shadow-sm"
                                            )}
                                        >
                                            <item.icon
                                                className={cn(
                                                    "h-4 w-4 transition",
                                                    isActive && "text-[#409D9B]"
                                                )}
                                            />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            {/* FOOTER */}
            <SidebarFooter className="p-4">
                <div className="rounded-xl border p-3 text-xs text-muted-foreground bg-muted/40">
                    <div className="font-medium text-foreground">
                        Clinic System v1.0
                    </div>
                    <div>© 2026 All rights reserved</div>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
};