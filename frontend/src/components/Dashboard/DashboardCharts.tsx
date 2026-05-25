"use client";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    Tooltip,
} from "recharts";

const data = [
    {
        month: "Jan",
        appointments: 40,
    },
    {
        month: "Feb",
        appointments: 55,
    },
    {
        month: "Mar",
        appointments: 70,
    },
    {
        month: "Apr",
        appointments: 90,
    },
];

export function DashboardCharts() {
    return (
        <div className="bg-white rounded-3xl p-6 border">
            <h2 className="text-xl font-bold mb-6">
                Appointments Analytics
            </h2>
            <div className="h-75">
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <BarChart data={data}>
                        <XAxis dataKey="month" />
                        <Tooltip />
                        <Bar dataKey="appointments" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}