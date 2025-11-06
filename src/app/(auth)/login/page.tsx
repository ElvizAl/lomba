
import LoginForm from "@/components/auth/login-form";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen max-w-md mx-auto flex flex-col bg-[#FBFCFF] font-sans">
      <div className="flex my-10 p-4">
        <Image
          src="/logo.png"
          alt="Logo"
          width={100}
          height={100}
          className="w-18 h-18"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col gap-2 ml-6">
          <p className="text-2xl font-black">Masuk</p>
          <p className="text-lg text-[#868A92]">Selamat Datang Kembali</p>
        </div>
      </div>
      
      <LoginForm />

      <div className="flex flex-col items-center mt-4 mb-8 space-y-2">
        <p className="text-sm text-[#868A92]">
          Belum punya akun?{" "}
          <Link href="/register" className="text-[#095CE6] font-semibold hover:underline">
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
