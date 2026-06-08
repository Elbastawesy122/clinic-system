import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Doctor } from "@/types/doctor.types";

export function DoctorViewDialog({
    open,
    setOpen,
    doctor,
}: {
    open: boolean;
    setOpen: (v: boolean) => void;
    doctor?: Doctor;
}) {
    if (!doctor) return null;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{doctor.user.name}</DialogTitle>
                </DialogHeader>

                <div className="space-y-2 text-sm">
                    <p>📧 {doctor.user.email}</p>
                    <p>📞 {doctor.user.phone}</p>
                    <p>🏥 {doctor.clinic.name}</p>
                    <p>💉 {doctor.specialization}</p>
                    <p>💰 {doctor.fees}</p>
                    <p>📅 {doctor.workingDays.join(", ")}</p>
                </div>
            </DialogContent>
        </Dialog>
    );
}