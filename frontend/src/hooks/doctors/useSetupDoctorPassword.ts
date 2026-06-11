"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { SetupPasswordPayload } from "@/types/doctor.types";
import { setupDoctorPasswordApi } from "@/api/doctors.api";
import { useRouter } from "next/navigation";

export const useSetupDoctorPassword = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: ({ token, password }: SetupPasswordPayload) => setupDoctorPasswordApi(token, password),

    onSuccess: (res) => {
      router.push("/user/login");
      toast.success(res.data.message || "Password setup successfully");
    },

    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err?.response?.data?.message || "Error setting up password");
    },
  });
};
