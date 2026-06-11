"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Clinic,
} from "@/types/clinic.types";
import { clinicFormSchema, ClinicFormValues, workingDays } from "@/schemas/clinic.schema";

import { useCreateClinic } from "@/hooks/clinics/use-create-clinic";
import { useUpdateClinic } from "@/hooks/clinics/use-update-clinic";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ClinicForm({
    onClose,
    mode = "create",
    clinic,
}: {
    onClose: () => void;
    mode?: "create" | "edit";
    clinic?: Clinic;
}) {
    const create = useCreateClinic();
    const update = useUpdateClinic();

    const form = useForm<ClinicFormValues>({
        resolver: zodResolver(clinicFormSchema),
        defaultValues: {
            name: clinic?.name || "",
            description: clinic?.description || "",
            location: clinic?.location || "",
            phone: clinic?.phone || "",
            workingDays: clinic?.workingDays || [],
            startTime: clinic?.startTime || "",
            endTime: clinic?.endTime || "",
        },
    });

    const onSubmit = (data: ClinicFormValues) => {
        if (mode === "edit" && clinic) {
            update.mutate(
                { id: clinic._id, data },
                { onSuccess: onClose }
            );
        } else {
            create.mutate(data as ClinicFormValues, {
                onSuccess: onClose,
            });
        }
    };

    const isPending = create.isPending || update.isPending;

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            <Input placeholder="Clinic Name" {...form.register("name")} />
            <Input placeholder="Description" {...form.register("description")} />
            <Input placeholder="Location" {...form.register("location")} />
            <Input placeholder="Phone" {...form.register("phone")} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">
                        Start Time
                    </label>
                    <Input
                        type="time"
                        {...form.register("startTime")}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">
                        End Time
                    </label>
                    <Input
                        type="time"
                        {...form.register("endTime")}
                    />
                </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
                {workingDays.map((day) => (
                    <label key={day} className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            value={day}
                            {...form.register("workingDays")}
                        />
                        {day}
                    </label>
                ))}
            </div>

            <Button className="w-full" disabled={isPending}>
                {mode === "edit"
                    ? isPending
                        ? "Updating..."
                        : "Update Clinic"
                    : isPending
                        ? "Creating..."
                        : "Create Clinic"}
            </Button>
        </form>
    );
}