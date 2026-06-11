"use client";

import Link from "next/link";
import {
  User,
  LogOut,
  Globe,
  LogIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store/auth-store";
import { useMutation } from "@tanstack/react-query";
import { logoutApi } from "@/api/auth.api";
import { toast } from "sonner";
import { UserSettingsSheet } from "./UserSettingsSheet";
import Image from "next/image";

export function UserDropdown() {

  const user = useAuthStore((s) => s.user);
  const logoutStore = useAuthStore((s) => s.logout);
  const isLoggedIn = !!user;

  const logoutMutation =
    useMutation({
      mutationFn: logoutApi,
      onSuccess: () => {
        logoutStore();
        toast.success(
          "Logged out successfully"
        );
      },
      onError: () => {
        toast.error(
          "Logout failed"
        );
      },
    });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full border border-[#d8eceb] bg-white hover:bg-[#409D9B] hover:text-white transition-all duration-300 size-11 cursor-pointer">
          <User className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-72 rounded-3xl border-0 shadow-2xl p-3 bg-white"
        align="end"
      >
        {isLoggedIn && (
          <>
            <DropdownMenuLabel className="p-4">
              <div className="flex items-center gap-3">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt="user image"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="size-12 rounded-full bg-[#409D9B] flex items-center justify-center text-white font-bold text-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-base">
                    {user.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuGroup>
          <Link href="/dashboard">
            <DropdownMenuItem className="rounded-xl cursor-pointer h-11">
              <User />
              Profile
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="rounded-xl h-11 cursor-pointer">
              <Globe />
              Language
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="rounded-2xl border-0 shadow-xl">
                <DropdownMenuItem className="cursor-pointer">
                  🇺🇸 English
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  🇪🇬 العربية
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <UserSettingsSheet />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {isLoggedIn ? (
            <DropdownMenuItem
              onClick={() => logoutMutation.mutate()}
              className="rounded-xl cursor-pointer h-11 text-red-500 focus:text-red-500">
              <LogOut />
              Logout
            </DropdownMenuItem>
          ) : (
            <Link href="/user/login">
              <DropdownMenuItem className="rounded-xl cursor-pointer h-11">
                <LogIn />
                Login
              </DropdownMenuItem>
            </Link>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}