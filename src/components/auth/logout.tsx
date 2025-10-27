"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

export default function Logout() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    
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
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handleLogout}
      disabled={isLoading}
      className="w-full cursor-pointer bg-white border py-1 border-gray-200 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
    >
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 ml-3 bg-blue-100 rounded-full flex items-center justify-center">
          <LogOut className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold mr-5 text-gray-900">
            {isLoading ? "Memproses..." : "Keluar"}
          </h3>
          <p className="text-[12px] text-gray-500">Keluar Akun</p>
        </div>
      </div>
    </button>
  );
}
