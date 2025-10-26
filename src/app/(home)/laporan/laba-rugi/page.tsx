"use client";
import Navbar from "@/components/layout/navbar";
import { getProfitAndLoss } from "@/utils/report";
import { useEffect, useState } from "react";
import { Items } from "@/components/report/items";

interface profitAndLossFormat {
    section: string;
    items: {
        item_name: string;
        amount: number;
    }[];
}

export default function ProfitAndLoss() {
    const [profitAndLoss, setProfitAndLoss] = useState<profitAndLossFormat[]>([]);
    useEffect(() => {
        getProfitAndLoss().then((data: profitAndLossFormat[]) => {
            setProfitAndLoss(data || []);
        });
    }, []);
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar title="Laba Rugi" />
            <div className="pt-5">
                <Items sections={profitAndLoss} />
            </div>
        </div>
    );
}
