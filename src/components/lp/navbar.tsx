import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center px-6 lg:px-20 py-4 fixed top-0 w-full z-50">
            <div className="flex items-center gap-2">
                <Image width={100} height={100} src="/logo.png" className="h-14" alt="Glofin" />
                <span className="font-bold text-2xl">Glofin</span>
            </div>
            <ul className="hidden lg:flex gap-6 text-gray-700">
                <li>Home</li>
                <li>Pages</li>
                <li>Resources</li>
                <li>Pricing</li>
            </ul>
            <div className="flex gap-3">
                <Link href={"/login"} className="px-4 py-2 bg-black text-white rounded-full">
                    Buka Aplikasi
                </Link>
                <Link href={"/register"} className="px-4 py-2 border border-gray-300 rounded-full">
                    Daftar Gratis
                </Link>
            </div>
        </nav>
    );
}
