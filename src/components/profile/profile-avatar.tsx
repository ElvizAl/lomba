"use client";

import { useRef, useState } from "react";
import { User, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { uploadAvatar } from "@/utils/user";
import { toast } from "sonner";
import { ProfileAvatarProps } from "@/types";

export default function ProfileAvatar({ 
  src, 
  name = "User", 
  size = "md",
  className,
  onUploadSuccess
}: ProfileAvatarProps & { onUploadSuccess?: (url: string) => void }) {
  const [imageError, setImageError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-20 h-20 text-lg",
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size should be less than 2MB');
      return;
    }

    try {
      setIsUploading(true);
      const response = await uploadAvatar(file);
      if (onUploadSuccess) {
        onUploadSuccess(response.url); // Assuming the API returns the URL of the uploaded image
      }
      toast.success('Avatar updated successfully');
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast.error('Failed to upload avatar');
    } finally {
      setIsUploading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn(
      "relative group inline-flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white font-semibold cursor-pointer",
      sizeClasses[size],
      className
    )}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        disabled={isUploading}
      />
      
      {isUploading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleClick}
        >
          <Upload className="w-6 h-6 text-white" />
        </div>
      )}
      
      {src && !imageError ? (
        <Image
          src={src}
          alt={name}
          className="w-full h-full rounded-full object-cover"
          width={100}
          height={100}
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
