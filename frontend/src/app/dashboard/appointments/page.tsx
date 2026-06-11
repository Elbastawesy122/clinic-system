"use client";

import { useState } from "react";

import { Appointment } from "@/types/appointment.types";

import { DataTable } from "@/components/shared/DataTable";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { appointmentColumns } from "@/components/Dashboard/Appointment/AppointmentColumns";

import { AppointmentDialog } from "@/components/Dashboard/Appointment/AppointmentDialog";
import { EditAppointmentDialog } from "@/components/Dashboard/Appointment/EditAppointmentDialog";
import { DeleteAppointmentDialog } from "@/components/Dashboard/Appointment/DeleteAppointmentDialog";
import { useAuthStore } from "@/store/auth-store";
import { useAppointmentsByRole } from "@/hooks/appointments/useAppointmentsByRole";
import { useCancelAppointment } from "@/hooks/appointments/useCancelAppointment";
import { useUpdateAppointmentStatus } from "@/hooks/appointments/useUpdateAppointmentStatus";

export default function AppointmentsPage() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const [selectedAppointment, setSelectedAppointment] =
        useState<Appointment | null>(null);

    const [deleteId, setDeleteId] =
        useState<string | null>(null);

    const { mutate: cancelAppointment } = useCancelAppointment();
    const { mutate: updateStatus } = useUpdateAppointmentStatus();

    const { data } = useAppointmentsByRole(page, search);
    const role = useAuthStore((s) => s.user?.role);

    const appointments = Array.isArray(data)
        ? data
        : data?.appointments || [];

    return (
        <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">
                    Appointments
                </h1>

                {role === "patient" && (
                    <Button onClick={() => setOpen(true)}>
                        + Add Appointment
                    </Button>
                )}
            </div>

            <Input
                placeholder="Search appointments..."
                value={search}
                onChange={(e) =>
                    setSearch(
                        e.target.value
                    )
                }
            />

            <DataTable
                columns={appointmentColumns({
                    role: role as "admin" | "doctor" | "patient",
                    cancelAppointment: (id) => {
                        cancelAppointment(id);
                    },
                    updateStatus: ({ id, status }) => {
                        updateStatus({ id, status });
                    },
                    onEdit: (appointment) => {
                        setSelectedAppointment(appointment);
                        setOpenEdit(true);
                    },
                    onDelete: (id) => {
                        setDeleteId(id);
                        setOpenDelete(true);
                    },
                })}
                data={appointments}
                page={page}
                totalPages={data?.totalPages || 1}
                onPageChange={setPage}
            />

            <EditAppointmentDialog
                open={openEdit}
                setOpen={
                    setOpenEdit
                }
                appointment={
                    selectedAppointment
                }
            />

            {deleteId && (
                <DeleteAppointmentDialog
                    open={
                        openDelete
                    }
                    setOpen={
                        setOpenDelete
                    }
                    appointmentId={
                        deleteId
                    }
                />
            )}

            <AppointmentDialog
                open={open}
                setOpen={setOpen}
            />
        </div>
    );
}