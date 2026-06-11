"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Appointment } from "@/types/appointment.types";
import { AppointmentForm } from "./AppointmentForm";

export function AppointmentDialog({
    open,
    setOpen,
    appointment,
}: {
    open: boolean;
    setOpen: (v: boolean) => void;
    appointment?: Appointment | null;
}) {
    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>
                        {appointment
                            ? "Edit Appointment"
                            : "Create Appointment"}
                    </DialogTitle>
                </DialogHeader>

                <AppointmentForm
                    appointment={appointment}
                    mode={
                        appointment
                            ? "edit"
                            : "create"
                    }
                    onClose={() =>
                        setOpen(false)
                    }
                />
            </DialogContent>
        </Dialog>
    );
}