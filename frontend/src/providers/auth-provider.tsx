"use client";

import { SkeletonCard } from "@/components/skeleton/SkeletonCard";
import { useMe } from "@/hooks/auth/use-me";

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isLoading } = useMe();

    if (isLoading) {
        return (
            <SkeletonCard />
        );
    }

    return <>{children}</>;
}