"use client";
import Navbar from "@/components/layout/navbar";
import { getCashFlow } from "@/utils/report";
import { useEffect, useState } from "react";
import { Items } from "@/components/report/items";

interface cashflowFormat {
    section: string;
    items: {
        item_name: string;
        amount: number;
    }[];
}

export default function CashFlow() {
    const [cashflow, setCashflow] = useState<cashflowFormat[]>([]);
    useEffect(() => {
        getCashFlow().then((data: cashflowFormat[]) => {
            setCashflow(data || []);
        });
    }, []);
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar title="Arus Kas" />
            <div className="pt-5">
                <Items sections={cashflow} />
            </div>
        </div>
    );
}
