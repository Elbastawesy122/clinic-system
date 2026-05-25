"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Appointment } from "@/types/appointment.types";

export const columns:
    ColumnDef<Appointment>[] = [
        {
            accessorKey: "patient",
            header: "Patient",
        },
        {
            accessorKey: "doctor",
            header: "Doctor",
        },
        {
            accessorKey: "clinic",
            header: "Clinic",
        },
        {
            accessorKey: "date",
            header: "Date",
        },
        {
            accessorKey: "time",
            header: "Time",
        },
        {
            accessorKey: "status",
            header: "Status",

            cell: ({ row }) => {
                const status =
                    row.getValue("status") as string;
                return (
                    <Badge>
                        {status}
                    </Badge>
                );
            },
        },
    ];