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

export function CardResetPassword() {
  return (
    <Card className="w-full border-none shadow-none ring-0 outline-none border-4 border-white">

      <CardHeader className="space-y-3">
        <CardTitle className="text-4xl font-black">
          Reset Password
        </CardTitle>

        <CardDescription className="text-base text-[#409D9B]">
          Enter your email to receive reset link
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-5">

          <div className="space-y-2">
            <Label className="text-[#409D9B] font-bold">Email</Label>

            <Input
              type="email"
              placeholder="m@example.com"
              className="h-12 rounded-xl border-2 border-[#409D9B] outline-none"
            />
          </div>

        </form>
      </CardContent>

      <CardFooter>
        <Button className="w-full h-12 rounded-xl bg-[#409D9B] hover:bg-[#2f7b79] cursor-pointer text-white font-bold text-2xl">
          Send Reset Link
        </Button>
      </CardFooter>
    </Card>
  );
}