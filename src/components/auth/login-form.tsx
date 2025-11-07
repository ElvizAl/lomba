"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, Loader2, MailOpen } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LoginData } from "@/types";
import apiClient from "@/lib/api-client";


export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const validateForm = (): boolean => {
    if (!formData.email.trim()) {
      setError("Email harus diisi");
      return false;
    }
    if (!formData.password) {
      setError("Password harus diisi");
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
      const result = await apiClient(process.env.NEXT_PUBLIC_API_BASE_URL + "/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (result.status === "success") {
        localStorage.setItem("authToken", result.data.token);
        toast.success("Login berhasil!");
        router.push("/home");
      } else {
        setError(result?.message || "Terjadi kesalahan saat login");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error || "Terjadi kesalahan saat login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 mx-6 my-10">
      <form onSubmit={handleSubmit}>
        <Label htmlFor="email" className="text-sm font-medium mb-2">
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
        <Label htmlFor="email" className="text-sm font-medium mb-2 mt-2">
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
        <Link href="/lupa-password">
          <p className="text-[12px] text-[#095CE6] font-semibold text-right mt-1">
            Lupa Kata Sandi
          </p>
        </Link>
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
                Masuk...
              </>
            ) : (
              "Masuk Sekarang"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
