"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Doctor } from "@/types/doctor.types";

import {
    doctorFormSchema,
    DoctorFormValues,
    workingDays,
} from "@/schemas/doctor.schema";

import { useCreateDoctor } from "@/hooks/doctors/useCreateDoctor";
import { useUpdateDoctor } from "@/hooks/doctors/useUpdateDoctor";

import { useClinics } from "@/hooks/clinics/use-clinics";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Clinic } from "@/types/clinic.types";

export function DoctorForm({
    onClose,
    mode = "create",
    doctor,
}: {
    onClose: () => void;
    mode?: "create" | "edit";
    doctor?: Doctor | null;
}) {
    const create = useCreateDoctor();
    const update = useUpdateDoctor();

    const { data: clinics } = useClinics("");

    const form = useForm<DoctorFormValues>({
        resolver: zodResolver(doctorFormSchema),

        defaultValues: {
            name: doctor?.user?.name || "",
            email: doctor?.user?.email || "",
            phone: doctor?.user?.phone || "",

            clinic:
                typeof doctor?.clinic === "string"
                    ? doctor.clinic
                    : doctor?.clinic?._id || "",

            specialization:
                doctor?.specialization || "",

            experience:
                doctor?.experience,

            fees:
                doctor?.fees,

            bio:
                doctor?.bio || "",

            workingDays:
                doctor?.workingDays || [],

            startTime:
                doctor?.startTime || "",

            endTime:
                doctor?.endTime || "",
        },
    });

    const clinic = useWatch({
        control: form.control,
        name: "clinic",
    });

    const onSubmit = (data: DoctorFormValues) => {
        if (mode === "edit" && doctor) {
            update.mutate(
                {
                    id: doctor._id,
                    data,
                },
                {
                    onSuccess: onClose,
                }
            );
        } else {
            create.mutate(data, {
                onSuccess: onClose,
            });
        }
    };

    const isPending =
        create.isPending ||
        update.isPending;

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
        >
            <Input
                placeholder="Doctor Name"
                {...form.register("name")}
            />

            <Input
                placeholder="Email"
                type="email"
                {...form.register("email")}
            />

            <Input
                placeholder="Phone"
                {...form.register("phone")}
            />

            <Select
                value={clinic}
                onValueChange={(value) =>
                    form.setValue("clinic", value)
                }
            >
                <SelectTrigger>
                    <SelectValue placeholder="Select Clinic" />
                </SelectTrigger>

                <SelectContent>
                    {clinics?.clinics?.map((clinic: Clinic) => (
                        <SelectItem
                            key={clinic._id}
                            value={clinic._id}
                        >
                            {clinic.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Input
                placeholder="Specialization"
                {...form.register("specialization")}
            />

            <div className="grid grid-cols-2 gap-4">
                <Input
                    type="number"
                    min={0}
                    placeholder="Experience"
                    onKeyDown={(e) => {
                        if (e.key === "-" || e.key === "e") {
                            e.preventDefault();
                        }
                    }}
                    {...form.register("experience", {
                        valueAsNumber: true,
                    })}
                />

                <Input
                    type="number"
                    min={0}
                    placeholder="Fees"
                    onKeyDown={(e) => {
                        if (e.key === "-" || e.key === "e") {
                            e.preventDefault();
                        }
                    }}
                    {...form.register("fees", {
                        valueAsNumber: true,
                    })}
                />
            </div>

            <Input
                placeholder="Bio"
                {...form.register("bio")}
            />

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

            <div>
                <label className="text-sm font-medium mb-2 block">
                    Working Days
                </label>

                <div className="grid grid-cols-4 gap-2">
                    {workingDays.map((day) => (
                        <label
                            key={day}
                            className="flex items-center gap-2 text-sm"
                        >
                            <input
                                type="checkbox"
                                value={day}
                                {...form.register(
                                    "workingDays"
                                )}
                            />
                            {day}
                        </label>
                    ))}
                </div>
            </div>

            <Button
                className="w-full"
                disabled={isPending}
            >
                {mode === "edit"
                    ? isPending
                        ? "Updating..."
                        : "Update Doctor"
                    : isPending
                        ? "Creating..."
                        : "Create Doctor"}
            </Button>
        </form>
    );
}