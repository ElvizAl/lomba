"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import apiClient from "@/lib/api-client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/layout/navbar";
import { KeyRound, Eye, EyeOff } from "lucide-react";
import BottomButton from "@/components/ui/bottom-button";

interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ChangePasswordPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<ChangePasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError("");
  };

  const validateForm = (): boolean => {
    if (!formData.currentPassword) {
      setError("Password lama harus diisi");
      return false;
    }
    if (!formData.newPassword) {
      setError("Password baru harus diisi");
      return false;
    }
    if (formData.newPassword.length < 8) {
      setError("Password baru minimal 8 karakter");
      return false;
    }
    if (formData.currentPassword === formData.newPassword) {
      setError("Password baru harus berbeda dengan password lama");
      return false;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Konfirmasi password tidak sesuai");
      return false;
    }
    return true;
  };

  const isFormValid = (): boolean => {
    return !!(
      formData.currentPassword &&
      formData.newPassword &&
      formData.confirmPassword &&
      formData.newPassword.length >= 8 &&
      formData.currentPassword !== formData.newPassword &&
      formData.newPassword === formData.confirmPassword
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setError("");

    try {
      const result = await apiClient(
        process.env.NEXT_PUBLIC_API_BASE_URL + "/api/user/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            current_password: formData.currentPassword,
            new_password: formData.newPassword,
            confirm_password: formData.confirmPassword,
          }),
        }
      );

      if (result.status === "success") {
        toast.success("Password berhasil diubah!");
        router.push("/profile");
      } else {
        setError(result.message || "Gagal mengubah password");
      }
    } catch (error) {
      console.error("Change password error:", error);
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFCFF] font-sans px-4 pt-5">
      <Navbar title="Ganti Password" />


      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="currentPassword" className="text-sm font-medium mb-2">
            Password Lama
          </Label>
          <div className="relative">
            <Input
              type={showCurrentPassword ? "text" : "password"}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleInputChange}
              placeholder="Masukkan password lama"
              className="pl-12 pr-12 py-5 bg-white border border-gray-300 shadow-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
              disabled={isLoading}
            />
            <KeyRound className="absolute left-2.5 top-2.5 h-5 w-5 pointer-events-none text-black" />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-2.5 top-2.5 text-gray-500 hover:text-gray-700"
            >
              {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div>
          <Label htmlFor="newPassword" className="text-sm font-medium mb-2">
            Password Baru
          </Label>
          <div className="relative">
            <Input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              placeholder="Masukkan password baru"
              className="pl-12 pr-12 py-5 bg-white border border-gray-300 shadow-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
              disabled={isLoading}
            />
            <KeyRound className="absolute left-2.5 top-2.5 h-5 w-5 pointer-events-none text-black" />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-2.5 top-2.5 text-gray-500 hover:text-gray-700"
            >
              {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div>
          <Label htmlFor="confirmPassword" className="text-sm font-medium mb-2">
            Konfirmasi Password Baru
          </Label>
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Konfirmasi password baru"
              className="pl-12 pr-12 py-5 bg-white border border-gray-300 shadow-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
              disabled={isLoading}
            />
            <KeyRound className="absolute left-2.5 top-2.5 h-5 w-5 pointer-events-none text-black" />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2.5 top-2.5 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        <BottomButton isSubmitting={isLoading} isFormValid={isFormValid()} type="submit" text="Ubah Password" />
      </form>
    </div>
  );
}
