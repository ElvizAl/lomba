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
    <div className={`bg-white border-b border-gray-200 px-4 py-3 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {showBackButton && (
            <button
              onClick={handleBackClick}
              className="mr-3 p-1 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Kembali"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
          )}
        </div>
        
        <h1 className="flex-1 text-center font-semibold text-gray-900 text-lg">
          {title}
        </h1>
        
        {/* Empty div to balance the layout */}
        <div className="w-8"></div>
      </div>
    </div>
  );
}
