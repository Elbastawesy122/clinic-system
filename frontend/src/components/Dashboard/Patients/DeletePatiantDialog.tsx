"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { useDeletePatient } from "@/hooks/patients/useDeletePatient";

export function DeletePatientDialog({
    open,
    setOpen,
    patientId,
}: {
    open: boolean;
    setOpen: (v: boolean) => void;
    patientId: string;
}) {
    const { mutate, isPending } =
        useDeletePatient();

    const handleDelete = () => {
        mutate(patientId, {
            onSuccess: () =>
                setOpen(false),
        });
    };

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Delete Patient?
                    </DialogTitle>
                </DialogHeader>

                <p className="text-sm text-gray-500">
                    This action cannot be
                    undone. The patient and
                    all related data may be
                    permanently removed.
                </p>

                <div className="flex justify-end gap-2 pt-4">
                    <Button
                        variant="outline"
                        onClick={() =>
                            setOpen(false)
                        }
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="destructive"
                        onClick={
                            handleDelete
                        }
                        disabled={
                            isPending
                        }
                    >
                        {isPending
                            ? "Deleting..."
                            : "Delete"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}