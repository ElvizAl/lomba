"use client";
import Navbar from "@/components/layout/navbar";
import { getBalanceSheet } from "@/utils/report";
import { useEffect, useState } from "react";
import { Items } from "@/components/report/items";
import Loading from "@/components/ui/loading";
import { ReportSection } from "@/types";

export default function BalanceSheet() {
    const [balanceSheet, setBalanceSheet] = useState<ReportSection[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            const data = await getBalanceSheet()
            setBalanceSheet(data);
            setLoading(false);
        })();
    }, []);

    if (loading) {
    return (
      <Loading />
    );
  }

    return (
        <div className="min-h-screen bg-gray-50 px-4">
            <Navbar title="Neraca" />
            <div className="pt-5">
                <Items sections={balanceSheet} />
            </div>

            <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t">
                <button
                    type="submit"
                    className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full w-full transition-colors disabled:opacity-50'
                >
                    Unduh
                </button>
            </div>
        </div>
    );
}
