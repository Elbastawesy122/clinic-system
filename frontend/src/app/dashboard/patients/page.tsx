"use client";

import { useState } from "react";

import { DataTable } from "@/components/shared/DataTable";
import { Input } from "@/components/ui/input";

import { useAuthStore } from "@/store/auth-store";

import { PatientViewDialog } from "@/components/Dashboard/Patients/PatiantViewDialog";
import { DeletePatientDialog } from "@/components/Dashboard/Patients/DeletePatiantDialog";

import {
    patientColumns,
    PatientRow,
} from "@/components/Dashboard/Patients/PatiantColumns";

import { useBlockPatient } from "@/hooks/patients/useBlockPatient";
import { useUnblockPatient } from "@/hooks/patients/useUnblockPatient";
import { usePatientsByRole } from "@/hooks/patients/usePatientsByRole";

export default function PatientsPage() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const [viewOpen, setViewOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const role = useAuthStore((s) => s.user?.role);

    const { data, isLoading } = usePatientsByRole(page, search);

    const { mutate: blockPatient } = useBlockPatient();
    const { mutate: unblockPatient } = useUnblockPatient();

    const patients: PatientRow[] = (data?.patients as PatientRow[]) || [];

    return (
        <div className="p-6 space-y-6">

            {/* HEADER */}
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">Patients</h1>
                <p className="text-sm text-muted-foreground">
                    Manage all registered patients in the system
                </p>
            </div>

            {/* SEARCH */}
            <div className="flex items-center gap-3">
                <Input
                    className="rounded-xl"
                    placeholder="Search patients..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                />
            </div>

            {/* TABLE WRAPPER */}
            <div className="bg-white rounded-2xl border shadow-sm">
                <DataTable
                    columns={patientColumns({
                        role: role as "admin" | "doctor",

                        onBlock: blockPatient,
                        onUnblock: unblockPatient,

                        onDelete: (id) => {
                            setDeleteId(id);
                            setOpenDelete(true);
                        },

                        onView: (id) => {
                            setSelectedPatientId(id);
                            setViewOpen(true);
                        },
                    })}
                    data={patients}
                    page={page}
                    totalPages={data?.totalPages || 1}
                    onPageChange={setPage}
                />

                {/* LOADING OVERLAY */}
                {isLoading && (
                    <div className="p-6 text-center text-sm text-muted-foreground">
                        Loading patients...
                    </div>
                )}
            </div>

            {/* MODALS */}
            <PatientViewDialog
                open={viewOpen}
                setOpen={setViewOpen}
                patientId={selectedPatientId}
            />

            {deleteId && (
                <DeletePatientDialog
                    open={openDelete}
                    setOpen={setOpenDelete}
                    patientId={deleteId}
                />
            )}
        </div>
    );
}