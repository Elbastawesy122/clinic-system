"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { usePatient } from "@/hooks/patients/usePatient";

interface PatientViewDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    patientId: string | null;
}

export function PatientViewDialog({
    open,
    setOpen,
    patientId,
}: PatientViewDialogProps) {
    const { data: patient, isLoading } = usePatient(patientId || "");

    if (!open) return null;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-lg max-w-2xl rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                        Patient Profile
                    </DialogTitle>
                </DialogHeader>

                {isLoading || !patient ? (
                    <p className="text-sm text-muted-foreground py-6">
                        Loading patient data...
                    </p>
                ) : (
                    <div className="space-y-5 text-sm">

                        {/* NAME + EMAIL CARD */}
                        <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                            <div>
                                <p className="text-xs text-muted-foreground">Name</p>
                                <p className="font-semibold text-base">
                                    {patient.name}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground">Email</p>
                                <p className="font-medium text-gray-700">
                                    {patient.email}
                                </p>
                            </div>
                        </div>

                        {/* ROLE */}
                        <div className="flex items-center justify-between bg-white border rounded-xl p-3">
                            <span className="text-muted-foreground">Role</span>
                            <Badge variant="secondary" className="bg-white">{patient.role}</Badge>
                        </div>

                        {/* STATUS GRID */}
                        <div className="grid grid-cols-2 gap-3">

                            <div className="border rounded-xl p-3 space-y-1">
                                <p className="text-xs text-muted-foreground">
                                    Verification
                                </p>
                                <Badge
                                    variant={
                                        patient.isVerified ? "default" : "destructive"
                                    }
                                    className="bg-white text-black"
                                >
                                    {patient.isVerified ? "Verified" : "Not Verified"}
                                </Badge>
                            </div>

                            <div className="border rounded-xl p-3 space-y-1">
                                <p className="text-xs text-muted-foreground">
                                    Account
                                </p>
                                <Badge
                                    variant={
                                        patient.isBlocked ? "destructive" : "default"
                                    }
                                    className="bg-white text-black"
                                >
                                    {patient.isBlocked ? "Blocked" : "Active"}
                                </Badge>
                            </div>
                        </div>

                        {/* DATES */}
                        <div className="space-y-3">

                            <div className="flex justify-between items-center bg-white border rounded-xl p-3">
                                <span className="text-muted-foreground text-xs">
                                    Created
                                </span>
                                <span className="font-medium text-xs">
                                    {new Date(patient.createdAt).toLocaleString()}
                                </span>
                            </div>

                            <div className="flex justify-between items-center bg-white border rounded-xl p-3">
                                <span className="text-muted-foreground text-xs">
                                    Updated
                                </span>
                                <span className="font-medium text-xs">
                                    {new Date(patient.updatedAt).toLocaleString()}
                                </span>
                            </div>

                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}