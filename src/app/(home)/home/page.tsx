"use client";

import { useEffect, useState } from 'react';
import Image from "next/image";
import { getUserData } from "@/utils/user";
import { ArrowLeftRight, BanknoteArrowDown, BanknoteArrowUp, ChartNoAxesColumn, ChevronRight, HandCoins, Scale } from 'lucide-react';
import Link from 'next/link';

interface User {
  name: string;
}


const reports = [
  {
    name: "Arus Kas",
    href: "/laporan/arus-kas",
    icon: HandCoins,
  },
  {
    name: "Laba Rugi",
    href: "/laporan/laba-rugi",
    icon: ChartNoAxesColumn,
  },
  {
    name: "Neraca",
    href: "/laporan/neraca",
    icon: Scale,
  },
]

const menus = [
  {
    name: "Buat Pemasukan",
    href: "/pemasukan",
    icon: BanknoteArrowUp,
  },
  {
    name: "Buat Pengeluaran",
    href: "/pengeluaran",
    icon: BanknoteArrowDown,
  },
  {
    name: "Riwayat Transaksi",
    href: "/riwayat",
    icon: ArrowLeftRight,
  },
]

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
    <div>
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

          <h1 className="text-2xl font-bold ml-2">Hi, {user.name}</h1>
          <h1 className="text-sm font-semibold ml-2 text-gray-400">Yuk, pantau peforma keuangan Anda</h1>
        </div>
      </div>
      <div className='my-10'>

        <div className="flex gap-4 justify-around">
          {
            reports.map(report => (
              <Link href={report.href} className='w-full text-center'>
                <div className="text-center bg-gradient-to-r from-blue-600 to-blue-400 w-16 h-16 mx-auto rounded-full flex items-center justify-center">
                  <report.icon className="w-7 h-7 text-white" />
                </div>
                <h6 className="text-center text-sm font-semibold mt-2">{report.name}</h6>
              </Link>
            ))
          }
        </div>


      </div>
      <div className='my-10'>
        <h4 className='font-bold'>Aktifitas Keuangan</h4>
        {
          menus.map(menu => (
            <Link href={menu.href} className='bg-white px-4 py-3 hover:bg-gray-100 rounded border flex items-center justify-between mb-4'>
              <div className="flex items-center">
                <div className='bg-gray-50 rounded-full p-3'>
                  <menu.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h6 className='font-semibold text-sm ml-2'>{menu.name}</h6>
              </div>
              <ChevronRight className="w-6 h-6" />
            </Link>
          ))
        }
      </div>
    </div>
  );
}
