"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { ClinicForm } from "./ClinicForm";

export function ClinicDialog({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Create Clinic</DialogTitle>
                </DialogHeader>

                <ClinicForm onClose={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}