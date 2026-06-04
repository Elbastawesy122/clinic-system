"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface Props {
    open: boolean;
    setOpen: (
        value: boolean
    ) => void;
}

export function DoctorDialog({
    open,
    setOpen,
}: Props) {
    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Add Doctor
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <Label>
                            Name
                        </Label>
                        <Input />
                    </div>
                    <div>
                        <Label>
                            Email
                        </Label>
                        <Input />
                    </div>
                    <div>
                        <Label>
                            Phone
                        </Label>
                        <Input />
                    </div>
                    <div>
                        <Label>
                            Specialization
                        </Label>
                        <Input />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}