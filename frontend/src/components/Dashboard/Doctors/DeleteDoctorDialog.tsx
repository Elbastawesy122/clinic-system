"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useDeleteDoctor } from "@/hooks/doctors/useDeleteDoctor";

export function DeleteDoctorDialog({
    open,
    setOpen,
    doctorId,
}: {
    open: boolean;
    setOpen: (v: boolean) => void;
    doctorId: string;
}) {
    const { mutate, isPending } = useDeleteDoctor();

    const handleDelete = () => {
        mutate(doctorId, {
            onSuccess: () => setOpen(false),
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Doctor?</DialogTitle>
                </DialogHeader>

                <p className="text-sm text-gray-500">
                    This action cannot be undone.
                </p>

                <div className="flex justify-end gap-2 pt-4">
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isPending}
                    >
                        {isPending ? "Deleting..." : "Delete"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}