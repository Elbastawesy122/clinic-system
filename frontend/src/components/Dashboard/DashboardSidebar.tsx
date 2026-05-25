"use client";

import Link from "next/link";

import {
    LayoutDashboard,
    CalendarDays,
    Users,
    Settings,
} from "lucide-react";

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

const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Appointments",
        url: "/dashboard/appointments",
        icon: CalendarDays,
    },
    {
        title: "Users",
        url: "/dashboard/users",
        icon: Users,
    },
    {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
    },
];

export const DashboardSidebar = () => {
    return (
        <Sidebar>
            <SidebarHeader
                className="text-2xl font-black p-6 text-[#409D9B]">
                Clinic Dashboard
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <Link href={item.url}>
                                        <item.icon />
                                        <span>
                                            {item.title}
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="p-4 text-xs text-muted-foreground">
                © 2026 Clinic System
            </SidebarFooter>
        </Sidebar>
    );
};