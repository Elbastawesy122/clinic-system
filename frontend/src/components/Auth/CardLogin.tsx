"use client";

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

export function CardLogin() {
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
        <form className="space-y-5">

          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#409D9B] font-bold">
              Email
            </Label>

            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              className="h-12 rounded-xl border-2 border-[#409D9B] outline-none"
            />
          </div>

          <div className="space-y-2">

            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-[#409D9B] font-bold">
                Password
              </Label>

              <Link
                href="/user/reset-password"
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
            />
          </div>

        </form>
      </CardContent>

      <CardFooter className="flex-col gap-3">

        <Button className="w-full h-12 rounded-xl bg-[#409D9B] hover:bg-[#2f7b79] cursor-pointer text-white font-bold text-2xl">
          Login
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
    </Card>
  );
}