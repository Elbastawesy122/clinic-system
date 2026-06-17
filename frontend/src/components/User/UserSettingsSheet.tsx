"use client";

import Link from "next/link";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { useRef, useState } from "react";
import { useUpdateUser } from "@/hooks/use-update-user";
import { useDeleteUser } from "@/hooks/use-delete-user";
import Image from "next/image";

export const UserSettingsSheet = () => {

    const user = useAuthStore((s) => s.user);
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [phone, setphone] = useState(user?.phone || "");
    const updateMutation = useUpdateUser();
    const deleteMutation = useDeleteUser();

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>("");

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    if (!user) return null;

    const imageSrc = user.image || preview ;

    const handleUpdate = () => {
        const formData = new FormData();

        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);

        if (image) {
            formData.append("image", image);
        }

        updateMutation.mutate({
            id: user._id,
            data: formData,
        });
    };

    const handleDelete = () => {
        const confirmDelete = confirm("Are you sure?");
        if (!confirmDelete) return;
        deleteMutation.mutate(user._id);
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <button className="flex items-center gap-2 w-full rounded-xl h-11 px-2 text-sm hover:bg-accent transition cursor-pointer">
                    <Settings className="size-4" />
                    Settings
                </button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg border-0 bg-white p-0">
                <SheetHeader className="border-b p-6">
                    <SheetTitle className="text-xl font-bold">
                        Account Settings
                    </SheetTitle>

                    <SheetDescription>
                        Update your account information and profile details.
                    </SheetDescription>
                </SheetHeader>

                <div className="p-6 space-y-6 overflow-y-auto">
                    {/* Avatar Card */}
                    <div className="rounded-2xl border bg-slate-50 p-6">
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative">
                                {imageSrc ? (
                                    <Image
                                        src={imageSrc}
                                        alt={user.name}
                                        width={120}
                                        height={120}
                                        className="h-28 w-28 rounded-full object-cover border-4 border-white shadow-md"
                                    />
                                ) : (
                                    <div className="h-28 w-28 rounded-full bg-[#409D9B] flex items-center justify-center text-white text-3xl font-bold">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <button
                                    onClick={handleClick}
                                    className="absolute bottom-0 right-1 bg-[#409D9B] hover:bg-[#358a88] text-white rounded-full px-3 py-1 text-xs transition cursor-pointer">
                                    Edit
                                </button>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={handleChange}
                                    className="hidden"
                                />
                            </div>
                            <div className="text-center">
                                <h3 className="font-semibold text-lg">
                                    {user.name}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {user.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form Card */}
                    <div className="rounded-2xl border p-6 space-y-5">
                        <div className="space-y-2">
                            <Label>Name</Label>
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="rounded-xl h-11 focus-visible:ring-[#409D9B]"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="rounded-xl h-11 focus-visible:ring-[#409D9B]"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Phone</Label>
                            <Input
                                value={phone}
                                onChange={(e) => setphone(e.target.value)}
                                className="rounded-xl h-11 focus-visible:ring-[#409D9B]"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                        <Link href="/user/forgot-password">
                            <Button
                                variant="outline"
                                className="w-full h-11 rounded-xl cursor-pointer mb-3">
                                Change Password
                            </Button>
                        </Link>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={deleteMutation.isPending}
                            className="w-full h-11 rounded-xl cursor-pointer">
                            Delete Account
                        </Button>
                    </div>
                </div>

                <SheetFooter className="border-t p-6">
                    <Button
                        onClick={handleUpdate}
                        disabled={updateMutation.isPending}
                        className="w-full h-11 rounded-xl bg-[#409D9B] hover:bg-[#358a88] cursor-pointer">
                        {updateMutation.isPending
                            ? "Saving..."
                            : "Save Changes"}
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};