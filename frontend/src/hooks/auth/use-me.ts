"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { meApi } from "@/api/auth.api";
import { useAuthStore } from "@/store/auth-store";

export const useMe = () => {
  const setUser = useAuthStore((s) => s.setUser);

  const query = useQuery({
    queryKey: ["me"],
    queryFn: meApi,
    retry: false,
  });

  useEffect(() => {
    if (query.data?.user) {
      setUser(query.data.user);
    }
  }, [query.data, setUser]);

  return query;
};
