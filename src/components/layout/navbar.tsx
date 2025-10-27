"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

interface NavbarProps {
  title: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  className?: string;
}

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
    <div className={`bg-white px-4 py-3 fixed top-0 z-50 left-0 w-full ${className}`}>
      <div className="relative flex items-center justify-between">
        {showBackButton && (
          <button
            onClick={handleBackClick}
            className="mr-3 p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Kembali"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
        )}

        <h1 className="absolute left-1/2 transform -translate-x-1/2 font-bold text-gray-900 text-lg">
          {title}
        </h1>

        <div className="w-8"></div>
      </div>
    </div>
  );
}
