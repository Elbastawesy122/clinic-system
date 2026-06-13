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
            <DialogContent className="rounded-2xl max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                        {clinic.name}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-5 text-sm">
                    {/* DESCRIPTION */}
                    <div className="bg-gray-50 p-3 rounded-xl">
                        <p className="text-gray-600 leading-relaxed">
                            {clinic.description || "No description available"}
                        </p>
                    </div>

                    {/* INFO GRID */}
                    <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-center justify-between bg-white border rounded-xl p-3">
                            <span className="text-muted-foreground">📍 Location</span>
                            <span className="font-medium">{clinic.location}</span>
                        </div>

                        <div className="flex items-center justify-between bg-white border rounded-xl p-3">
                            <span className="text-muted-foreground">📞 Phone</span>
                            <span className="font-medium">{clinic.phone}</span>
                        </div>

                        <div className="flex items-center justify-between bg-white border rounded-xl p-3">
                            <span className="text-muted-foreground">⏰ Working Hours</span>
                            <span className="font-medium">
                                {clinic.startTime} - {clinic.endTime}
                            </span>
                        </div>
                    </div>

                    {/* WORKING DAYS */}
                    <div className="space-y-2">
                        <p className="text-muted-foreground">📅 Working Days</p>

                        <div className="flex flex-wrap gap-2">
                            {clinic.workingDays.map((day) => (
                                <span
                                    key={day}
                                    className="px-3 py-1 rounded-full text-xs font-medium bg-[#409D9B]/10 text-[#409D9B]"
                                >
                                    {day}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}