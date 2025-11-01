"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import HCard from "../ui/h-card";

export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        router.push("/login");
        return;
      }

      localStorage.removeItem("authToken");

      toast.success("Berhasil keluar dari akun");

      router.push("/login");

    } catch (error) {
      console.error("Logout error:", error);
      localStorage.removeItem("authToken");
      toast.success("Berhasil keluar dari akun");
      router.push("/login");
    }
  };

  return (
    <HCard menu={{ name: "Keluar", href: "/login", icon: LogOut, action: handleLogout, description: "Keluar dari akun Anda" }} i={0} />
  );
}
