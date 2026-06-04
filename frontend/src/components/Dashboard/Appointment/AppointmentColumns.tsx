"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Appointment } from "@/types/appointment.types";
import { format } from "date-fns";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";

export const columns: ColumnDef<Appointment>[] = [
    // =====================
    // PATIENT
    // =====================
    {
        accessorKey: "patient",
        header: "Patient",

        cell: ({ row }) => {
            const patient = row.original.patient;

            return (
                <div className="flex flex-col">
                    <span className="font-medium">
                        {patient.name}
                    </span>

                    <span className="text-xs text-muted-foreground">
                        {patient.email}
                    </span>
                </div>
            );
        },
    },

    // =====================
    // DOCTOR
    // =====================
    {
        accessorKey: "doctor",
        header: "Doctor",
    },

    // =====================
    // CLINIC
    // =====================
    {
        accessorKey: "clinic",
        header: "Clinic",
    },

    // =====================
    // DATE (formatted)
    // =====================
    {
        accessorKey: "date",
        header: "Date",

        cell: ({ row }) => {
            return format(
                new Date(row.original.date),
                "dd/MM/yyyy"
            );
        },
    },

    // =====================
    // TIME
    // =====================
    {
        accessorKey: "time",
        header: "Time",
    },

    // =====================
    // STATUS (BADGE)
    // =====================
    {
        accessorKey: "status",
        header: "Status",

        cell: ({ row }) => {
            const status = row.getValue("status") as string;

            return (
                <Badge
                    variant={
                        status === "Confirmed"
                            ? "default"
                            : status === "Pending"
                                ? "secondary"
                                : "destructive"
                    }
                >
                    {status}
                </Badge>
            );
        },
    },

    {
        id: "actions",

        cell: ({ row }) => {

            const appointment = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>

                        <Button
                            size="sm"
                            variant="ghost"
                        >
                            Open
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            Update
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="text-red-500"
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];