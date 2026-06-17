"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useDeleteClinic } from "@/hooks/clinics/use-delete-clinic";

export function DeleteClinicDialog({
    open,
    setOpen,
    clinicId,
}: {
    open: boolean;
    setOpen: (v: boolean) => void;
    clinicId: string;
}) {
    const { mutate, isPending } = useDeleteClinic();

    const handleDelete = () => {
        mutate(clinicId, {
            onSuccess: () => setOpen(false),
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-lg max-w-2xl rounded-2xl">
                <DialogHeader>
                    <DialogTitle>Delete Clinic?</DialogTitle>
                </DialogHeader>

                <p className="text-sm text-gray-500">
                    This action cannot be undone.
                </p>

                <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={() => setOpen(false)}>
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