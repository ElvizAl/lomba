import Image from "next/image";
import Link from "next/link";
import RegisterForm from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <div className="min-h-screen max-w-sm mx-auto flex flex-col bg-[#FBFCFF] font-sans">
      <div className=" flex my-5 p-4">
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
          <p className="text-2xl font-black">Daftar</p>
          <p className="text-lg text-[#868A92]">Buat Akun untuk menggunakan Glofin</p>
        </div>
      </div>
      
      <RegisterForm />
      
      <div className="flex justify-center mt-4 mb-8">
        <p className="text-sm text-[#868A92]">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-[#095CE6] font-semibold hover:underline">
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
