"use client";

import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Clinic } from "@/types/clinic.types";
import {
  clinicFormSchema,
  ClinicFormValues,
  WorkingDay,
  workingDays,
} from "@/schemas/clinic.schema";

import { useCreateClinic } from "@/hooks/clinics/use-create-clinic";
import { useUpdateClinic } from "@/hooks/clinics/use-update-clinic";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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

  const selectedDays = form.watch("workingDays") || [];

  const toggleDay = (day: WorkingDay) => {
    const exists = selectedDays.includes(day);

    const updated = exists
      ? selectedDays.filter((d) => d !== day)
      : [...selectedDays, day];

    form.setValue("workingDays", updated);
  };

  const onSubmit = (data: ClinicFormValues) => {
    if (mode === "edit" && clinic) {
      update.mutate(
        { id: clinic._id, data },
        { onSuccess: onClose }
      );
    } else {
      create.mutate(data, { onSuccess: onClose });
    }
  };

  const showErrors = (errors: FieldErrors<ClinicFormValues>) => {
    Object.values(errors).forEach((err) => {
      if (err?.message) {
        toast.error(err.message);
      }
    });
  };

  const onInvalid = (errors: FieldErrors<ClinicFormValues>) => {
    showErrors(errors);
  };

  const isPending = create.isPending || update.isPending;

  return (
    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit, onInvalid)}>

      {/* BASIC INFO */}
      <div className="grid gap-4">
        <Input
          placeholder="Clinic Name"
          {...form.register("name")}
          className="h-11 rounded-xl"
        />

        <Input
          placeholder="Description"
          {...form.register("description")}
          className="h-11 rounded-xl"
        />

        <Input
          placeholder="Location"
          {...form.register("location")}
          className="h-11 rounded-xl"
        />

        <Input
          placeholder="Phone"
          {...form.register("phone")}
          className="h-11 rounded-xl"
        />
      </div>

      {/* TIME */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm text-muted-foreground">
            Start Time
          </label>

          <Input
            type="time"
            {...form.register("startTime")}
            className="h-11 rounded-xl cursor-pointer"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-muted-foreground">
            End Time
          </label>

          <Input
            type="time"
            {...form.register("endTime")}
            className="h-11 rounded-xl cursor-pointer"
          />
        </div>
      </div>

      {/* WORKING DAYS (FANCY CHIPS) */}
      <div className="space-y-2">
        <h2 className="text-sm font-medium text-muted-foreground">
          Working Days
        </h2>

        <div className="flex flex-wrap gap-2">
          {workingDays.map((day) => {
            const isActive = selectedDays.includes(day);

            return (
              <div
                key={day}
                onClick={() => toggleDay(day)}
                className={`
                  px-3 py-2 rounded-xl border text-sm cursor-pointer
                  transition-all select-none
                  hover:scale-[1.05]
                  ${isActive
                    ? "bg-[#409D9B]/10 border-[#409D9B] text-[#409D9B]"
                    : "border-gray-200 hover:border-gray-300"
                  }
                `}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>

      {/* SUBMIT */}
      <Button
        className="w-full h-11 rounded-xl bg-[#409D9B] hover:bg-[#358a88] transition cursor-pointer"
        disabled={isPending}
      >
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