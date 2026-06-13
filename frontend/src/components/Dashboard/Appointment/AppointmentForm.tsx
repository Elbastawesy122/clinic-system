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
                appointment?.appointmentDate?.split("T")[0] || "",

            timeSlot: appointment?.timeSlot || "",
            notes: appointment?.notes || "",
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

    const isPending = create.isPending || update.isPending;

    const onSubmit = (data: AppointmentFormValues) => {
        if (mode === "edit" && appointment) {
            update.mutate(
                { id: appointment._id, data },
                { onSuccess: onClose }
            );
        } else {
            create.mutate(data, { onSuccess: onClose });
        }
    };

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
        >

            {/* Clinic */}
            <div className="space-y-2 w-full">
                <label className="text-sm font-medium text-muted-foreground">
                    Clinic
                </label>

                <Select
                    value={clinic}
                    onValueChange={(value) =>
                        form.setValue("clinic", value)
                    }
                >
                    <SelectTrigger className="h-11 rounded-xl">
                        <SelectValue placeholder="Select clinic" />
                    </SelectTrigger>

                    <SelectContent className="cursor-pointer">
                        {clinics?.clinics?.map((clinic: Clinic) => (
                            <SelectItem
                                key={clinic._id}
                                value={clinic._id}
                                className="cursor-pointer"
                            >
                                {clinic.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Doctor */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                    Doctor
                </label>

                <Select
                    value={doctor}
                    onValueChange={(value) =>
                        form.setValue("doctor", value)
                    }
                >
                    <SelectTrigger className="h-11 rounded-xl">
                        <SelectValue placeholder="Select doctor" />
                    </SelectTrigger>

                    <SelectContent>
                        {doctors?.doctors?.map((doctor: Doctor) => (
                            <SelectItem
                                key={doctor._id}
                                value={doctor._id}
                            >
                                {doctor.user.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Date + Time Grid */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                        Date
                    </label>

                    <Input
                        type="date"
                        {...form.register("appointmentDate")}
                        className="h-11 rounded-xl"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                        Time
                    </label>

                    <Input
                        type="time"
                        {...form.register("timeSlot")}
                        className="h-11 rounded-xl"
                    />
                </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                    Notes
                </label>

                <Input
                    placeholder="Add any notes..."
                    {...form.register("notes")}
                    className="h-11 rounded-xl"
                />
            </div>

            {/* Submit */}
            <Button
                type="submit"
                disabled={isPending}
                className="w-full h-11 rounded-xl bg-[#409D9B] hover:bg-[#358a88] transition"
            >
                {isPending
                    ? mode === "edit"
                        ? "Updating..."
                        : "Creating..."
                    : mode === "edit"
                        ? "Update Appointment"
                        : "Create Appointment"}
            </Button>
        </form>
    );
}