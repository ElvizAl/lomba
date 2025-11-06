"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { NavbarProps } from "@/types";

export default function Navbar({
  title,
  showBackButton = true,
  onBackClick,
  className = ""
}: NavbarProps) {
  const router = useRouter();

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      router.back();
    }
  };

  return (
    <div className={`fixed top-0 z-50 left-0 w-full ${className}`}>
      <div className="relative flex items-center justify-between max-w-md bg-white px-4 py-3 mx-auto">
        {showBackButton && (
          <button
            onClick={handleBackClick}
            className="mr-3 p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            aria-label="Kembali"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
        )}

        <h1 className="absolute left-1/2 transform -translate-x-1/2 font-bold text-gray-900 text-md">
          {title}
        </h1>

        <div className="w-8"></div>
      </div>
    </div>
  );
}
