"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Appointment } from "@/types/appointment.types";

import { Button } from "@/components/ui/button";

import { Pencil, Trash2 } from "lucide-react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { AppointmentStatus } from "@/types/appointment.types";

interface AppointmentColumnsProps {
    role: "admin" | "doctor" | "patient";

    cancelAppointment: (id: string) => void;

    updateStatus: (payload: {
        id: string;
        status: AppointmentStatus;
    }) => void;

    onEdit: (appointment: Appointment) => void;

    onDelete: (id: string) => void;
}

export const appointmentColumns = ({
    role,
    cancelAppointment,
    updateStatus,
    onEdit,
    onDelete,
}: AppointmentColumnsProps): ColumnDef<Appointment>[] => {
    const columns: ColumnDef<Appointment>[] = [];

    // ================= PATIENT VIEW =================
    if (role === "patient") {
        columns.push({
            accessorKey: "doctor",
            header: "Doctor",
            cell: ({ row }) => row.original.doctor.user.name,
        });
    }

    // ================= DOCTOR VIEW =================
    if (role === "doctor") {
        columns.push({
            accessorKey: "patient",
            header: "Patient",
            cell: ({ row }) => row.original.patient.name,
        });
    }

    // ================= ADMIN VIEW =================
    if (role === "admin") {
        columns.push(
            {
                accessorKey: "patient",
                header: "Patient",
                cell: ({ row }) => row.original.patient.name,
            },
            {
                accessorKey: "doctor",
                header: "Doctor",
                cell: ({ row }) => row.original.doctor.user.name,
            }
        );
    }

    // ================= COMMON =================
    columns.push(
        {
            accessorKey: "clinic",
            header: "Clinic",
            cell: ({ row }) => row.original.clinic.name,
        },
        {
            accessorKey: "appointmentDate",
            header: "Date",
            cell: ({ row }) =>
                new Date(row.original.appointmentDate).toLocaleDateString(),
        },
        {
            accessorKey: "timeSlot",
            header: "Time",
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.original.status;

                const styles: Record<string, string> = {
                    pending: "bg-yellow-100 text-yellow-700",
                    confirmed: "bg-blue-100 text-blue-700",
                    completed: "bg-green-100 text-green-700",
                    cancelled: "bg-red-100 text-red-700",
                };

                return (
                    <span className={`text-xs px-2 py-1 rounded ${styles[status]}`}>
                        {status}
                    </span>
                );
            },
        }
    );

    // ================= ACTIONS =================
    columns.push({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const appointment = row.original;

            return (
                <div className="flex items-center gap-2">

                    {/* ================= PATIENT ================= */}
                    {role === "patient" && appointment.status === "pending" && (
                        <Button
                            variant="destructive"
                            onClick={() => cancelAppointment(appointment._id)}
                        >
                            Cancel
                        </Button>
                    )}

                    {/* ================= DOCTOR / ADMIN STATUS ================= */}
                    {(role === "doctor" || role === "admin") && (
                        <Select
                            value={appointment.status}
                            onValueChange={(value) =>
                                updateStatus({
                                    id: appointment._id,
                                    status: value as AppointmentStatus,
                                })
                            }
                        >
                            <SelectTrigger className="w-35">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                    )}

                    {/* ================= ADMIN ONLY ================= */}
                    {role === "admin" && (
                        <>
                            <Button
                                size="icon"
                                variant="outline"
                                onClick={() => onEdit(appointment)}
                            >
                                <Pencil className="h-4 w-4" />
                            </Button>

                            <Button
                                size="icon"
                                variant="destructive"
                                onClick={() => onDelete(appointment._id)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </>
                    )}

                </div>
            );
        },
    });

    return columns;
};