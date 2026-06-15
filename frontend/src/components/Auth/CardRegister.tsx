"use client";

import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/schemas/auth.schema";
import { toast } from "sonner";
import { useEffect } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegister } from "@/hooks/auth/use-register";
import { RegisterFormValues } from "@/types/auth.types";

export function CardRegister() {
  const { mutate, isPending } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    toast.info(
      "You can choose a role for testing purposes (Admin / Patient)"
    );
  }, []);

  const onSubmit = (data: RegisterFormValues) => {
    const { confirmPassword, ...apiData } = data;

    mutate(apiData);
  };

  const onError = (errors: FieldErrors<FormData>) => {
    const firstError = Object.values(errors)[0];

    if (firstError && "message" in firstError) {
      toast.error(firstError.message as string);
    }
  };

  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader className="space-y-3">
        <CardTitle className="text-4xl font-black">
          Create Account
        </CardTitle>

        <CardDescription className="text-base text-[#409D9B]">
          Create your new clinic account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-5">

          {/* Name + Phone */}
          <div className="flex gap-4">
            <div className="space-y-2 w-1/2">
              <Label className="text-[#409D9B] font-bold">Name</Label>

              <Input
                placeholder="Ahmed"
                className="h-12 rounded-xl border-2 border-[#409D9B]"
                {...register("name")}
              />

              {errors.name && (
                <p className="text-red-500 text-sm">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2 w-1/2">
              <Label className="text-[#409D9B] font-bold">
                Phone Number
              </Label>

              <Input
                type="tel"
                placeholder="+20 123 4567 890"
                className="h-12 rounded-xl border-2 border-[#409D9B]"
                {...register("phone")}
              />

              {errors.phone && (
                <p className="text-red-500 text-sm">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label className="text-[#409D9B] font-bold">Email</Label>

            <Input
              type="email"
              placeholder="m@example.com"
              className="h-12 rounded-xl border-2 border-[#409D9B]"
              {...register("email")}
            />

            {errors.email && (
              <p className="text-red-500 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2 relative">
            <Label className="text-[#409D9B] font-bold">
              Password
            </Label>

            <Input
              type="password"
              placeholder="********"
              className="h-12 rounded-xl border-2 border-[#409D9B]"
              {...register("password")}
            />

            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password (FIXED) */}
          <div className="space-y-2 relative">
            <Label className="text-[#409D9B] font-bold">
              Confirm Password
            </Label>

            <Input
              type="password"
              placeholder="********"
              className="h-12 rounded-xl border-2 border-[#409D9B]"
              {...register("confirmPassword")}
            />

            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label className="text-[#409D9B] font-bold">Role</Label>

            <select
              {...register("role")}
              className="h-12 w-full rounded-xl border-2 border-[#409D9B] px-3 cursor-pointer"
            >
              <option value="patient">patient</option>
              <option value="admin">admin</option>
            </select>
          </div>

          {/* Submit */}
          <CardFooter className="flex-col gap-3 p-0">
            <Button
              disabled={isPending}
              className={`w-full h-12 rounded-xl bg-[#409D9B] hover:bg-[#2f7b79] text-white font-bold text-xl ${isPending ? "opacity-70 cursor-not-allowed" : ""
                }`}
            >
              {isPending ? "Loading..." : "Create Account"}
            </Button>

            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                href="/user/login"
                className="text-[#409D9B] font-semibold"
              >
                Login
              </Link>
            </p>
          </CardFooter>

        </form>
      </CardContent>
    </Card>
  );
}