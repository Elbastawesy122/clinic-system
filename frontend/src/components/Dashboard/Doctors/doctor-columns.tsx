"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Doctor } from "@/types/doctor.types";

export const doctorColumns: ColumnDef<Doctor>[] = [
    {
        accessorKey: "user.name",
        header: "Doctor",
        cell: ({ row }) => row.original.user.name,
    },
    {
        accessorKey: "clinic",
        header: "Clinic",
        cell: ({ row }) => row.original.clinic.name,
    },
    {
        accessorKey: "specialization",
        header: "Specialization",
    },
    {
        accessorKey: "experience",
        header: "Experience",
    },
    {
        accessorKey: "fees",
        header: "Fees",
    },
    {
        accessorKey: "isAvailable",
        header: "Status",
        cell: ({ row }) => (
            <span
                className={`text-xs px-2 py-1 rounded ${row.original.isAvailable
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                    }`}
            >
                {row.original.isAvailable ? "Available" : "Unavailable"}
            </span>
        ),
    },
];