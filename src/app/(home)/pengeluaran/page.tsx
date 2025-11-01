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

export default function Pengeluaran() {
    const router = useRouter();
    const onClick = (item: CategoryItem) => {
        localStorage.setItem("type", "debit");
        localStorage.setItem("kategori", JSON.stringify(item));
        router.push("/pindai-struk");
    }
    return (
        <div className="px-4">
            <Navbar title="Buat Pengeluaran" />
            <Kategori title="Pilih Kategori Transaksi" type="pengeluaran" onClick={(item: CategoryItem) => onClick(item)} />
        </div>
    );
}
