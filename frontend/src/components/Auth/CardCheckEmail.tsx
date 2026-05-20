import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function CardCheckEmail() {
  return (
    <Card className="w-full border-none shadow-none ring-0 outline-none text-center">

      <CardHeader className="space-y-4">
        <div className="text-6xl">
          📩
        </div>

        <CardTitle className="text-4xl font-black">
          Check Your Email
        </CardTitle>

        <CardDescription className="text-base text-[#409D9B]">
          We sent a password reset link to your email
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">

        <Button className="w-full h-12 rounded-xl bg-[#409D9B] hover:bg-[#2f7b79] cursor-pointer text-white font-bold text-2xl">
          Open Gmail
        </Button>

      </CardContent>
    </Card>
  );
}