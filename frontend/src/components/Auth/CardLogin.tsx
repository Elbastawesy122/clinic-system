"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/auth.schema";
import { z } from "zod";
import { useLogin } from "@/hooks/auth/use-login";

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

type FormData = z.infer<typeof loginSchema>;
export function CardLogin() {

  const { mutate, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: FormData) => {
    mutate(data);
  };

  return (
    <Card className="w-full border-none shadow-none ring-0 outline-none">

      <CardHeader className="space-y-3">
        <CardTitle className="text-4xl font-black ">
          Welcome Back
        </CardTitle>

        <CardDescription className="text-base text-[#409D9B]">
          Login to continue to your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#409D9B] font-bold">
              Email
            </Label>

            <Input
              id="email"
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

            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-[#409D9B] font-bold">
                Password
              </Label>

              <Link
                href="/user/forgot-password"
                className="
                  text-sm
                  text-[#409D9B]
                  hover:underline
                "
              >
                Forgot Password?
              </Link>
            </div>

            <Input
              id="password"
              type="password"
              placeholder="********"
              className="h-12 rounded-xl border-2 border-[#409D9B] outline-none"
              {...register("password")}
            />

            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          <CardFooter className="flex-col gap-3">

            <Button disabled={isPending} className="w-full h-12 rounded-xl bg-[#409D9B] hover:bg-[#2f7b79] cursor-pointer text-white font-bold text-2xl">
              {isPending
                ? "Loading..."
                : "Login"}
            </Button>

            <Button
              variant="outline"
              className="w-full h-12 rounded-xl border border-[#409D9B] cursor-pointer text-[#409D9B] font-bold text-2xl"
            >
              Login with Google
            </Button>

            <p className="text-sm text-gray-500 mt-3">
              Don&apos;t have an account?{" "}

              <Link
                href="/user/register"
                className="text-[#409D9B] font-semibold"
              >
                Sign Up
              </Link>
            </p>

          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}