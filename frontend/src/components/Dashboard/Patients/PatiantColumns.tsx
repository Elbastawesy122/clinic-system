"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Ban, Trash2, ShieldCheck, Eye } from "lucide-react";

import { DoctorPatient, Patient } from "@/types/patient.types";

export type PatientRow = Patient | DoctorPatient;

interface PatientColumnsProps {
    role: "admin" | "doctor";
    onBlock: (id: string) => void;
    onUnblock: (id: string) => void;
    onDelete: (id: string) => void;
    onView: (id: string) => void;
}

export const patientColumns = ({
    role,
    onBlock,
    onUnblock,
    onDelete,
    onView,
}: PatientColumnsProps): ColumnDef<PatientRow>[] => {

    const columns: ColumnDef<PatientRow>[] = [];

    // ================= NAME =================
    columns.push({
        id: "name",
        header: "Name",
        cell: ({ row }) => {
            const data = row.original;

            return role === "admin"
                ? (data as Patient).name
                : (data as DoctorPatient).patient.name;
        },
    });

    // ================= EMAIL =================
    columns.push({
        id: "email",
        header: "Email",
        cell: ({ row }) => {
            const data = row.original;

            return role === "admin"
                ? (data as Patient).email
                : (data as DoctorPatient).patient.email;
        },
    });

    // ================= ADMIN ONLY =================
    if (role === "admin") {
        columns.push(
            {
                id: "verified",
                header: "Verified",
                cell: ({ row }) => {
                    const patient = row.original as Patient;

                    return (
                        <span className={`text-xs px-2 py-1 rounded ${patient.isVerified
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}>
                            {patient.isVerified ? "Verified" : "Not Verified"}
                        </span>
                    );
                },
            },
            {
                id: "status",
                header: "Status",
                cell: ({ row }) => {
                    const patient = row.original as Patient;

                    return (
                        <span className={`text-xs px-2 py-1 rounded ${patient.isBlocked
                                ? "bg-red-100 text-red-700"
                                : "bg-green-100 text-green-700"
                            }`}>
                            {patient.isBlocked ? "Blocked" : "Active"}
                        </span>
                    );
                },
            }
        );
    }

    // ================= ACTIONS =================
    columns.push({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const data = row.original;

            const id =
                role === "admin"
                    ? (data as Patient)._id
                    : (data as DoctorPatient).patient._id;

            const isBlocked =
                role === "admin"
                    ? (data as Patient).isBlocked
                    : false;

            return (
                <div className="flex items-center gap-2">

                    {/* VIEW */}
                    <Button
                        size="icon"
                        variant="outline"
                        onClick={() => onView(id)}
                    >
                        <Eye className="h-4 w-4" />
                    </Button>

                    {/* ADMIN ACTIONS */}
                    {role === "admin" && (
                        <>
                            <Button
                                size="icon"
                                variant="outline"
                                onClick={() =>
                                    isBlocked ? onUnblock(id) : onBlock(id)
                                }
                            >
                                {isBlocked ? (
                                    <ShieldCheck className="h-4 w-4" />
                                ) : (
                                    <Ban className="h-4 w-4" />
                                )}
                            </Button>

                            <Button
                                size="icon"
                                variant="destructive"
                                onClick={() => onDelete(id)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </>
                    )}

                    {/* DOCTOR */}
                    {role === "doctor" && (
                        <Button
                            size="icon"
                            variant="outline"
                            onClick={() => onBlock(id)}
                        >
                            <Ban className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            );
        },
    });

    return columns;
};