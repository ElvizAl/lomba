"use client";

import {
  BadgeDollarSign,
  Banknote,
  ChartColumn,
  ChartLine,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  email_verified: boolean;
}

interface UserResponse {
  status: string;
  data: {
    user: User;
  };
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const possibleKeys = [
          "token",
          "authToken",
          "accessToken",
          "jwt",
          "auth_token",
        ];
        let token = null;

        for (const key of possibleKeys) {
          const value = localStorage.getItem(key);
          if (value) {
            token = value;
            break;
          }
        }

        const headers: HeadersInit = {
          "Content-Type": "application/json",
        };

        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch("http://95.217.188.76:3030/api/user", {
          method: "GET",
          headers,
        });

        if (response.status === 401) {
          if (token) {
            const newHeaders = {
              "Content-Type": "application/json",
              Authorization: token,
            };

            const retryResponse = await fetch(
              "http://95.217.188.76:3030/api/user",
              {
                method: "GET",
                headers: newHeaders,
              }
            );

            if (retryResponse.ok) {
              const data: UserResponse = await retryResponse.json();
              if (data.status === "success") {
                setUser(data.data.user);
                return;
              }
            }
          }

          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: UserResponse = await response.json();

        if (data.status === "success") {
          setUser(data.data.user);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="bg-[#FBFCFF]">
      <div className="min-h-screen max-w-sm mx-auto  flex flex-col  font-sans">
        <div className="flex my-5">
          <Image
            src="/logo.png"
            alt="Logo"
            width={100}
            height={100}
            className="w-20 h-20"
          />
          <div className="mt-4 flex flex-col flex-1">
            <p className="text-xl font-black">
              Hi, {loading ? "..." : user?.name || "User"}
            </p>
            <p className="text-[12px] text-[#868A92]">
              Yuk, performa keuanganmu di sini!
            </p>
          </div>
          {user?.avatar && (
            <div className="mt-2">
              <Image
                src={user.avatar}
                alt="User Avatar"
                width={50}
                height={50}
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
          )}
        </div>
        <div className="flex justify-between mt-4 mx-6">
          <div className="flex space-x-6">
            <div className="cursor-pointer">
              <button className="bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 rounded-full py-4 px-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Banknote className="w-8 h-8 text-white" />
              </button>
              <p className="text-center text-sm text-black font-bold mt-2">
                Neraca
              </p>
            </div>
            <div>
              <button className="bg-gradient-to-br from-blue-500 to-blue-700 hover:from-green-600 hover:to-green-800 rounded-full py-4 px-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <ChartLine className="w-8 h-8 text-white" />
              </button>
              <p className="text-center text-sm text-black font-bold mt-2">
                Laba Rugi
              </p>
            </div>
            <div>
              <button className="bg-gradient-to-br from-blue-500 to-blue-700 hover:from-purple-600 hover:to-purple-800 rounded-full py-4 px-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <BadgeDollarSign className="w-8 h-8 text-white" />
              </button>
              <p className="text-center text-sm text-black font-bold mt-2">
                Arus Kas
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-7">
          <p className="text-sm text-black font-bold ml-4">
            Aktivitas Keuangan
          </p>
          <div className="flex flex-col space-y-2 mx-2 mt-3">
            <div className="bg-white border px-2 py-3 border-gray-200 rounded-md w-full  hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                  <ChartColumn className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-sm font-bold text-gray-900">
                    Buat Pemasukan
                  </h3>
                </div>
                <div className="ml-auto">
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                </div>
              </div>
            </div>
            <div className="bg-white border px-2 py-3 border-gray-200 rounded-md w-full  hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                  <ChartColumn className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-sm font-bold text-gray-900">
                    Buat Pengeluaran
                  </h3>
                </div>
                <div className="ml-auto">
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                </div>
              </div>
            </div>
            <div className="bg-white border px-2 py-3 border-gray-200 rounded-md w-full  hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                  <ChartColumn className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-sm font-bold text-gray-900">
                    Riwayat Transaksi
                  </h3>
                </div>
                <div className="ml-auto">
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
