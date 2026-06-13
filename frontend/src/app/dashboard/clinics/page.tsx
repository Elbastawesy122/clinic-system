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

    const { data, isLoading } = useClinics(search);

    const clinics = data?.clinics || [];

    return (
        <div className="p-6 space-y-6">

            {/* HEADER */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Clinics</h1>
                    <p className="text-sm text-muted-foreground">
                        Manage all clinics in your system
                    </p>
                </div>

                <Button
                    onClick={() => setOpen(true)}
                    className="rounded-xl bg-[#409D9B] hover:bg-[#358a88]"
                >
                    + Add Clinic
                </Button>
            </div>

            {/* SEARCH */}
            <div className="flex items-center gap-3">
                <Input
                    className="rounded-xl"
                    placeholder="Search clinics..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                />
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

                {isLoading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-32 rounded-2xl bg-gray-100 animate-pulse"
                        />
                    ))
                ) : clinics.length > 0 ? (
                    clinics.map((clinic) => (
                        <ClinicCard key={clinic._id} clinic={clinic} />
                    ))
                ) : (
                    <div className="col-span-full text-center text-sm text-muted-foreground py-10">
                        No clinics found
                    </div>
                )}

            </div>

            {/* DIALOG */}
            <ClinicDialog open={open} setOpen={setOpen} />
        </div>
    );
}