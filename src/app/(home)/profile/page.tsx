"use client"
import Logout from "@/components/auth/logout";
import Navbar from "@/components/layout/navbar";
import ProfileAvatar from "@/components/profile/profile-avatar";
import { Button } from "@/components/ui/button";
import { Edit, Fingerprint, Lock } from "lucide-react";
import Link from "next/link";
import { getUserData } from "@/utils/user";
import { useEffect, useState } from "react";

interface User {
  name: string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserData();
        setUser(userData);
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-[#FBFCFF] font-sans">
      <Navbar title="Profile" />
      <div className="max-w-sm mx-auto flex flex-col px-4 py-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center mb-5">
          <ProfileAvatar 
            name={user?.name} 
            size="xl" 
            className="mb-2"
          />
          <div className="flex items-center justify-center text-center gap-2 mb-2">
            <h2 className="text-2xl ml-4 font-bold text-gray-900">{user?.name}</h2>
            <button className="p-1 hover:bg-gray-100 rounded-full">
              <Edit className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <Link href="/lihat-profile">
          <Button 
            variant="outline" size="sm"
            className=" text-blue-600 cursor-pointer border-blue-600 hover:bg-blue-50 text-[12px]"
          >
            View Profile
          </Button>
          </Link>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-md  hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 ml-3 bg-blue-100 rounded-full flex items-center justify-center">
                <Fingerprint className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex flex-col">
                <h3 className="font-semibold text-gray-900">Daftarkan Sidik Jari</h3>
                <p className="text-[12px] text-gray-500">Masuk Dengan Sidik Jari</p>
              </div>
            </div>
          </div>
          <Link href="/ganti-password" className="block">
            <div className="bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4 p-4">
                <div className="w-8 h-8 ml-3 bg-blue-100 rounded-full flex items-center justify-center">
                  <Lock className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-semibold text-gray-900">Kata Sandi</h3>
                  <p className="text-[12px] text-gray-500">Ubah Kata Sandi Akun Anda</p>
                </div>
              </div>
            </div>
          </Link>
          <Logout />
        </div>
      </div>
    </div>
  );
}
