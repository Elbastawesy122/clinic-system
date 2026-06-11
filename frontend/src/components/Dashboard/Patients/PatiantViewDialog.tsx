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
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        Patient Details
                    </DialogTitle>
                </DialogHeader>

                {isLoading || !patient ? (
                    <p className="text-sm text-muted-foreground">
                        Loading...
                    </p>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Name
                            </p>
                            <p className="font-medium">
                                {patient.name}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Email
                            </p>
                            <p className="font-medium">
                                {patient.email}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Role
                            </p>
                            <Badge variant="secondary">
                                {patient.role}
                            </Badge>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Verification Status
                            </p>
                            <Badge
                                variant={
                                    patient.isVerified
                                        ? "default"
                                        : "destructive"
                                }
                            >
                                {patient.isVerified
                                    ? "Verified"
                                    : "Not Verified"}
                            </Badge>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Account Status
                            </p>
                            <Badge
                                variant={
                                    patient.isBlocked
                                        ? "destructive"
                                        : "default"
                                }
                            >
                                {patient.isBlocked
                                    ? "Blocked"
                                    : "Active"}
                            </Badge>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Created At
                            </p>
                            <p className="font-medium">
                                {new Date(
                                    patient.createdAt
                                ).toLocaleString()}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Updated At
                            </p>
                            <p className="font-medium">
                                {new Date(
                                    patient.updatedAt
                                ).toLocaleString()}
                            </p>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}