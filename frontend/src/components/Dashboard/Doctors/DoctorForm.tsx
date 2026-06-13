"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Doctor } from "@/types/doctor.types";

import {
  doctorFormSchema,
  DoctorFormValues,
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
import { WorkingDay, workingDays } from "@/schemas/clinic.schema";

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
      specialization: doctor?.specialization || "",
      experience: doctor?.experience,
      fees: doctor?.fees,
      bio: doctor?.bio || "",
      workingDays: doctor?.workingDays || [],
      startTime: doctor?.startTime || "",
      endTime: doctor?.endTime || "",
    },
  });

  const clinic = useWatch({
    control: form.control,
    name: "clinic",
  });

  const selectedDays = useWatch({
    control: form.control,
    name: "workingDays",
  });

  const toggleDay = (day: WorkingDay) => {
    const current = selectedDays || [];

    if (current.includes(day)) {
      form.setValue(
        "workingDays",
        current.filter((d) => d !== day)
      );
    } else {
      form.setValue("workingDays", [...current, day]);
    }
  };

  const onSubmit = (data: DoctorFormValues) => {
    if (mode === "edit" && doctor) {
      update.mutate(
        { id: doctor._id, data },
        { onSuccess: onClose }
      );
    } else {
      create.mutate(data, { onSuccess: onClose });
    }
  };

  const isPending = create.isPending || update.isPending;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

      {/* BASIC INFO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input className="rounded-xl" placeholder="Doctor Name" {...form.register("name")} />
        <Input className="rounded-xl" placeholder="Email" type="email" {...form.register("email")} />
        <Input className="rounded-xl md:col-span-2" placeholder="Phone" {...form.register("phone")} />
      </div>

      {/* CLINIC */}
      <Select value={clinic} onValueChange={(value) => form.setValue("clinic", value)}>
        <SelectTrigger className="rounded-xl cursor-pointer">
          <SelectValue placeholder="Select Clinic" />
        </SelectTrigger>

        <SelectContent>
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

      {/* MEDICAL INFO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input className="rounded-xl" placeholder="Specialization" {...form.register("specialization")} />

        <Input
          className="rounded-xl"
          type="number"
          min={0}
          placeholder="Experience"
          {...form.register("experience", { valueAsNumber: true })}
        />

        <Input
          className="rounded-xl md:col-span-2"
          type="number"
          min={0}
          placeholder="Fees"
          {...form.register("fees", { valueAsNumber: true })}
        />

        <Input className="rounded-xl md:col-span-2" placeholder="Bio" {...form.register("bio")} />
      </div>

      {/* TIME */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-sm font-medium">Start Time</label>
          <Input className="rounded-xl cursor-pointer" type="time" {...form.register("startTime")} />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">End Time</label>
          <Input className="rounded-xl cursor-pointer" type="time" {...form.register("endTime")} />
        </div>
      </div>

      {/* WORKING DAYS - CHIPS */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          Working Days
        </label>

        <div className="flex flex-wrap gap-2">
          {workingDays.map((day) => {
            const active = selectedDays?.includes(day);

            return (
              <button
                type="button"
                key={day}
                onClick={() => toggleDay(day)}
                className={`
                  px-3 py-1 rounded-full text-sm border transition cursor-pointer
                  ${
                    active
                      ? "bg-[#409D9B] text-white border-[#409D9B]"
                      : "bg-white text-gray-600 hover:border-[#409D9B]"
                  }
                `}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* SUBMIT */}
      <Button
        className="w-full rounded-xl cursor-pointer bg-[#409D9B] hover:bg-[#358a88]"
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