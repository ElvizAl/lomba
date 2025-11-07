"use client";

import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/navbar';
import { Plus, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { getProductCosts, saveProductCosts } from '@/utils/product-cost';
import { ProductCost } from '@/types';
import BottomButton from '@/components/ui/bottom-button';

export default function HPPPage() {
    const [productCosts, setProductCosts] = useState<ProductCost[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const fetchProductCosts = async () => {
        try {
            const items = await getProductCosts();
            setProductCosts(items);
        } catch (error) {
            console.error('Error fetching product costs:', error);
            toast.error('Gagal memuat data HPP');
        } finally {
            setLoading(false);
        }
    };

    const addItem = () => {
        const newItem: ProductCost = {
            id: `new-${Date.now()}`,
            name: '',
            cost: '0',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
        setProductCosts(prev => [...prev, newItem]);
    };

    const handleDelete = async (id?: string, index?: number) => {
        if (id?.startsWith('new-') || !id) {
            if (typeof index === 'number') {
                const updated = [...productCosts];
                updated.splice(index, 1);
                setProductCosts(updated);
                toast.info('Item baru dihapus dari daftar (belum tersimpan ke server)');
            }
            return;
        }

        try {
            await deleteProductCost(id);
            toast.success('Data HPP berhasil dihapus dari server');
        } catch (error) {
            console.error('Error deleting product cost:', error);
            toast.error(error instanceof Error ? error.message : 'Gagal menghapus data HPP');
            fetchProductCosts();
        }
    };

    const deleteProductCost = async (id: string) => {
        try {
            setProductCosts(prev => prev.filter(item => item.id !== id));
            toast.success('Data HPP berhasil dihapus dari server');
        } catch (error) {
            console.error('Error deleting product cost:', error);
            toast.error(error instanceof Error ? error.message : 'Gagal menghapus data HPP');
            fetchProductCosts();
        }
    };

    const saveAll = async () => {
        setIsSaving(true);
        try {
            const updatedProductCosts = productCosts.map((cost: ProductCost) => {
                return { name: cost.name, cost: cost.cost };
            });
            await saveProductCosts(updatedProductCosts);
            toast.success("Data HPP berhasil disimpan");
            fetchProductCosts();
        } catch (error) {
            console.error(error);
            toast.error(error instanceof Error ? error.message : "Terjadi kesalahan saat menyimpan");
        } finally {
            setIsSaving(false);
        }
    };

    useEffect(() => {
        fetchProductCosts();
    }, []);


    return (
        <div className="min-h-screen bg-gray-50 pt-10">
            <Navbar title="Kelola HPP" />

            <div className="p-4 max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <p className="text-sm font-semibold text-gray-400">
                        Masukkan Biaya Produk pada Usaha Anda
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                    </div>
                ) : productCosts.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
                        <p className="text-gray-500">Belum ada data HPP</p>
                        <p className="text-sm text-gray-400 mt-2">
                            Klik tombol &quot;Tambah HPP&quot; untuk menambahkan data baru
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {productCosts.map((cost, index) => (
                            <div
                                key={cost.id || `new-${index}`}
                                className="bg-white rounded-lg shadow-sm border p-4 gap-4 flex justify-between items-center"
                            >
                                <div className="w-full">
                                    <input
                                        type="text"
                                        placeholder="Nama"
                                        className="w-full outline-none focus:border-blue-600 border-b py-2"
                                        value={cost.name}
                                        onChange={(e) => {
                                            const newItems = [...productCosts];
                                            newItems[index] = {
                                                ...newItems[index],
                                                name: e.target.value,
                                            };
                                            setProductCosts(newItems);
                                        }}
                                    />
                                    <div className="flex items-center gap-2 mt-3">
                                        <span>Rp</span>
                                        <input
                                            type="text"
                                            placeholder="Biaya"
                                            className="w-full outline-none focus:border-blue-600 border-b py-2"
                                            value={
                                                cost.cost
                                                    ? new Intl.NumberFormat('id-ID').format(
                                                        Number(cost.cost)
                                                    )
                                                    : ''
                                            }
                                            onChange={(e) => {
                                                const numericValue = e.target.value.replace(/\D/g, '');
                                                const newItems = [...productCosts];
                                                newItems[index] = {
                                                    ...newItems[index],
                                                    cost: numericValue,
                                                };
                                                setProductCosts(newItems);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        type="button"
                                        onClick={() => handleDelete(cost.id, index)}
                                        className="h-8 w-8"
                                    >
                                        <Trash className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <button
                    type="button"
                    onClick={addItem}
                    className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 px-4 py-3 rounded-full w-full transition-colors mt-3"
                >
                    <Plus className="w-5 h-5" />
                    Tambahkan Item
                </button>

                <BottomButton
                    onSubmit={saveAll}
                    isSubmitting={isSaving}
                    isFormValid={true}
                    text="Simpan Semua"
                />
            </div>
        </div>
    );
}