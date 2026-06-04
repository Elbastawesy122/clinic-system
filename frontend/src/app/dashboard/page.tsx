import {
    CalendarDays,
    Users,
    Stethoscope,
    Building2,
} from "lucide-react";

import { DashboardCard } from "@/components/Dashboard/DashboardCard";

import { DashboardCharts } from "@/components/Dashboard/DashboardCharts";

import { RecentAppointments } from "@/components/Dashboard/Appointment/RecentAppointments";

export default function DashboardPage() {
    return (
        <div>
            <div className="mb-10">
                <h1 className="text-4xl font-black">
                    Welcome Back 👋
                </h1>
                <p className="text-muted-foreground mt-2">
                    Here’s what’s happening today.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <DashboardCard
                    title="Appointments"
                    value="120"
                    icon={CalendarDays}
                />
                <DashboardCard
                    title="Users"
                    value="340"
                    icon={Users}
                />
                <DashboardCard
                    title="Doctors"
                    value="18"
                    icon={Stethoscope}
                />
                <DashboardCard
                    title="Clinics"
                    value="6"
                    icon={Building2}
                />
            </div>
            <div
                className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
                <div className="xl:col-span-2">
                    <DashboardCharts />
                </div>
                <RecentAppointments />
            </div>
        </div>
    );
}