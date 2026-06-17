"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Doctor } from "@/types/doctor.types";
import { DoctorForm } from "./DoctorForm";

export function EditDoctorDialog({
    open,
    setOpen,
    doctor,
}: {
    open: boolean;
    setOpen: (v: boolean) => void;
    doctor: Doctor | null;
}) {
    if (!doctor) return null;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-lg max-w-2xl rounded-2xl">
                <DialogHeader>
                    <DialogTitle>Edit Doctor</DialogTitle>
                </DialogHeader>

                <DoctorForm
                    mode="edit"
                    doctor={doctor}
                    onClose={() => setOpen(false)}
                />
            </DialogContent>
        </Dialog>
    );
}