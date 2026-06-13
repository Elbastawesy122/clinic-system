"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { UserDropdown } from "../User/User";

export const Navbar = () => {
    const [open, setOpen] = useState(false);

    const links = [
        { title: "Home", link: "/" },
        { title: "About", link: "/about" },
        { title: "Services", link: "/services" },
        { title: "Contact", link: "/contact" },
    ];

    return (
        <header
            className="
            sticky top-0 z-50
            w-full
            border-b border-white/20
            bg-white/70
            backdrop-blur-xl
        "
        >
            <div
                className="
                max-w-7xl mx-auto
                px-6 py-4
                flex items-center justify-between
            "
            >
                <Link href="/">
                    <Image
                        src="/images/logo.png"
                        alt="Clinic Logo"
                        width={140}
                        height={80}
                        priority
                        className="
                        object-contain
                        transition-all duration-300
                        hover:scale-105
                        cursor-pointer
                    "
                    />
                </Link>

                <div className="flex items-center gap-4">
                    <nav className="hidden md:block">
                        <ul
                            className="
                            flex items-center gap-2
                            rounded-full
                            border border-[#e8f4f4]
                            bg-white/60
                            backdrop-blur-lg
                            shadow-lg
                            px-3 py-2
                        "
                        >
                            {links.map((item) => (
                                <li key={item.title}>
                                    <Link
                                        href={item.link}
                                        className="
                                        relative
                                        block
                                        overflow-hidden
                                        rounded-full
                                        px-5 py-2.5
                                        font-semibold
                                        text-[#409D9B]
                                        transition-all duration-500
                                        hover:text-white
                                        group
                                    "
                                    >
                                        <span
                                            className="
                                            absolute inset-0
                                            rounded-full
                                            bg-[#409D9B]
                                            scale-x-0
                                            origin-left
                                            transition-transform
                                            duration-500
                                            ease-out
                                            group-hover:scale-x-100
                                        "
                                        />

                                        <span className="relative z-10">
                                            {item.title}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <UserDropdown />

                    <button
                        onClick={() => setOpen(!open)}
                        className="
                        md:hidden
                        flex items-center justify-center
                        w-10 h-10
                        rounded-xl
                        text-[#409D9B]
                        hover:bg-[#409D9B]/10
                        transition-colors
                    "
                    >
                        {open ? (
                            <X size={24} />
                        ) : (
                            <Menu size={24} />
                        )}
                    </button>
                </div>
            </div>

            {open && (
                <div className="fixed inset-0 z-999 md:hidden">
                    <div
                        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                        onClick={() => setOpen(false)}
                    />

                    <div
                        className="
                        absolute
                        top-20 left-6 right-6
                        rounded-2xl
                        border border-slate-100
                        bg-white
                        p-5
                        shadow-2xl
                        flex flex-col gap-2
                        animate-in
                        fade-in
                        slide-in-from-top-2
                    "
                    >
                        {links.map((item) => (
                            <Link
                                key={item.title}
                                href={item.link}
                                onClick={() => setOpen(false)}
                                className="
                                rounded-xl
                                px-4 py-3
                                font-semibold
                                text-[#409D9B]
                                transition-all
                                hover:bg-[#409D9B]
                                hover:text-white
                            "
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}