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

    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const [selectedAppointment, setSelectedAppointment] =
        useState<Appointment | null>(null);

    const [deleteId, setDeleteId] = useState<string | null>(null);

    const role = useAuthStore((s) => s.user?.role);

    const { mutate: cancelAppointment } = useCancelAppointment();
    const { mutate: updateStatus } = useUpdateAppointmentStatus();

    const { data, isLoading } = useAppointmentsByRole(page, search);

    const appointments = Array.isArray(data)
        ? data
        : data?.appointments || [];

    return (
        <div className="p-6 space-y-6">

            {/* HEADER */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Appointments</h1>
                    <p className="text-sm text-muted-foreground">
                        Manage and track all appointments
                    </p>
                </div>

                {role === "patient" && (
                    <Button
                        onClick={() => setOpenCreate(true)}
                        className="rounded-xl bg-[#409D9B] hover:bg-[#358a88]"
                    >
                        + Add Appointment
                    </Button>
                )}
            </div>

            {/* SEARCH */}
            <div className="flex items-center gap-3">
                <Input
                    className="rounded-xl"
                    placeholder="Search appointments..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                />
            </div>

            {/* TABLE WRAPPER */}
            <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

                <DataTable
                    columns={appointmentColumns({
                        role: role as "admin" | "doctor" | "patient",

                        cancelAppointment: (id) => cancelAppointment(id),

                        updateStatus: ({ id, status }) =>
                            updateStatus({ id, status }),

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

                {/* LOADING */}
                {isLoading && (
                    <div className="p-6 text-center text-sm text-muted-foreground">
                        Loading appointments...
                    </div>
                )}
            </div>

            {/* MODALS */}
            <AppointmentDialog
                open={openCreate}
                setOpen={setOpenCreate}
            />

            <EditAppointmentDialog
                open={openEdit}
                setOpen={setOpenEdit}
                appointment={selectedAppointment}
            />

            {deleteId && (
                <DeleteAppointmentDialog
                    open={openDelete}
                    setOpen={setOpenDelete}
                    appointmentId={deleteId}
                />
            )}
        </div>
    );
}