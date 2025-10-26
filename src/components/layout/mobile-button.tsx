"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Inbox, ChartNoAxesCombined, User } from "lucide-react";

// Mobile Bottom Navigation Items
const navigationItems = [
  { name: "Beranda", href: "/home", icon: Home },
  { name: "Laporan", href: "/report", icon: ChartNoAxesCombined },
  { name: "Inbox", href: "/inbox", icon: Inbox },
  { name: "Profile", href: "/profile", icon: User },
];

export default function MobileButton() {
  const pathname = usePathname();

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
        <div className="bg-[#1444E3] h-14">
          <div className="max-w-md mx-auto">
            <nav className="flex items-center justify-center text-center py-1">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                const Icon = item.icon;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 transition-all duration-300 ${
                      isActive ? "text-white transform scale-110" : "text-blue-400 hover:text-gray-200"
                    }`}
                  >
                    <div className="relative">
                      {isActive && (
                        <div className="" />
                      )}
                      <Icon
                        className={`h-5 w-5 mb-1 text-white transition-all duration-300 ${
                          isActive ? "stroke-2 drop-shadow-lg" : "stroke-1.5"
                        }`}
                      />
                    </div>
                    <span
                      className={`text-xs font-medium transition-all duration-300 ${
                        isActive ? "text-white font-semibold" : "text-white"
                      }`}
                    >
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}