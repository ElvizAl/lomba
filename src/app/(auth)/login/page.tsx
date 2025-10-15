import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Fingerprint, KeyRound, MailOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen max-w-sm mx-auto flex flex-col bg-[#FBFCFF] font-sans">
      <div className=" flex my-5">
        <Image
          src="/logo.png"
          alt="Logo"
          width={100}
          height={100}
          className="w-20 h-20"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col gap-2 ml-6">
          <p className="text-2xl font-black">Masuk</p>
          <p className="text-lg text-[#868A92]">Selamat Datang Kembali</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 ml-6 mr-6 my-10">
        <form>
          <Label htmlFor="email" className="text-sm font-medium mb-2">
            Alamat Email
          </Label>
          <div className="relative">
            <Input
              type="email"
              placeholder="Masukkan alamat email Anda"
              className="pl-12 py-5 bg-white border border-gray-300 shadow-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
            />
            <MailOpen className="absolute left-2.5 top-2.5 h-5 w-5 pointer-events-none text-black" />
          </div>
          <Label htmlFor="email" className="text-sm font-medium mb-2 mt-2">
            Password
          </Label>
          <div className="relative">
            <Input
              type="email"
              placeholder="Masukkan kata sandi Anda"
              className="pl-12 py-5 bg-white border border-gray-300 shadow-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
            />
            <KeyRound className="absolute left-2.5 top-2.5 h-5 w-5 pointer-events-none text-black" />
          </div>
          <Link href="/lupa-password">
            <p className="text-[12px] text-[#095CE6] font-semibold text-right mt-1">
              Lupa Kata Sandi
            </p>
          </Link>
          <div className="mt-6">
            <Button
              type="submit"
              className="w-full bg-[#095CE6] rounded-full py-4 font-semibold"
            >
              Masuk Sekarang
            </Button>
          </div>

          <div className="flex flex-col justify-center mt-6">
            <span className="absolute border-t border-gray-300 w-full"></span>
            <p className=" relative text-[12px] text-center text-[#868A92] font-semibold -top-0 ">
              Atau masuk dengan
            </p>
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              className="w-full bg-[#E6A709] rounded-full py-4 font-semibold"
            >
              <Fingerprint className="w-4 h-4" />
              Sidik Jari
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
