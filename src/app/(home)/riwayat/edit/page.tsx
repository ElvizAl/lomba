"use client"
import Navbar from "@/components/layout/navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { InputItem as InputItemType, Transaction } from "@/types";
import InputItem from "@/components/ui/input-item";
import { updateTransaction } from "@/utils/transaction";

export default function Edit() {
    const router = useRouter();
    const [items, setItems] = useState<InputItemType[]>([]);

    const updateItem = (id: string, field: string, value: string) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const category = JSON.parse(localStorage.getItem("kategori") || "{}");
            const type = localStorage.getItem("type");

            const transactions = items.map(item => (
                {
                    id: item.id,
                    type: type,
                    category: category.id,
                    note: item.keterangan,
                    amount: Number(item.nominal),
                    date: item.tanggal,
                }
            ))

            updateTransaction(transactions);

            router.push("/riwayat/" + category.id);
        } catch (error) {
            console.error("Error submitting transaction:", error);
        }
    };

    useEffect(() => {
        (
            async () => {
                const transactions = await JSON.parse(localStorage.getItem("selectedTransaction") || "[]");
                const displayItems = await transactions.map((transaction: Transaction) => {
                    return {
                        id: transaction.id,
                        keterangan: transaction.note,
                        nominal: transaction.amount.toString(),
                        tanggal: transaction.createdAt
                    }
                })
                setItems(displayItems)
            }
        )()
    }, [])

    const isFormValid = items.some(item => item.keterangan && item.nominal && item.tanggal);

    return (
        <div className="min-h-screen bg-gray-50 px-4">
            <Navbar title="Input Manual" />
            <div className="pt-6 pb-24">
                <form onSubmit={handleSubmit} className='mt-6 max-w-md mx-auto'>
                    <div id="inputWrapper" className="mb-5">
                        {items.map((item, index) => (
                            <InputItem
                                key={item.id}
                                id={item.id}
                                item={item}
                                updateItem={updateItem}
                                isLastItem={index === items.length - 1}
                            />
                        ))}
                    </div>

                    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t">
                        <button
                            type="submit"
                            className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full w-full transition-colors disabled:opacity-50'
                            disabled={!isFormValid}
                        >
                            Simpan Semua
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};