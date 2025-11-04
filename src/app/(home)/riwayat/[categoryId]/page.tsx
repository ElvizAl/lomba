"use client"
import Navbar from '@/components/layout/navbar';
import React, { useCallback, useEffect, useState } from 'react';
import { deleteTransaction, getTransaction } from '@/utils/transaction';
import { getCategory } from '@/utils/category';
import { numberWithCommas } from '@/utils';
import { format, type Locale } from 'date-fns';
import { id } from 'date-fns/locale';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ListFilter, Trash, XIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/ui/date-picker';
import Loading from '@/components/ui/loading';
import { Transaction } from '@/types';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function Riwayat({ params }: { params: Promise<{ categoryId: string }> }) {
    const { categoryId } = React.use(params)

    const router = useRouter();

    const [category, setCategory] = useState({ name: "", balance: 0, total_debit: 0, total_kredit: 0 });

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedTransaction, setSelectedTransaction] = useState<Array<string>>([]);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [filters, setFilters] = useState<{
        startDate: Date | null;
        endDate: Date | null;
    }>({
        startDate: null,
        endDate: null
    });

    const loadTransactions = useCallback(async () => {
        const data = await getTransaction({
            page: 1,
            limit: 10,
            note: "",
            start_date: filters.startDate ? format(filters.startDate, 'yyyy-MM-dd') : "",
            end_date: filters.endDate ? format(filters.endDate, 'yyyy-MM-dd') : "",
            categoryId: categoryId
        })
        setTransactions(data)
    }, [categoryId, filters.startDate, filters.endDate])

    useEffect(() => {
        const loadCategory = async () => {
            const data = await getCategory({
                page: 1,
                limit: 10,
                name: "",
                start_date: "",
                end_date: "",
                id: categoryId,
                state: "riwayat"
            } )
            setCategory(data[0])
            setLoading(false);
        }

        loadCategory()
    }, [categoryId])

    useEffect(() => {
        loadTransactions()
    }, [loadTransactions])

    const selectTransaction = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const transactionId = card.dataset.id as string;

        setSelectedTransaction(prevIds => {
            const isSelected = prevIds.includes(transactionId);
            return isSelected
                ? prevIds.filter(id => id !== transactionId)
                : [...prevIds, transactionId];
        });
    }

    const handleDeleteTransactions = async () => {
        try {
            await deleteTransaction(selectedTransaction);
            setLoading(true);
            setSelectedTransaction([]);
            setIsDeleteDialogOpen(false);
            toast.success('Transaksi berhasil dihapus');
        } catch (error) {
            console.error('Error deleting transactions:', error);
            toast.error('Gagal menghapus transaksi');
        }
        setLoading(false);
        loadTransactions();
    };

    const editTransactions = () => {
        const selectedTransactions = transactions.filter((transaction) => selectedTransaction.includes(transaction.id));
        localStorage.setItem('selectedTransaction', JSON.stringify(selectedTransactions));
        router.push(`/riwayat/edit`);
    }

    useEffect(() => {
        const cards = document.querySelectorAll('[data-id]');
        cards.forEach(card => {
            const htmlElement = card as HTMLElement;
            const isSelected = selectedTransaction.includes(htmlElement.dataset.id || '');
            htmlElement.classList.toggle('bg-blue-100', isSelected);
            htmlElement.classList.toggle('bg-white', !isSelected);
            htmlElement.dataset.select = String(isSelected);
        });
    }, [selectedTransaction]);


    if (loading) {
        return (
            <Loading />
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar title={category.name} />
            <div className="pt-8 pb-4 bg-white px-4">
                <h6 className='text-gray-400 text-sm mb-2'>
                    Saldo
                </h6>
                <h2 className='font-semibold text-2xl mb-5'>
                    Rp {(category.balance < 0 ? '(' : '') + numberWithCommas(Math.abs(category.balance)) + (category.balance < 0 ? ')' : '')}
                </h2>
                <div className="flex">
                    <div className='w-1/2'>
                        <h6 className='text-gray-400 text-sm mb-2'>
                            Debit
                        </h6>
                        <h2 className='font-semibold text-xl'>
                            Rp {numberWithCommas(category.total_debit)}
                        </h2>
                    </div>
                    <div className='w-1/2'>
                        <h6 className='text-gray-400 text-sm mb-2'>
                            Kredit
                        </h6>
                        <h2 className='font-semibold text-xl'>
                            Rp {numberWithCommas(category.total_kredit)}
                        </h2>
                    </div>
                </div>
            </div>
            <div className='my-3 flex px-4'>
                <Input
                    type="text"
                    name="note"
                    placeholder="Cari Transaksi"
                    className="py-5 bg-white border border-gray-300 focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                />

                <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                    <DialogTrigger asChild>
                        <Button
                            type="button"
                            size="lg"
                            className="bg-[#095CE6] rounded-md ml-2 py-4 font-semibold disabled:opacity-50"
                            onClick={() => setIsFilterOpen(true)}
                        >
                            <ListFilter className="h-5 w-5" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] h-auto rounded-2xl">
                        <div className="flex flex-col gap-4 py-4 h-auto">
                            <div className="flex gap-4 h-auto">
                                <div className="flex-1 space-y-2">
                                    <Label htmlFor="startDate">Dari Tanggal</Label>
                                    <DatePicker
                                        id="startDate"
                                        selected={filters.startDate}
                                        onChange={(date: Date | null) => setFilters({ ...filters, startDate: date })}
                                        selectsStart
                                        startDate={filters.startDate}
                                        endDate={filters.endDate}
                                        maxDate={filters.endDate || new Date()}
                                        placeholderText="Pilih tanggal awal"
                                        className="w-1/2"
                                    />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <Label htmlFor="endDate">Sampai Tanggal</Label>
                                    <DatePicker
                                        id="endDate"
                                        selected={filters.endDate}
                                        onChange={(date: Date | null) => setFilters({ ...filters, endDate: date })}
                                        selectsEnd
                                        startDate={filters.startDate}
                                        endDate={filters.endDate}
                                        minDate={filters.startDate}
                                        maxDate={new Date()}
                                        placeholderText="Pilih tanggal akhir"
                                        className="w-full"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2 pt-2">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => {
                                        setFilters({ startDate: null, endDate: null });
                                    }}
                                >
                                    Reset
                                </Button>
                                <Button
                                    className="flex-1 bg-[#095CE6]"
                                    onClick={() => {
                                        loadTransactions();
                                        setIsFilterOpen(false);
                                    }}
                                >
                                    Terapkan
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

            </div>
            <div className='px-4'>

                {/* badge filter */}
                {
                    filters.startDate || filters.endDate ? (
                        <div className="p-2 bg-white border rounded-full text-xs flex items-center gap-2 w-fit">
                            <XIcon className="h-4 w-4 cursor-pointer" onClick={() => setFilters({ startDate: null, endDate: null })} />
                            {filters.startDate && format(filters.startDate, 'dd MMM yyyy')}
                            <span className="px">-</span>
                            {filters.endDate && format(filters.endDate, 'dd MMM yyyy')}
                        </div>
                    ) : null
                }
            </div>
            <div className="px-4">
                {
                    transactions.length ? transactions.map((transaction, i) => (
                        <div className='rounded bg-white mb-3 p-4 border' key={i} data-select='false' data-id={transaction.id} onClick={e => selectTransaction(e)}>
                            <div className="flex justify-between items-center">
                                <div>
                                    <h5 className="font-medium text-gray-900">{transaction.note}</h5>
                                    <p className="text-sm text-gray-500">
                                        {format(new Date(transaction.createdAt), 'EEEE, d MMMM yyyy', { locale: id as unknown as Locale })}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className={`font-medium text-sm text-green-600`}>
                                        Rp {(transaction.type === 'credit' ? '(' : '') + numberWithCommas(transaction.amount) + (transaction.type === 'credit' ? ')' : '')}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {format(new Date(transaction.createdAt), 'HH:mm', { locale: id })} WIB
                                    </p>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="text-center py-8 text-gray-500">
                            Tidak ada transaksi
                        </div>
                    )
                }
            </div>
            <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-4 bg-white border-t">
                <div className='flex items-center gap-2'>
                    <button
                        onClick={() => editTransactions()}
                        className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full w-full transition-colors disabled:opacity-50'
                        disabled={selectedTransaction.length === 0}
                    >
                        Edit Transaksi ({selectedTransaction.length})
                    </button>
                    <button
                        type="submit"
                        className='bg-red-600 hover:bg-red-700 text-white px-3 py-3 rounded-full transition-colors disabled:opacity-50'
                        disabled={selectedTransaction.length === 0}
                        onClick={() => setIsDeleteDialogOpen(true)}
                    >
                        <Trash />
                    </button>
                </div>
            </div>

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent className="sm:max-w-md rounded-2xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle className='text-center'>
                            Hapus Transaksi
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-center">
                            Apakah Anda yakin ingin menghapus {selectedTransaction.length} transaksi yang dipilih?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex sm:justify-center gap-2">
                        <div className="flex">
                            <AlertDialogCancel
                                className="w-1/2"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsDeleteDialogOpen(false);
                                }}
                            >
                                Kembali
                            </AlertDialogCancel>
                            <AlertDialogAction
                                className="w-1/2 bg-blue-600 hover:bg-blue-700"
                                onClick={handleDeleteTransactions}
                            >
                                Ya, Hapus
                            </AlertDialogAction>
                        </div>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};
