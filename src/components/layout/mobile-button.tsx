"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Inbox, ChartNoAxesCombined, User, Plus, ArrowLeftRight, X } from "lucide-react";
import { useState } from "react";
import HCard from "../ui/h-card";

export default function MobileButton() {
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);
  const navigationItems = [
    { name: "Beranda", href: "/home", icon: Home },
    { name: "Laporan", href: "/laporan", icon: ChartNoAxesCombined },
    { main: true, onclick: () => { createTransaction() }, icon: Plus },
    { name: "Inbox", href: "/inbox", icon: Inbox },
    { name: "Profile", href: "/profile", icon: User },
  ];

  const createTransaction = () => {
    setShowMenu(true);
  }

  return (
    <>
      {showMenu ? (
        <div className="fixed inset-0 z-40 w-full">
          <div className="h-screen max-w-md flex items-end justify-center mx-auto" style={{
            background: 'rgb(0,0,0,0.5)'
          }}>
            <div className="w-full max-w-[330px] mb-20">
              <div className="text-right mb-4">
                <button onClick={() => setShowMenu(false)} className="bg-white rounded-full p-2 ml-auto">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="shadow" onClick={() => setShowMenu(false)}>
                <HCard menu={{
                  name: "Buat Pemasukan",
                  href: "/pemasukan",
                  icon: Plus,
                }} i={0} key={0} />
              </div>
              <div className="shadow" onClick={() => setShowMenu(false)}>
                <HCard menu={{
                  name: "Buat Pengeluaran",
                  href: "/pengeluaran",
                  icon: ArrowLeftRight,
                }} i={1} key={1} />
              </div>
            </div>
          </div>
        </div>
      ) : null
      }
      <div className="fixed bottom-5 left-0 right-0 z-50">
        <div className="h-14">
          <div className="max-w-[330px] bg-white rounded-full shadow mx-auto">
            <nav className="flex items-center justify-center text-center py-1">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href || ""));
                const Icon = item.icon;

                return (
                  <>
                    {!item.href ? (
                      <button
                        key={item.name || item.href}
                        onClick={item.onclick}
                        className={`flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 transition-all duration-300 ${item.main
                          ? 'bg-[#1444E3] text-white rounded-full m-1 py-2 px-0 transform hover:scale-110'
                          : isActive
                            ? 'text-[#1444E3] transform scale-110'
                            : 'text-[#1444E3] hover:text-[#1444E3]'
                          }`}
                      >
                        <div className={`relative ${item.main ? 'flex items-center justify-center w-8 h-8' : ''}`}>
                          {isActive && !item.main && (
                            <div className="absolute inset-0 bg-[#1444E3] rounded-full opacity-10" />
                          )}
                          <Icon
                            className={`transition-all duration-300 ${item.main
                              ? 'h-5 w-5 text-white stroke-2'
                              : `h-4 w-4 mb-1 text-[#1444E3] ${isActive ? 'stroke-2 drop-shadow-lg' : 'stroke-1.5'}`
                              }`}
                          />
                        </div>
                        {!item.main && (
                          <span
                            className={`text-xs font-medium transition-all duration-300 ${isActive ? "text-[#1444E3] font-semibold" : "text-[#1444E3]"
                              }`}
                          >
                            {item.name}
                          </span>
                        )}
                      </button>
                    ) : (
                      <Link
                        key={item.name || item.href}
                        href={item.href}
                        className={`flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 transition-all duration-300 ${item.main
                          ? 'bg-[#1444E3] text-white rounded-full m-1 py-2 px-0 transform hover:scale-110'
                          : isActive
                            ? 'text-[#1444E3] transform scale-110'
                            : 'text-[#1444E3] hover:text-[#1444E3]'
                          }`}
                      >
                        <div className={`relative ${item.main ? 'flex items-center justify-center w-8 h-8' : ''}`}>
                          {isActive && !item.main && (
                            <div className="absolute inset-0 bg-[#1444E3] rounded-full opacity-10" />
                          )}
                          <Icon
                            className={`transition-all duration-300 ${item.main
                              ? 'h-5 w-5 text-white stroke-2'
                              : `h-4 w-4 mb-1 text-[#1444E3] ${isActive ? 'stroke-2 drop-shadow-lg' : 'stroke-1.5'}`
                              }`}
                          />
                        </div>
                        {!item.main && (
                          <span
                            className={`text-xs font-medium transition-all duration-300 ${isActive ? "text-[#1444E3] font-semibold" : "text-[#1444E3]"
                              }`}
                          >
                            {item.name}
                          </span>
                        )}
                      </Link>
                    )}
                  </>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}