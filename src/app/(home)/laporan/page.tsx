"use client";
import Navbar from "@/components/layout/navbar";
import { ChevronRight, HandCoins, ChartNoAxesColumn, Scale } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getUserData } from "@/utils/user";
import Loading from "@/components/ui/loading";
import { numberWithCommas } from "@/utils";
import HCard from "@/components/ui/h-card";

interface User {
  user: {
    name: string;
  };
  cash: {
    balance: number;
    id: string;
  };
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

export default function Report() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData: User = await getUserData();
        console.log(userData);
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
      <Loading />
    );
  }

  return (
    <>
      <Navbar title="Laporan" />
      <div className="pt-5 px-4">
        <div className="mb-5">
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl shadow-sm p-6">
            <h2 className="text-sm font-semibold text-blue-200 mb-2">Saldo Kas</h2>
            <h2 className="text-2xl font-semibold text-white mb-4">Rp {numberWithCommas(user?.cash?.balance || 0)}</h2>
          </div>
          <div className="bg-white rounded mx-3 shadow-sm flex justify-between items-center text-sm -mt-5 px-6 py-3">
            <h6>Cek Riwayat</h6>
            <Link href={"/riwayat/" + user?.cash?.id} className="text-blue-600 hover:text-blue-700">Lihat Disini</Link>
          </div>
        </div>
        {reports.map((report) => (
          <HCard menu={report} i={reports.indexOf(report)} key={reports.indexOf(report)} />
        ))}
      </div>
    </>
  );
}
