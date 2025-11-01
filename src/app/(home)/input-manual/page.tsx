"use client"
import Navbar from '@/components/layout/navbar';
import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { submitTransaction } from '@/utils/transaction';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import InputItem from '@/components/ui/input-item';
import { InputItem as InputItemType } from '@/types';

const InputList = () => {
    const router = useRouter();
    const [items, setItems] = useState<InputItemType[]>([
        {
            id: '1',
            keterangan: '',
            nominal: '',
            tanggal: new Date().toISOString().split('T')[0] // Set default to today
        }
    ]);

    const updateItem = (id: string, field: string, value: string) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        );
    };

    const addItem = () => {
        const newItem = {
            id: Date.now().toString(),
            keterangan: '',
            nominal: '',
            tanggal: new Date().toISOString().split('T')[0]
        };
        setItems([...items, newItem]);
    };

    const removeItem = (id: string) => {
        if (items.length > 1) {
            setItems(items.filter(item => item.id !== id));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const category = JSON.parse(localStorage.getItem("kategori") || "{}");
            const type = localStorage.getItem("type");

            const transactions = items.map(item => (
                {
                    type: type,
                    category: category.id,
                    note: item.keterangan,
                    amount: Number(item.nominal),
                    date: item.tanggal,
                }
            ))

            submitTransaction(transactions);

            setItems([{
                id: '1',
                keterangan: '',
                nominal: '',
                tanggal: new Date().toISOString().split('T')[0]
            }]);

            toast.success("Transaksi berhasil disimpan");

            router.push("/riwayat/" + category.id);

        } catch (error) {
            console.error("Error submitting transaction:", error);
        }
    };

    useEffect(() => {
        const transaction = localStorage.getItem("transaction");
        if (transaction) {
            const parsedTransaction = JSON.parse(transaction);
            setItems(parsedTransaction);
        }

        localStorage.removeItem("transaction");
    }, []);

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
                                removeItem={removeItem}
                                isLastItem={index === items.length - 1}
                            />
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={addItem}
                        className='flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 px-4 py-3 rounded-full w-full transition-colors'
                    >
                        <Plus className="w-5 h-5" />
                        Tambahkan Item
                    </button>

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

export default function InputManual() {
    return <InputList />;
}
