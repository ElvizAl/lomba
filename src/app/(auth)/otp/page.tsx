"use client";

import React, { useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface OTPResponse {
  message: string;
  status: string;
  data?: {
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
      createdAt: string;
      updatedAt: string;
      last_login: string | null;
      role: string;
    };
  };
}

export default function OTPPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isResending, setIsResending] = useState(false);
  const hasSentOTP = useRef(false);

  const email = searchParams.get("email") || "";

  React.useEffect(() => {
    if (email && !hasSentOTP.current) {
      hasSentOTP.current = true;
    }
  }, [email]); // Only depend on email

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      setError("Kode OTP harus 6 digit");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://95.217.188.76:3030/api/auth/email/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            otp: otp,
          }),
        }
      );
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        try {
          const result: OTPResponse = await response.json();
          console.log("OTP verification response:", result);

          if (response.ok && result.status === "success") {
            toast.success("Verifikasi OTP berhasil! Silakan login.");
            router.push("/login");
          } else {
            setError(result.message || "Kode OTP tidak valid");
          }
        } catch (jsonError) {
          console.error("JSON parsing error:", jsonError);
          setError("Terjadi kesalahan pada server. Silakan coba lagi.");
        }
      } else {
        console.error("Server returned non-JSON response");
        setError("Server sedang mengalami masalah. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      setError("Terjadi kesalahan jaringan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOTP = async () => {
    setIsResending(true);
    setError("");

    try {
      const response = await fetch(
        "http://95.217.188.76:3030/api/auth/email/send",
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

      const result = await response.json();

      if (response.ok && result.status === "success") {
        toast.success("Kode OTP telah dikirim ke email Anda");
      } else {
        setError(result.message || "Gagal mengirim OTP");
      }
    } catch (error) {
      console.error("Send OTP error:", error);
      setError("Terjadi kesalahan jaringan. Silakan coba lagi.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen max-w-sm mx-auto flex flex-col bg-[#FBFCFF] font-sans py-10">
      <div className="flex-1">
        <div className="mb-6">
          <Link
            href="/register"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
           Kembali ke registrasi
          </Link>
        </div>
        <div className="flex flex-col py-25">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Verifikasi Email
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Masukkan kode OTP yang telah dikirim ke
            </p>
            <p className="text-sm font-medium text-gray-900">{email}</p>
          </div>

          <div className="space-y-6">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={setOtp}
                disabled={isLoading}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <Button
              onClick={handleVerifyOTP}
              disabled={isLoading || otp.length !== 6}
              className="w-full bg-[#095CE6] rounded-full py-4 font-semibold disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Memverifikasi...
                </>
              ) : (
                "Verifikasi OTP"
              )}
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Tidak menerima kode?{" "}
                <button
                  onClick={handleSendOTP}
                  disabled={isResending}
                  className="text-[#095CE6] hover:text-[#0747A6] font-medium disabled:opacity-50"
                >
                  {isResending ? "Mengirim..." : "Kirim ulang"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
