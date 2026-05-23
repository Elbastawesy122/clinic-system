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
    SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { useState } from "react";
import { useUpdateUser } from "@/hooks/use-update-user";
import { useDeleteUser } from "@/hooks/use-delete-user";

export const UserSettingsSheet = () => {

    const user = useAuthStore((s) => s.user);
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const updateMutation = useUpdateUser();
    const deleteMutation = useDeleteUser();

    if (!user) return null;

    const handleUpdate = () => {
        updateMutation.mutate({ id: user._id, data: { name, email }, })
    };

    const handleDelete = () => {
        const confirmDelete = confirm("Are you sure?");
        if (!confirmDelete) return;
        deleteMutation.mutate(user._id);
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <button className="flex items-center gap-2 w-full rounded-xl h-11 px-2 text-sm hover:bg-accent transition">
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
                <div className="grid gap-6 p-8">
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
                    <SheetClose asChild>
                        <Button
                            variant="outline"
                        >
                            Close
                        </Button>
                    </SheetClose>
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