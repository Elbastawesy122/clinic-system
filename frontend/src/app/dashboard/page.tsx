"use client";

import {
    CalendarDays,
    Users,
    Stethoscope,
    Building2,
} from "lucide-react";

import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { DashboardCharts } from "@/components/Dashboard/DashboardCharts";

import { useDashboardStats } from "@/hooks/useDashboardStats";
import { RecentAppointments } from "@/components/Dashboard/Appointment/RecentAppointments";

export default function DashboardPage() {
    const { data, isLoading } = useDashboardStats();

    return (
        <div>
            <div className="mb-10">
                <h1 className="text-4xl font-black">Welcome Back 👋</h1>
                <p className="text-muted-foreground mt-2">
                    Here’s what’s happening today.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <DashboardCard
                    title="Appointments"
                    value={data?.appointments}
                    icon={CalendarDays}
                    isLoading={isLoading}
                />

                <DashboardCard
                    title="Users"
                    value={data?.patients}
                    icon={Users}
                    isLoading={isLoading}
                />

                <DashboardCard
                    title="Doctors"
                    value={data?.doctors}
                    icon={Stethoscope}
                    isLoading={isLoading}
                />

                <DashboardCard
                    title="Clinics"
                    value={data?.clinics}
                    icon={Building2}
                    isLoading={isLoading}
                />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
                <div className="xl:col-span-2">
                    <DashboardCharts />
                </div>

                <RecentAppointments />
            </div>
        </div>
    );
}