"use client"
import Navbar from '@/components/layout/navbar';
import React, { useEffect, useState } from 'react';
import { getTransaction, submitTransaction } from '@/utils/transaction';
import { getCategory } from '@/utils/category';
import { numberWithCommas } from '@/utils';
import { format, parseISO, type Locale } from 'date-fns';
import { id } from 'date-fns/locale';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge, ListFilter, X, XIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/ui/date-picker';
import Loading from '@/components/ui/loading';
import { Transaction } from '@/types';

export default function Riwayat({ params }: { params: Promise<{ categoryId: string }> }) {
    const { categoryId } = React.use(params)

    const [category, setCategory] = useState({ name: "", balance: 0, total_debit: 0, total_kredit: 0 });
  
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState<{
        startDate: Date | null;
        endDate: Date | null;
    }>({
        startDate: null,
        endDate: null
    });

    const loadTransactions = async () => {
        const data = await getTransaction({
            page: 1,
            limit: 10,
            note: "",
            start_date: filters.startDate ? format(filters.startDate, 'yyyy-MM-dd') : "",
            end_date: filters.endDate ? format(filters.endDate, 'yyyy-MM-dd') : "",
            categoryId: categoryId
        })
        setTransactions(data)
    }

    useEffect(() => {


        const loadCategory = async () => {
            const data = await getCategory({
                page: 1,
                limit: 10,
                name: "",
                start_date: "",
                end_date: "",
                id: categoryId
            })
            setCategory(data[0])
            setLoading(false);
        }

        loadCategory()
        loadTransactions()
    }, [])

    useEffect(() => {
        loadTransactions()
    }, [filters])

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
                                        className="w-full"
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
                        <div className='rounded bg-white mb-3 p-4' key={i}>
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
        </div>
    );
};
