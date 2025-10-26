"use client";
import Kategori from '@/components/kategori/page';
import Navbar from '@/components/layout/navbar';
import { useRouter } from 'next/navigation';
// import { DatePicker } from '@mantine/dates';
// import { Button } from '@mantine/core';
// import { PlusIcon } from '@modulz/radix-icons';

export default function Riwayat() {
    const router = useRouter();
    const onClick = (item: any) => {
        localStorage.setItem("kategori", JSON.stringify(item));
        router.push("/riwayat/" + item.id);
    }
    return (
        <>
            <Navbar title="Pilih Kategori" />
            <Kategori title="Pilih Kategori Transaksi" type="riwayat" onClick={(item: any) => onClick(item)} />
        </>
    );
}
