"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { verifyEmailSchema } from "@/schemas/auth.schema";
import z from "zod";
import { useVerifyEmail } from "@/hooks/auth/use-verify-email";
type FormData = z.infer<typeof verifyEmailSchema>;
export function CardVerifyEmail() {

    const { mutate, isPending } = useVerifyEmail();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(verifyEmailSchema),
    });

    const onSubmit = (data: FormData) => {
        mutate(data);
    };
    return (
        <Card className="w-full border-none shadow-none ring-0 outline-none border-4 border-white">

            <CardHeader className="space-y-3">
                <CardTitle className="text-4xl font-black">
                    Verify Account
                </CardTitle>

                <CardDescription className="text-base text-[#409D9B]">
                    Check your email or spam folder for the OTP, then enter your email and OTP to verify your account.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

                    {/* OTP */}
                    <div className="space-y-2">
                        <Label className="text-[#409D9B] font-bold">OTP</Label>

                        <Input
                            type="text"
                            placeholder="123456"
                            className="h-12 rounded-xl border-2 border-[#409D9B]"
                            {...register("otp")}
                        />
                        {errors.otp && (
                            <p className="text-red-500 text-sm">
                                {errors.otp.message}
                            </p>
                        )}
                    </div>

                    <CardFooter>
                        <Button disabled={isPending} className="w-full h-12 rounded-xl bg-[#409D9B] hover:bg-[#2f7b79] cursor-pointer text-white font-bold text-2xl">
                            {isPending
                                ? "Loading..."
                                : "Verify Account"}
                        </Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    );
}