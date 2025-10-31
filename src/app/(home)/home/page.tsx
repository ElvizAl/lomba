"use client";

import { useEffect, useState } from 'react';
import Image from "next/image";
import { getUserData } from "@/utils/user";
import { ArrowLeftRight, BanknoteArrowDown, BanknoteArrowUp, ChartNoAxesColumn, ChevronRight, HandCoins, Scale, Box } from 'lucide-react';
import Link from 'next/link';
import { getHighlightInbox } from '@/utils/inbox';
import Loading from '@/components/ui/loading';

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
  {
    name: 'Kelola Hpp',
    href: '/kelola-hpp',
    icon: Box
  }
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
  const [hInbox, setHInbox] = useState<any>(null);

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

    const fetchHInbox = async () => {
      try {
        const inboxData = await getHighlightInbox();
        setHInbox(inboxData);
      } catch (err) {
        console.error('Error fetching inbox data:', err);
        setError('Failed to load inbox data');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    fetchHInbox();
  }, []);

  if (loading) {
    return (
      <Loading />
    );
  }

  if (hInbox) {
    return (
      <div className="min-h-screen px-6 mx-auto flex items-center justify-center absolute top-0 left-0 right-0 bg-white z-50">
        <div className="text-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={100}
            height={100}
            className="w-12 h-12 absolute top-20 left-6"
            priority
          />
          <div className="flex flex-col items-center">

            <Image
              src={"/img/" + hInbox?.metadata?.image}
              alt="Image"
              width={100}
              height={100}
              className="w-68"
              priority
            />
            <h1 className="text-2xl font-bold mb-4">{hInbox.title}</h1>
            <p className='text-gray-400 text-lg'>{hInbox.content}</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-50 p-4">
          <button
            type="button"
            onClick={e => setHInbox(null)}
            className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full w-full transition-colors disabled:opacity-50'
          >
            Ok, Paham
          </button>
        </div>
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
    <div className='px-4'>
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
            reports.map((report, i) => (
              <Link href={report.href} className='w-full text-center' key={i}>
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
          menus.map((menu, i) => (
            <Link href={menu.href} className='bg-white px-4 py-3 hover:bg-gray-100 rounded border flex items-center justify-between mb-4' key={i}>
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
