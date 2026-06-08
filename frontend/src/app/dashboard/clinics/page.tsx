"use client";

import { useState } from "react";
import { useClinics } from "@/hooks/clinics/use-clinics";
import { ClinicCard } from "@/components/Dashboard/clinics/ClinicCard";
import { ClinicDialog } from "@/components/Dashboard/clinics/ClinicDialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ClinicsPage() {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);

    const { data } = useClinics(search);

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Clinics Dashboard</h1>

                <Button onClick={() => setOpen(true)}>
                    + Add Clinic
                </Button>
            </div>
            <Input
                placeholder="Search clinics..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data?.clinics?.map((clinic) => (
                    <ClinicCard key={clinic._id} clinic={clinic} />
                ))}
            </div>
            <ClinicDialog open={open} setOpen={setOpen} />
        </div>
    );
}