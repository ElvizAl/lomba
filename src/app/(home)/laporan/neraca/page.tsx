"use client";
import Navbar from "@/components/layout/navbar";
import { getBalanceSheet } from "@/utils/report";
import { useEffect, useState } from "react";
import { Items } from "@/components/report/items";

interface BalanceSheet {
    section: string;
    items: {
        item_name: string;
        amount: number;
    }[];
}

export default function BalanceSheet() {
    const [balanceSheet, setBalanceSheet] = useState<BalanceSheet[]>([]);
    useEffect(() => {
        getBalanceSheet().then((data: BalanceSheet[]) => {
            setBalanceSheet(data || []);
        });
    }, []);
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar title="Neraca" />
            <div className="pt-5">
                <Items sections={balanceSheet} />
            </div>
        </div>
    );
}
