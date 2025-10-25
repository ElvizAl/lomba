"use client";

import { useEffect, useState } from 'react';
import Image from "next/image";
import { getUserData } from "@/utils/user";
import { ArrowLeftRight, BanknoteArrowDown, BanknoteArrowUp, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface User {
  name: string;
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData: User = await getUserData();
        setUser(userData);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen max-w-sm mx-auto flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen max-w-sm mx-auto flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen max-w-sm mx-auto flex items-center justify-center">
        No user data available
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-sm bg-[#FBFCFF] font-sans px-4 pt-10">
      <div className="flex my-5 items-center">
        <Image
          src="/logo.png"
          alt="Logo"
          width={100}
          height={100}
          className="w-12 h-12"
          priority
        />
        <div>

          <h1 className="text-2xl font-bold ml-2">Hello, {user.name}</h1>
          <h1 className="text-sm font-semibold ml-2 text-gray-400">Yuk, pantau peforma keuangan Anda</h1>
        </div>
      </div>
      <div className='my-10'>

        <div className="flex gap-4 justify-around">
          <div className='w-full text-center'>
            <div className="text-center bg-gradient-to-r from-blue-600 to-blue-400 w-18 h-18 mx-auto rounded-full">
            </div>
            <h6 className="text-center font-semibold mt-2">Neraca</h6>
          </div>
          <div className='w-full text-center'>
            <div className="text-center bg-gradient-to-r from-blue-600 to-blue-400 w-18 h-18 mx-auto rounded-full">
            </div>
            <h6 className="text-center font-semibold mt-2">Laba Rugi</h6>
          </div>
          <div className='w-full text-center'>

            <div className="text-center bg-gradient-to-r from-blue-600 to-blue-400 w-18 h-18 mx-auto rounded-full">
            </div>
            <h6 className="text-center font-semibold mt-2">Arus Kas</h6>
          </div>
        </div>

      </div>
      <div className='my-10'>
        <h4 className='font-bold'>Aktifitas Keuangan</h4>
        <Link href="/pemasukan" className='bg-white px-4 py-4 rounded border flex items-center justify-between mb-4'>
          <div className="flex items-center">
            <div className='bg-gray-50 rounded-full p-3'>
              <BanknoteArrowUp className="w-8 h-8 text-blue-600" />
            </div>
            <h6 className='font-semibold text-lg ml-2'>Buat Pemasukan</h6>
          </div>
          <ChevronRight className="w-6 h-6" />
        </Link>

        <Link href="/pemasukan" className='bg-white px-4 py-4 rounded border flex items-center justify-between mb-4'>
          <div className="flex items-center">
            <div className='bg-gray-50 rounded-full p-3'>
              <BanknoteArrowDown className="w-8 h-8 text-blue-600" />
            </div>
            <h6 className='font-semibold text-lg ml-2'>Buat Pengeluaran</h6>
          </div>
          <ChevronRight className="w-6 h-6" />
        </Link>

        <Link href="/pemasukan" className='bg-white px-4 py-4 rounded border flex items-center justify-between mb-4'>
          <div className="flex items-center">
            <div className='bg-gray-50 rounded-full p-3'>
              <ArrowLeftRight className="w-8 h-8 text-blue-600" />
            </div>
            <h6 className='font-semibold text-lg ml-2'>Riwayat Transaksi</h6>
          </div>
          <ChevronRight className="w-6 h-6" />
        </Link>
      </div>
    </div>
    </div>
  );
}
