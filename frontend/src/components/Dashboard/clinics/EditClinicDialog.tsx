"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Clinic } from "@/types/clinic.types";
import { ClinicForm } from "./ClinicForm";

export function EditClinicDialog({
    open,
    setOpen,
    clinic,
}: {
    open: boolean;
    setOpen: (v: boolean) => void;
    clinic: Clinic | null;
}) {
    if (!clinic) return null;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Edit Clinic</DialogTitle>
                </DialogHeader>

                <ClinicForm
                    mode="edit"
                    clinic={clinic}
                    onClose={() => setOpen(false)}
                />
            </DialogContent>
        </Dialog>
    );
}