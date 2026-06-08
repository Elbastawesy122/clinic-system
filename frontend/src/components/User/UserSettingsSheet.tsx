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

    const imageSrc = user.image || preview || "/default-avatar.png";

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
            <SheetContent className="border-0 bg-white w-full sm:max-w-lg">
                <SheetHeader>
                    <SheetTitle>
                        Account Settings
                    </SheetTitle>
                    <SheetDescription>
                        Update your account
                        information.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-6 px-8">

                    <div className="flex justify-center items-center gap-4">
                        <div className="relative flex items-center justify-center">
                            {imageSrc ? (
                                <Image
                                    src={imageSrc}
                                    alt={user.name}
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    className="w-24 h-24 rounded-full object-cover border"
                                />
                            ) : (
                                <div className="size-12 rounded-full bg-[#409D9B] flex items-center justify-center text-white font-bold text-lg">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                            )}
                            <button
                                onClick={handleClick}
                                className="absolute bottom-0 right-0 bg-[#409D9B] text-white text-xs px-2 py-1 rounded-full"
                            >
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
                    </div>
                    <div className="grid gap-2">
                        <Label>Name</Label>
                        <Input
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            className="focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>Email</Label>
                        <Input
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            className="focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>Phone</Label>
                        <Input
                            value={phone}
                            onChange={(e) =>
                                setphone(e.target.value)
                            }
                            className="focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                    </div>
                    <Link href="/user/forgot-password">
                        <Button
                            variant="outline"
                            className="w-full"
                        >
                            Change Password
                        </Button>
                    </Link>
                    <Button
                        variant="destructive"
                        onClick={
                            handleDelete
                        }
                    >
                        Delete Account
                    </Button>
                </div>
                <SheetFooter>
                    {/* <SheetClose asChild>
                        <Button
                            variant="outline"
                        >
                            Close
                        </Button>
                    </SheetClose> */}
                    <Button
                        onClick={handleUpdate}
                        disabled={updateMutation.isPending}
                    >
                        Save Changes
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};