"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { useBlockPatient } from "@/hooks/patients/useBlockPatient";
import { useUnblockPatient } from "@/hooks/patients/useUnblockPatient";

interface PatientStatusDialogProps {
    open: boolean;
    setOpen: (v: boolean) => void;
    patientId: string;
    action: "block" | "unblock";
}

export function PatientStatusDialog({
    open,
    setOpen,
    patientId,
    action,
}: PatientStatusDialogProps) {
    const blockMutation = useBlockPatient();
    const unblockMutation = useUnblockPatient();

    const isBlock = action === "block";

    const mutation = isBlock
        ? blockMutation
        : unblockMutation;

    const handleSubmit = () => {
        mutation.mutate(patientId, {
            onSuccess: () =>
                setOpen(false),
        });
    };

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogContent className="sm:max-w-lg max-w-2xl rounded-2xl">
                <DialogHeader>
                    <DialogTitle>
                        {isBlock
                            ? "Block Patient?"
                            : "Unblock Patient?"}
                    </DialogTitle>
                </DialogHeader>

                <p className="text-sm text-muted-foreground">
                    {isBlock
                        ? "The patient will no longer be able to access their account until they are unblocked."
                        : "The patient will be able to access their account again."}
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
                        variant={
                            isBlock
                                ? "destructive"
                                : "default"
                        }
                        onClick={
                            handleSubmit
                        }
                        disabled={
                            mutation.isPending
                        }
                    >
                        {mutation.isPending
                            ? isBlock
                                ? "Blocking..."
                                : "Unblocking..."
                            : isBlock
                                ? "Block"
                                : "Unblock"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}