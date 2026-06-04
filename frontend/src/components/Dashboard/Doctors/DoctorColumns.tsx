"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Doctor } from "@/types/doctor.types";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    MoreHorizontal,
    Eye,
    Pencil,
    Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
    onView: (doctor: Doctor) => void;
    onEdit: (doctor: Doctor) => void;
    onDelete: (doctor: Doctor) => void;
}

export const getDoctorColumns = ({
    onView,
    onEdit,
    onDelete,
}: Props): ColumnDef<Doctor>[] => [
        {
            accessorKey: "name",
            header: "Doctor",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "phone",
            header: "Phone",
        },
        {
            accessorKey: "specialization",
            header: "Specialization",
        },
        {
            accessorKey: "experience",
            header: "Experience",
            cell: ({ row }) => (
                <span>
                    {row.original.experience} Years
                </span>
            ),
        },
        {
            accessorKey: "fees",
            header: "Fees",
            cell: ({ row }) => (
                <span>
                    ${row.original.fees}
                </span>
            ),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => (
                <Badge
                    variant="outline"
                    className={
                        row.original.status ===
                            "Active"
                            ? "border-green-500 text-green-600"
                            : "border-red-500 text-red-600"
                    }
                >
                    {row.original.status}
                </Badge>
            ),
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const doctor =
                    row.original;

                return (
                    <DropdownMenu>

                        <DropdownMenuTrigger
                            asChild
                        >
                            <Button
                                variant="ghost"
                                size="icon"
                            >
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                        >
                            <DropdownMenuItem
                                onClick={() => onView(doctor)}>
                                <Eye className="mr-2 size-4" />
                                View
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => onEdit(doctor)}
                            >
                                <Pencil className="mr-2 size-4" />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => onDelete(doctor)}
                                className="text-red-500">
                                <Trash className="mr-2 size-4" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];