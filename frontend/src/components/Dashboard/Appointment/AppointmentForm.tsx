"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Appointment } from "@/types/appointment.types";
import {
    appointmentSchema,
    AppointmentFormValues,
} from "@/schemas/appointment.schema";

import { useCreateAppointment } from "@/hooks/appointments/useCreateAppointment";
import { useUpdateAppointment } from "@/hooks/appointments/useUpdateAppointment";

import { useDoctors } from "@/hooks/doctors/useDoctors";
import { useClinics } from "@/hooks/clinics/use-clinics";

import { Doctor } from "@/types/doctor.types";
import { Clinic } from "@/types/clinic.types";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function AppointmentForm({
    onClose,
    mode = "create",
    appointment,
}: {
    onClose: () => void;
    mode?: "create" | "edit";
    appointment?: Appointment | null;
}) {
    const create = useCreateAppointment();
    const update = useUpdateAppointment();

    const { data: doctors } = useDoctors(1, "");
    const { data: clinics } = useClinics("");

    const form = useForm<AppointmentFormValues>({
        resolver: zodResolver(appointmentSchema),

        defaultValues: {
            doctor:
                typeof appointment?.doctor === "string"
                    ? appointment.doctor
                    : appointment?.doctor?._id || "",

            clinic:
                typeof appointment?.clinic === "string"
                    ? appointment.clinic
                    : appointment?.clinic?._id || "",

            appointmentDate:
                appointment?.appointmentDate
                    ?.split("T")[0] || "",

            timeSlot:
                appointment?.timeSlot || "",

            notes:
                appointment?.notes || "",
        },
    });

    const doctor = useWatch({
        control: form.control,
        name: "doctor",
    });

    const clinic = useWatch({
        control: form.control,
        name: "clinic",
    });

    const onSubmit = (
        data: AppointmentFormValues
    ) => {
        if (mode === "edit" && appointment) {
            update.mutate(
                {
                    id: appointment._id,
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

        console.log(data);
        
    };

    const isPending =
        create.isPending ||
        update.isPending;

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
        >
            <Select
                value={doctor}
                onValueChange={(value) =>
                    form.setValue("doctor", value)
                }
            >
                <SelectTrigger>
                    <SelectValue placeholder="Select Doctor" />
                </SelectTrigger>

                <SelectContent>
                    {doctors?.doctors?.map(
                        (doctor: Doctor) => (
                            <SelectItem
                                key={doctor._id}
                                value={doctor._id}
                            >
                                {doctor.user.name}
                            </SelectItem>
                        )
                    )}
                </SelectContent>
            </Select>

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
                    {clinics?.clinics?.map(
                        (clinic: Clinic) => (
                            <SelectItem
                                key={clinic._id}
                                value={clinic._id}
                            >
                                {clinic.name}
                            </SelectItem>
                        )
                    )}
                </SelectContent>
            </Select>

            <Input
                type="date"
                {...form.register(
                    "appointmentDate"
                )}
            />

            <Input
                type="time"
                {...form.register("timeSlot")}
            />

            <Input
                placeholder="Notes"
                {...form.register("notes")}
            />

            <Button
                className="w-full"
                disabled={isPending}
            >
                {mode === "edit"
                    ? isPending
                        ? "Updating..."
                        : "Update Appointment"
                    : isPending
                        ? "Creating..."
                        : "Create Appointment"}
            </Button>
        </form>
    );
}
