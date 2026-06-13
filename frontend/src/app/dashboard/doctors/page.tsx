"use client";

import { useState } from "react";

import { useDoctors } from "@/hooks/doctors/useDoctors";
import { DataTable } from "@/components/shared/DataTable";

import { doctorColumns } from "@/components/Dashboard/Doctors/doctor-columns";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { DoctorDialog } from "@/components/Dashboard/Doctors/DoctorDialog";
import { EditDoctorDialog } from "@/components/Dashboard/Doctors/EditDoctorDialog";
import { DeleteDoctorDialog } from "@/components/Dashboard/Doctors/DeleteDoctorDialog";

import { Doctor } from "@/types/doctor.types";

export default function DoctorsPage() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const { data, isLoading } = useDoctors(page, search);

    return (
        <div className="p-6 space-y-6">

            {/* HEADER */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Doctors</h1>
                    <p className="text-sm text-muted-foreground">
                        Manage doctors and their schedules
                    </p>
                </div>

                <Button
                    onClick={() => setOpenCreate(true)}
                    className="rounded-xl bg-[#409D9B] hover:bg-[#358a88]"
                >
                    + Add Doctor
                </Button>
            </div>

            {/* SEARCH */}
            <div className="flex items-center gap-3">
                <Input
                    className="rounded-xl"
                    placeholder="Search doctors..."
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
                    columns={doctorColumns({
                        onEdit: (doctor) => {
                            setSelectedDoctor(doctor);
                            setOpenEdit(true);
                        },
                        onDelete: (id) => {
                            setDeleteId(id);
                            setOpenDelete(true);
                        },
                    })}
                    data={data?.doctors || []}
                    page={page}
                    totalPages={data?.totalPages || 1}
                    onPageChange={setPage}
                />

                {/* LOADING STATE */}
                {isLoading && (
                    <div className="p-6 text-center text-sm text-muted-foreground">
                        Loading doctors...
                    </div>
                )}
            </div>

            {/* MODALS */}
            <DoctorDialog open={openCreate} setOpen={setOpenCreate} />

            <EditDoctorDialog
                open={openEdit}
                setOpen={setOpenEdit}
                doctor={selectedDoctor}
            />

            {deleteId && (
                <DeleteDoctorDialog
                    open={openDelete}
                    setOpen={setOpenDelete}
                    doctorId={deleteId}
                />
            )}
        </div>
    );
}