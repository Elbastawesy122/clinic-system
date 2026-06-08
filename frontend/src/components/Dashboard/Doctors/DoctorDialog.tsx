"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { DoctorForm } from "./DoctorForm";
import { Doctor } from "@/types/doctor.types";

export function DoctorDialog({
    open,
    setOpen,
    doctor,
}: {
    open: boolean;
    setOpen: (v: boolean) => void;
    doctor?: Doctor | null;
}) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>
                        {doctor ? "Edit Doctor" : "Create Doctor"}
                    </DialogTitle>
                </DialogHeader>

                <DoctorForm
                    doctor={doctor}
                    onClose={() => setOpen(false)}
                />
            </DialogContent>
        </Dialog>
    );
}