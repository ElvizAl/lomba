"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import apiClient from "@/lib/api-client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, MailOpen, Loader2 } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email harus diisi");
      return;
    }

    if (!email.includes("@")) {
      setError("Format email tidak valid");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const result = await apiClient(
        process.env.NEXT_PUBLIC_API_BASE_URL + "/api/auth/password/forgot",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      );

      if (result.status === "success") {
        toast.success("Kode OTP telah dikirim ke email Anda");
        router.push(`/lupa-password/otp?email=${encodeURIComponent(email)}`);
      } else {
        setError(result.message || "Gagal mengirim kode OTP");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      setError("Terjadi kesalahan jaringan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen max-w-sm mx-auto flex flex-col bg-[#FBFCFF] font-sans py-10">
      <div className="flex-1">
        <div className="mb-6 p-4">
          <Link
            href="/login"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Kembali ke login
          </Link>
        </div>

        <div className="flex flex-col py-25">
          <div className="text-center mb-4 p-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Lupa Password?
            </h1>
            <p className="text-gray-600 text-sm">
              Masukkan email Anda untuk menerima kode verifikasi
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mx-6">
              <Label htmlFor="email" className="text-sm font-medium mb-2">
                Alamat Email
              </Label>
              <div className="relative">
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Masukkan alamat email Anda"
                  className="pl-12 py-5 bg-white border border-gray-300 shadow-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                  disabled={isLoading}
                />
                <MailOpen className="absolute left-2.5 top-2.5 h-5 w-5 pointer-events-none text-black" />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
              <div className="mt-4">
              <Button
                type="submit"
                size="lg"
                className="w-full bg-[#095CE6] rounded-full py-4 font-semibold disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  "Kirim Kode OTP"
                )}
              </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
