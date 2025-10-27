
import Navbar from "@/components/layout/navbar";
import { ChevronRight, HandCoins, ChartNoAxesColumn, Scale } from "lucide-react";
import Link from "next/link";

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
  return (
    <>
      <Navbar title="Laporan" />
      <div className="pt-5">
        <div className="mb-5">
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl shadow-sm p-6">
            <h2 className="text-sm font-semibold text-blue-200 mb-2">Saldo Kas</h2>
            <h2 className="text-2xl font-semibold text-white mb-4">Rp. 0</h2>
          </div>
          <div className="bg-white rounded mx-3 shadow-sm flex justify-between items-center text-sm -mt-5 px-6 py-3">
            <h6>Cek Riwayat</h6>
            <Link href="" className="text-blue-600 hover:text-blue-700">Lihat Disini</Link>
          </div>
        </div>
        {reports.map((report) => (
          <Link href={report.href} className="bg-white rounded-lg px-3 py-3 border block mb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-gray-50 p-2 rounded">
                  <report.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-sm font-semibold ml-3">{report.name}</h2>
              </div>
              <ChevronRight className="w-6 h-6" />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
