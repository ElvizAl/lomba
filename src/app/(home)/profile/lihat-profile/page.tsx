"use client"
import Logout from "@/components/auth/logout";
import Navbar from "@/components/layout/navbar";
import ProfileAvatar from "@/components/profile/profile-avatar";
import { Edit, Fingerprint, Lock, Mail, UserIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { getUserData, updateUserProfile } from "@/utils/user";
import { useEffect } from "react";
import { toast } from "sonner";

interface User {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  cash: {
    balance: number;
    id: string;
  };
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);

  const fetchUser = async () => {
    try {
      const userData = await getUserData();
      setUser(userData);
      setFormData({
        name: userData.user.name,
        email: userData.user.email
      });
      if (userData?.user?.avatar) {
        setAvatarUrl(userData.user.avatar);
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
      toast.error('Gagal memuat data pengguna');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setIsSubmitting(true);
      const updatedUser = await updateUserProfile({
        name: formData.name,
        email: formData.email
      });

      setUser(updatedUser);
      toast.success('Profil berhasil diperbarui');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error instanceof Error ? error.message : 'Gagal memperbarui profil');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="min-h-screen bg-[#FBFCFF] font-sans">
      <Navbar title="Profil Saya" />
      <div className="bg-white pt-6 pb-4 px-4 mb-4">
        <div className="">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nama Usaha</label>
          <div className="flex border-b border-gray-300 items-center gap-2">
            <UserIcon className="w-6 h-6 text-gray-500" />
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border-0 focus:outline-none focus:border-blue-500"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mt-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="flex border-b border-gray-300 items-center gap-2">
              <Mail className="w-6 h-6 text-gray-500" />
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border-0 focus:outline-none focus:border-blue-500"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <small className="text-xs text-gray-500">Perubahan email memerlukan verifikasi ulang</small>
          </div>
          <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t">
            <button
              type="submit"
              disabled={isSubmitting}
              className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full w-full transition-colors disabled:opacity-50 flex justify-center items-center gap-2'
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></span>
                  Menyimpan...
                </>
              ) : 'Simpan'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
