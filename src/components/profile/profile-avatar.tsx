"use client";

import { useState } from "react";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileAvatarProps {
  src?: string;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export default function ProfileAvatar({ 
  src, 
  name = "User", 
  size = "md",
  className 
}: ProfileAvatarProps) {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-16 h-16 text-lg",
    lg: "w-24 h-24 text-2xl",
    xl: "w-32 h-32 text-3xl"
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className={cn(
      "relative inline-flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold",
      sizeClasses[size],
      className
    )}>
      {src && !imageError ? (
        <img
          src={src}
          alt={name}
          className="w-full h-full rounded-full object-cover"
          onError={handleImageError}
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          {name ? (
            <span className="font-bold">{getInitials(name)}</span>
          ) : (
            <User className="w-1/2 h-1/2" />
          )}
        </div>
      )}
    </div>
  );
}
