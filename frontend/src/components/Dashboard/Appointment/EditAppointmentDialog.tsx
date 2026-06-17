"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Appointment } from "@/types/appointment.types";
import { AppointmentForm } from "./AppointmentForm";

export function EditAppointmentDialog({
    open,
    setOpen,
    appointment,
}: {
    open: boolean;
    setOpen: (v: boolean) => void;
    appointment: Appointment | null;
}) {
    if (!appointment) return null;

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogContent className="sm:max-w-lg max-w-2xl rounded-2xl">
                <DialogHeader>
                    <DialogTitle>
                        Edit Appointment
                    </DialogTitle>
                </DialogHeader>

                <AppointmentForm
                    mode="edit"
                    appointment={appointment}
                    onClose={() =>
                        setOpen(false)
                    }
                />
            </DialogContent>
        </Dialog>
    );
}