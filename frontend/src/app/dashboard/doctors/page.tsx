"use client";

import { useState } from "react";
import { useDoctors } from "@/hooks/doctors/useDoctors";
import { DataTable } from "@/components/shared/DataTable";
import { doctorColumns } from "@/components/Dashboard/Doctors/Doctor-columns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DoctorDialog } from "@/components/Dashboard/Doctors/DoctorDialog";
import { EditDoctorDialog } from "@/components/Dashboard/Doctors/EditDoctorDialog";
import { DeleteDoctorDialog } from "@/components/Dashboard/Doctors/DeleteDoctorDialog";
import { Doctor } from "@/types/doctor.types";

export default function DoctorsPage() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const { data } = useDoctors(page, search);


    return (
        <div className="p-6 space-y-4">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold">Doctors</h1>

                <Button onClick={() => setOpen(true)}>
                    + Add Doctor
                </Button>
            </div>

            <Input
                placeholder="Search doctors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
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
            <EditDoctorDialog
                open={openEdit}
                setOpen={setOpenEdit}
                doctor={selectedDoctor}
            />
            <DeleteDoctorDialog
                open={openDelete}
                setOpen={setOpenDelete}
                doctorId={deleteId!}
            />
            <DoctorDialog open={open} setOpen={setOpen} />
        </div>
    );
}