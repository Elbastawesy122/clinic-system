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

export function CardRegister() {
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
        <form className="space-y-5">

          <div className="space-y-2">
            <Label className="text-[#409D9B] font-bold">Name</Label>

            <Input
              placeholder="Ahmed"
              className="h-12 rounded-xl border-2 border-[#409D9B] outline-none"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[#409D9B] font-bold">Email</Label>

            <Input
              type="email"
              placeholder="m@example.com"
              className="h-12 rounded-xl border-2 border-[#409D9B] outline-none"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[#409D9B] font-bold">Password</Label>

            <Input
              type="password"
              className="h-12 rounded-xl border-2 border-[#409D9B] outline-none"
            />
          </div>

        </form>
      </CardContent>

      <CardFooter className="flex-col gap-3">

        <Button className="w-full h-12 rounded-xl bg-[#409D9B] hover:bg-[#2f7b79] cursor-pointer text-white font-bold text-2xl">
          Create Account
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
    </Card>
  );
}