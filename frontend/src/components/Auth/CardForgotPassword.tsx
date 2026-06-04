"use client";

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
import { useForgotPassword } from "@/hooks/auth/use-forgot-password";
import { emailSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

type FormData = z.infer<typeof emailSchema>;

export function CardForgotPassword() {
  const { mutate, isPending } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = (data: FormData) => {
    mutate(data);
  };
  return (
    <Card className="w-full border-none shadow-none ring-0 outline-none border-4 border-white">

      <CardHeader className="space-y-3">
        <CardTitle className="text-4xl font-black">
          Forgot Password
        </CardTitle>

        <CardDescription className="text-base text-[#409D9B]">
          Enter your email to receive reset link
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

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

          <CardFooter>
            <Button disabled={isPending} className="w-full h-12 rounded-xl bg-[#409D9B] hover:bg-[#2f7b79] cursor-pointer text-white font-bold text-2xl">
              {isPending
                ? "Loading..."
                : "Send Reset Link"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}