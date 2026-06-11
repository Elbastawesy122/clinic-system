"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Doctor } from "@/types/doctor.types";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface DoctorColumnsProps {
    onEdit: (doctor: Doctor) => void;
    onDelete: (id: string) => void;
}

export const doctorColumns = ({
    onEdit,
    onDelete,
}: DoctorColumnsProps): ColumnDef<Doctor>[] => [
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
                    {row.original.isAvailable
                        ? "Available"
                        : "Unavailable"}
                </span>
            ),
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const doctor = row.original;

                return (
                    <div className="flex gap-2">
                        <Button
                            size="icon"
                            variant="outline"
                            onClick={() => onEdit(doctor)}
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>

                        <Button
                            size="icon"
                            variant="destructive"
                            onClick={() => onDelete(doctor._id)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                );
            },
        },
    ];