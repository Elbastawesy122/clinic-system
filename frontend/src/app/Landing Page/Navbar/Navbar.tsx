"use client";

import { useState } from "react";
import Image from "next/image";

export const Navbar = () => {
    const [open, setOpen] = useState(false);

    const links = [
        { title: "Home", link: "#" },
        { title: "About", link: "#about" },
        { title: "Services", link: "#services" },
        { title: "Contact", link: "#contact" },
    ];

    return (
        <header
            className="
        sticky top-0 z-50
        backdrop-blur-xl
        bg-white/70
        border-b border-white/20
      "
        >
            <div
                className="
          px-6 md:px-16 lg:px-32
          py-4
          flex items-center justify-between
        "
            >
                <Image
                    src="/images/landing-page/logo.png"
                    alt="Clinic Logo"
                    width={140}
                    height={80}
                    priority
                    className="object-contain hover:scale-105 transition duration-500"
                />

                <nav className="hidden md:block">
                    <ul
                        className="
              flex items-center gap-4
              bg-white/60
              backdrop-blur-lg
              border border-[#e8f4f4]
              shadow-lg
              rounded-full
              px-3 py-2
            "
                    >
                        {links.map((item) => (
                            <li key={item.title}>
                                <a
                                    href={item.link}
                                    className="
                    relative
                    px-5 py-2.5
                    rounded-full
                    text-[#409D9B]
                    font-semibold
                    overflow-hidden
                    transition-all
                    duration-500
                    hover:text-white
                    group
                    block
                  "
                                >
                                    <span
                                        className="
                      absolute inset-0
                      bg-[#409D9B]
                      scale-x-0
                      origin-left
                      transition-transform
                      duration-500
                      ease-out
                      rounded-full
                      group-hover:scale-x-100
                    "
                                    />
                                    <span className="relative z-10">
                                        {item.title}
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden text-[#409D9B] text-3xl"
                >
                    ☰
                </button>
            </div>

            {open && (
                <div className="md:hidden fixed inset-0 z-999]">

                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/30"
                        onClick={() => setOpen(false)}
                    />
                    <div className="absolute top-20 right-6 left-6 bg-white shadow-2xl rounded-2xl p-5 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2">
                        {links.map((item) => (
                            <a
                                key={item.title}
                                href={item.link}
                                onClick={() => setOpen(false)}
                                className="
                                    text-[#409D9B]
                                    font-semibold
                                    py-3
                                    px-4
                                    rounded-lg
                                    hover:bg-[#409D9B]
                                    hover:text-white
                                    transition
                                "
                            >
                                {item.title}
                            </a>
                        ))}
                    </div>

                </div>
            )}
        </header>
    );
};