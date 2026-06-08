"use client";

import { useState } from "react";
import { useDoctors } from "@/hooks/doctors/useDoctors";
import { DataTable } from "@/components/shared/DataTable";
import { doctorColumns } from "@/components/Dashboard/Doctors/doctor-columns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DoctorDialog } from "@/components/Dashboard/Doctors/DoctorDialog";

export default function DoctorsPage() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);

    const { data, isLoading } = useDoctors(page, search);
    console.log(data);

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
                columns={doctorColumns}
                data={data?.doctors || []}
            />

            <DoctorDialog open={open} setOpen={setOpen} />
        </div>
    );
}