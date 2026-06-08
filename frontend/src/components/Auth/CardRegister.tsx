"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/schemas/auth.schema";
import { z } from "zod";

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

type FormData = z.infer<typeof registerSchema>

export function CardRegister() {

  const { mutate, isPending } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: FormData) => {
    mutate(data);
  };

  return (
    <Card className="w-full border-none shadow-none ring-0 outline-none">

      <CardHeader className="space-y-3">
        <CardTitle className="text-4xl font-black">
          Create Account
        </CardTitle>

        <CardDescription className="text-base text-[#409D9B]">
          Create your new clinic account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          <div className="flex justify-between items-center gap-4">
            <div className="space-y-2 w-1/2">
              <Label className="text-[#409D9B] font-bold">Name</Label>

              <Input
                placeholder="Ahmed"
                className="h-12 rounded-xl border-2 border-[#409D9B] outline-none"
                {...register("name")}
              />

              {errors.name && (
                <p className="text-red-500 text-sm">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2 w-1/2">
              <Label className="font-bold text-[#409D9B]">
                Phone Number
              </Label>

              <Input
                type="tel"
                placeholder="+20 123 4567 890"
                className="h-12 rounded-xl border-2 border-[#409D9B]"
                {...register("phone")}
              />

              {errors.phone && (
                <p className="text-sm text-red-500">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[#409D9B] font-bold">Email</Label>

            <Input
              type="email"
              placeholder="m@example.com"
              className="h-12 rounded-xl border-2 border-[#409D9B] outline-none"
              {...register("email")}
            />

            {errors.email && (
              <p className="text-red-500 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-[#409D9B] font-bold">Password</Label>

            <Input
              type="password"
              placeholder="********"
              className="h-12 rounded-xl border-2 border-[#409D9B] outline-none"
              {...register("password")}
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">
              {errors.password.message}
            </p>
          )}

          <CardFooter className="flex-col gap-3">

            <Button
              disabled={isPending}
              className={`w-full h-12 rounded-xl bg-[#409D9B] hover:bg-[#2f7b79] text-white font-bold text-2xl ${isPending ? "cursor-not-allowed opacity-70" : "cursor-pointer"
                }`}
            >
              {isPending ? "Loading..." : "Create Account"}
            </Button>

            <p className="text-sm text-gray-500 mt-3">
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