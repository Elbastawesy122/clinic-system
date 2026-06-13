"use client";

import { useAppointmentsAnalytics } from "@/hooks/useAppointmentsAnalytics";
import {
    ResponsiveContainer,
    XAxis,
    Tooltip,
    CartesianGrid,
    AreaChart,
    Area,
} from "recharts";

type ChartDataItem = {
    month: string;
    appointments: number;
};

export function DashboardCharts() {
    //   const data = [
    //     { month: "Jan", appointments: 40 },
    //     { month: "Feb", appointments: 55 },
    //     { month: "Mar", appointments: 30 },
    //     { month: "Apr", appointments: 45 },
    //   ];

    const { data } = useAppointmentsAnalytics();

    const chartData: ChartDataItem[] =
        data?.map((item) => ({
            month: item.month,
            appointments: item.appointments,
        })) || [];

    return (
        <div className="bg-white rounded-3xl p-6 border">
            <h2 className="text-xl font-bold mb-6">
                Appointments Analytics
            </h2>

            <div className="h-75">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            opacity={0.15}
                        />

                        <XAxis dataKey="month" />

                        <Tooltip />

                        <Area
                            type="monotone"
                            dataKey="appointments"
                            stroke="#409D9B"
                            fill="#409D9B"
                            fillOpacity={0.2}
                            strokeWidth={3}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}