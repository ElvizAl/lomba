"use client";

import { useEffect, useState } from 'react';
import Image from "next/image";
import { getUserData } from "@/utils/user";
import { ArrowLeftRight, BanknoteArrowDown, BanknoteArrowUp, ChartNoAxesColumn, HandCoins, Scale, Box } from 'lucide-react';
import Link from 'next/link';
import { getHighlightInbox, markAsRead } from '@/utils/inbox';
import Loading from '@/components/ui/loading';
import HCard from '@/components/ui/h-card';
import { User, InboxData } from '@/types';


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
    name: 'Hpp',
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
  const [hInbox, setHInbox] = useState<InboxData | null>(null);

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
        const inboxData: InboxData = await getHighlightInbox();
        setHInbox(inboxData);
      } catch (err) {
        console.error('Error fetching highlight inbox:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    fetchHInbox();
  }, []);

  const understand = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setHInbox(null);
    markAsRead(hInbox?.id || '');
  }

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
              src={"/img/" + (hInbox?.metadata?.image || 'noted.png')}
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
            onClick={e => understand(e)}
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

          <h1 className="text-2xl font-bold ml-2">Hi, {user.user.name}</h1>
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
           <HCard menu={menu} i={i} key={i} />
          ))
        }
      </div>
    </div>
  );
}
