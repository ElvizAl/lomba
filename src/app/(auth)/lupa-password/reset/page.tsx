"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import apiClient from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, KeyRound, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";

interface ResetPasswordData {
  password: string;
  password_confirmation: string;
}

interface ResetResponse {
  status: string;
  message?: string;
}

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<ResetPasswordData>({
    password: "",
    password_confirmation: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const token = searchParams.get("token") || "";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError("");
  };

  const validateForm = (): boolean => {
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
      const result = await apiClient(process.env.NEXT_PUBLIC_API_BASE_URL + "/api/auth/password/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          newPassword: formData.password,
        }),
      });

      if (result.status === "success") {
        toast.success("Password berhasil direset! Silakan login dengan password baru.");
        router.push("/login");
      } else {
        // Handle specific error messages
        if (result.message && result.message.includes("Token tidak valid")) {
          setError("Token tidak valid atau sudah kadaluarsa. Silakan coba lupa password lagi.");
        } else if (result.message && result.message.includes("kadaluarsa")) {
          setError("Token sudah kadaluarsa. Silakan coba lupa password lagi.");
        } else {
          setError(result.message || "Gagal mereset password");
        }
      }
    } catch (error: any) {
      console.error("Reset password error:", error);
      setError(error.message || "Terjadi kesalahan jaringan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen max-w-sm mx-auto flex flex-col bg-[#FBFCFF] font-sans py-10">
      <div className="flex-1">
        <div className="mb-6">
          <Link
            href="/lupa-password/otp"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Kembali
          </Link>
        </div>

        <div className="flex flex-col py-25">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Reset Password
            </h2>
            <p className="text-gray-600 text-sm">
              Masukkan password baru untuk akun Anda
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="password" className="text-sm font-medium mb-2">
                Password Baru
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Masukkan password baru"
                  className="pl-12 pr-12 py-5 bg-white border border-gray-300 shadow-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                  disabled={isLoading}
                />
                <KeyRound className="absolute left-2.5 top-2.5 h-5 w-5 pointer-events-none text-black" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-2.5 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="password_confirmation" className="text-sm font-medium mb-2">
                Konfirmasi Password
              </Label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  name="password_confirmation"
                  value={formData.password_confirmation}
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
                <p className="text-sm text-red-600 mb-2">{error}</p>
                {(error.includes("Token tidak valid") || error.includes("kadaluarsa")) && (
                  <Link 
                    href="/lupa-password" 
                    className="text-sm text-blue-600 hover:underline font-medium"
                  >
                    Mulai ulang proses lupa password
                  </Link>
                )}
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full bg-[#095CE6] rounded-full py-4 font-semibold disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Mereset Password...
                </>
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen max-w-sm mx-auto flex flex-col bg-[#FBFCFF] font-sans py-10">
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
        </div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
