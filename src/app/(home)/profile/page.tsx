"use client"
import Logout from "@/components/auth/logout";
import Navbar from "@/components/layout/navbar";
import ProfileAvatar from "@/components/profile/profile-avatar";
import { Edit, Fingerprint, Lock } from "lucide-react";
import Link from "next/link";
import { getUserData } from "@/utils/user";
import { useEffect, useState } from "react";
import Loading from "@/components/ui/loading";
import { toast } from "sonner";
import HCard from "@/components/ui/h-card";

interface User {
  user: {
    name: string;
    avatar?: string;
  };
  cash: {
    balance: number;
    id: string;
  };
}

const menus = [
  {
    name: "Sidik Jari",
    href: "/profile/sidik-jari",
    description: "Ganti sidik jari Anda",
    icon: Fingerprint,
  },
  {
    name: "Kata Sandi",
    href: "/ganti-password",
    description: "Ganti kata sandi Anda",
    icon: Lock,
  },
]

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);

  const fetchUser = async () => {
    try {
      const userData = await getUserData();
      setUser(userData);
      if (userData?.user?.avatar) {
        setAvatarUrl(userData.user.avatar);
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
      toast.error('Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleAvatarUploadSuccess = (newAvatarUrl: string) => {
    setAvatarUrl(newAvatarUrl);
    if (user) {
      setUser({
        ...user,
        user: {
          ...user.user,
          avatar: newAvatarUrl
        }
      });
    }
  };

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <>
      <Navbar title="Profile" />
      <div className="flex flex-col items-center text-center my-5 px-4">
        <div className="relative group">
          <ProfileAvatar
            src={avatarUrl}
            name={user?.user.name}
            size="xl"
            className="mb-2"
            onUploadSuccess={handleAvatarUploadSuccess}
          />
        </div>
        <div className="flex items-center justify-center text-center gap-2 mb-2">
          <h2 className="text-2xl ml-4 font-bold text-gray-900">{user?.user.name}</h2>
        </div>
        <Link href="/profile/lihat-profile">
          <button
            className=" text-black border rounded-md px-2 py-1 bg-white cursor-pointer border-black hover:bg-blue-50 text-[12px]"
          >
            View Profile
          </button>
        </Link>
      </div>

      <div className="space-y-4">
        {menus.map((menu, i) => (
          <HCard menu={menu} i={menus.indexOf(menu)} key={menus.indexOf(menu)} />
        ))}
        <Logout />
      </div>
    </>
  );
}
