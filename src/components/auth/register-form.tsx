"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, MailOpen, Store, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { RegisterData, RegisterFormat } from "@/types";
import apiClient from "@/lib/api-client";


export default function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError("");
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError("Nama usaha harus diisi");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email harus diisi");
      return false;
    }
    if (!formData.password) {
      setError("Password harus diisi");
      return false;
    }
    if (formData.password.length < 8) {
      setError("Password minimal 8 karakter");
      return false;
    }
    if (formData.password !== formData.password_confirmation) {
      setError("Konfirmasi password tidak sesuai");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setError("");

    try {
      const result = await apiClient(process.env.NEXT_PUBLIC_API_BASE_URL + "/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (result.status === "success") {
        toast.success("Registrasi berhasil! Silakan verifikasi email Anda.");
        router.push(`/otp?email=${encodeURIComponent(formData.email)}`);
      } else {
        throw new Error(result.message || "Gagal melakukan registrasi");
        setError("Server sedang mengalami masalah. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Terjadi kesalahan jaringan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 mx-6 my-10">
      <form onSubmit={handleSubmit}>
        <Label htmlFor="name" className="text-sm font-medium mb-2">
          Nama Usaha
        </Label>
        <div className="relative">
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Masukkan nama usaha Anda"
            className="pl-12 py-5 bg-white border border-gray-300 shadow-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
            disabled={isLoading}
          />
          <Store className="absolute left-2.5 top-2.5 h-5 w-5 pointer-events-none text-black" />
        </div>

        <Label htmlFor="email" className="text-sm font-medium mb-2 mt-2">
          Alamat Email
        </Label>
        <div className="relative">
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Masukkan alamat email Anda"
            className="pl-12 py-5 bg-white border border-gray-300 shadow-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
            disabled={isLoading}
          />
          <MailOpen className="absolute left-2.5 top-2.5 h-5 w-5 pointer-events-none text-black" />
        </div>

        <Label htmlFor="password" className="text-sm font-medium mb-2 mt-2">
          Password
        </Label>
        <div className="relative">
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Masukkan kata sandi Anda"
            className="pl-12 py-5 bg-white border border-gray-300 shadow-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
            disabled={isLoading}
          />
          <KeyRound className="absolute left-2.5 top-2.5 h-5 w-5 pointer-events-none text-black" />
        </div>

        <Label htmlFor="password_confirmation" className="text-sm font-medium mb-2 mt-2">
          Konfirmasi Password
        </Label>
        <div className="relative">
          <Input
            type="password"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleInputChange}
            placeholder="Masukkan kata sandi Anda"
            className="pl-12 py-5 bg-white border border-gray-300 shadow-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
            disabled={isLoading}
          />
          <KeyRound className="absolute left-2.5 top-2.5 h-5 w-5 pointer-events-none text-black" />
        </div>

        {error && (
          <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="mt-6">
          <Button
            type="submit"
            size="lg"
            className="w-full bg-[#095CE6] rounded-full py-4 font-semibold disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Mendaftar...
              </>
            ) : (
              "Daftar Sekarang"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
