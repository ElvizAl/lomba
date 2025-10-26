"use client"
import Navbar from '@/components/layout/navbar';
import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { submitTransaction } from '@/utils/transaction';
import { toast } from 'sonner';
import router from 'next/router';

interface InputItem {
    id: string;
    keterangan: string;
    nominal: string;
    tanggal: string;
}

const InputItem = ({
    id,
    item,
    updateItem,
    removeItem,
    isLastItem
}: {
    id: string;
    item: InputItem;
    updateItem: (id: string, field: string, value: string) => void;
    removeItem: (id: string) => void;
    isLastItem: boolean;
}) => {
    return (
        <div className="relative flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm border mb-3">
            <div className="flex-1 flex flex-col gap-3">
                <div className="absolute right-4 top-4">
                    {!isLastItem && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                removeItem(id);
                            }}
                            className="text-gray-400 hover:text-red-500 flex items-center gap-1"
                        >
                            <X className="w-5 h-5" />
                            <small>Hapus</small>
                        </button>
                    )}
                </div>
                <div className="relative">
                    <input
                        type="date"
                        value={item.tanggal || ''}
                        onChange={(e) => updateItem(id, 'tanggal', e.target.value)}
                        className='w-full p-2 border-b focus:outline-none focus:border-blue-500'
                    />
                </div>
                <input
                    type="text"
                    value={item.keterangan}
                    placeholder='Keterangan'
                    onChange={(e) => updateItem(id, 'keterangan', e.target.value)}
                    className='w-full p-2 border-b focus:outline-none focus:border-blue-500'
                />
                <div className="relative">
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500">Rp</span>
                    <input
                        type="text"
                        value={item.nominal ? new Intl.NumberFormat('id-ID').format(Number(item.nominal)) : ''}
                        placeholder='0'
                        onChange={(e) => updateItem(id, 'nominal', e.target.value.replace(/\D/g, ''))}
                        className='w-full p-2 pl-8 border-b focus:outline-none focus:border-blue-500 text-right text-lg font-medium'
                    />
                </div>
            </div>
        </div>
    );
};

const InputList = () => {
    const [items, setItems] = useState<InputItem[]>([
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
            tanggal: new Date().toISOString().split('T')[0] // Set default to today for new items
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

            router.push("/kategori/" + category.id);

        } catch (error) {
            console.error("Error submitting transaction:", error);
        }
    };

    const isFormValid = items.some(item => item.keterangan && item.nominal && item.tanggal);

    return (
        <div className="min-h-screen bg-gray-50">
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
