import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Clinic } from "@/types/clinic.types";

export function ClinicViewDialog({
    open,
    setOpen,
    clinic,
}: {
    open: boolean;
    setOpen: (v: boolean) => void;
    clinic?: Clinic;
}) {
    if (!clinic) return null;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{clinic.name}</DialogTitle>
                </DialogHeader>

                <div className="space-y-2 text-sm">
                    <p>{clinic.description}</p>
                    <p>📍 {clinic.location}</p>
                    <p>📞 {clinic.phone}</p>
                    <p>⏰ {clinic.startTime} - {clinic.endTime}</p>
                    <p>📅 {clinic.workingDays.join(", ")}</p>
                </div>
            </DialogContent>
        </Dialog>
    );
}