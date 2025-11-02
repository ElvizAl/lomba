"use client";
import Kategori from '@/components/kategori/page';
import Navbar from '@/components/layout/navbar';
import { useRouter } from 'next/navigation';
// import { DatePicker } from '@mantine/dates';
// import { Button } from '@mantine/core';
// import { PlusIcon } from '@modulz/radix-icons';

interface CategoryItem {
    id: string;
    name: string;
    type?: string;
    balance?: number;
    [key: string]: unknown;
}

export default function Pemasukan() {
    const router = useRouter();
    const onClick = (item: CategoryItem) => {
        localStorage.setItem("type", "credit");
        localStorage.setItem("kategori", JSON.stringify(item));
        router.push("/pindai-struk");
    }
    return (
        <div className="px-4">
            <Navbar title="Buat Pemasukan" />
            <Kategori title="Pilih Kategori Transaksi" type="pemasukan" onClick={(item: CategoryItem) => onClick(item)} />
        </div>
    );
}
