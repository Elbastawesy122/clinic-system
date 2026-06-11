"use client";

import { useParams } from "next/navigation";

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

import { useSetupDoctorPassword } from "@/hooks/doctors/useSetupDoctorPassword";

import { resetPasswordSchema } from "@/schemas/auth.schema";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import z from "zod";

type FormData = z.infer<typeof resetPasswordSchema>;

export function CardSetupDoctorPassword() {
    const params = useParams();

    const token = params.token as string;

    const { mutate, isPending } =
        useSetupDoctorPassword();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(resetPasswordSchema),
    });

    const onSubmit = (data: FormData) => {
        console.log("SUBMIT FIRED", data);
        mutate({
            token,
            password: data.password,
        });
    };

    return (
        <Card className="w-full border-none shadow-none ring-0 outline-none border-4 border-white">
            <CardHeader className="space-y-3">
                <CardTitle className="text-4xl font-black">
                    Set Password
                </CardTitle>

                <CardDescription className="text-base text-[#409D9B]">
                    Create your account password
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    <div className="space-y-2">
                        <Label className="text-[#409D9B] font-bold">
                            Password
                        </Label>

                        <Input
                            type="password"
                            placeholder="Password"
                            className="h-12 rounded-xl border-2 border-[#409D9B]"
                            {...register("password")}
                        />

                        {errors.password && (
                            <p className="text-sm text-red-500">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[#409D9B] font-bold">
                            Confirm Password
                        </Label>

                        <Input
                            type="password"
                            placeholder="Confirm Password"
                            className="h-12 rounded-xl border-2 border-[#409D9B]"
                            {...register("confirmPassword")}
                        />

                        {errors.confirmPassword && (
                            <p className="text-sm text-red-500">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    <CardFooter className="p-0">
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="w-full h-12 rounded-xl bg-[#409D9B] hover:bg-[#2f7b79] text-white font-bold text-2xl"
                        >
                            {isPending
                                ? "Loading..."
                                : "Set Password"}
                        </Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    );
}