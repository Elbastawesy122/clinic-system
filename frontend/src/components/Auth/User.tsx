"use client";

import Link from "next/link";
import { User, LogOut, Settings, Globe, Bell, HeartPulse, ShieldCheck, CreditCard, LogIn } from "lucide-react";
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

export function UserDropdown() {

  const isLoggedIn = false;

  return (
    <DropdownMenu>

      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full border border-[#d8eceb] bg-white hover:bg-[#409D9B] hover:text-white transition-all duration-300 size-11">
          <User className="size-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-72 rounded-3xl border-0 shadow-2xl p-3 bg-white border-gray-200" align="end">

        <DropdownMenuLabel className="p-4">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-full bg-[#409D9B] flex items-center justify-center text-white font-bold text-lg">
              A
            </div>

            <div>
              <h3 className="font-bold text-base">Ahmed</h3>
              <p className="text-xs text-muted-foreground">ahmed@gmail.com</p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem className="rounded-xl cursor-pointer h-11">
            <User />
            Profile
          </DropdownMenuItem>

          <DropdownMenuItem className="rounded-xl cursor-pointer h-11">
            <HeartPulse />
            Medical History
          </DropdownMenuItem>

          <DropdownMenuItem className="rounded-xl cursor-pointer h-11">
            <Bell />
            Notifications
          </DropdownMenuItem>

          <DropdownMenuItem className="rounded-xl cursor-pointer h-11">
            <CreditCard />
            Billing
          </DropdownMenuItem>
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
                <DropdownMenuItem className="cursor-pointer">🇺🇸 English</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">🇪🇬 العربية</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>

          </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>

          <DropdownMenuItem className="rounded-xl cursor-pointer h-11">
            <Settings />
            Settings
          </DropdownMenuItem>

          <DropdownMenuItem className="rounded-xl cursor-pointer h-11">
            <ShieldCheck />
            Privacy
          </DropdownMenuItem>

        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>

          {isLoggedIn ? (
            <DropdownMenuItem className="rounded-xl cursor-pointer h-11 text-red-500 focus:text-red-500">
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