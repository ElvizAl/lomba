"use client";
import Navbar from "@/components/layout/navbar";
import { getBalanceSheet } from "@/utils/report";
import { useEffect, useState } from "react";
import { Items } from "@/components/report/items";
import Loading from "@/components/ui/loading";
import { ReportSection } from "@/types";
import BottomButton from "@/components/ui/bottom-button";
import generatePDF from "@/utils/generate-pdf";

export default function BalanceSheet() {
    const [balanceSheet, setBalanceSheet] = useState<ReportSection[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const data = await getBalanceSheet()
            setBalanceSheet(data);
            setIsLoading(false);
        })();
    }, []);

    if (isLoading) {
        return (
            <Loading />
        );
    }


    const handleDownload = () => {
        if (balanceSheet.length === 0) return;
        setIsGenerating(true);
        try {
            generatePDF("Neraca", balanceSheet);
        } catch (error) {
            console.error('Error generating PDF:', error);
        } finally {
            setIsGenerating(false);
        }
    };
    return (
        <div className="min-h-screen bg-gray-50 px-4">
            <Navbar title="Neraca" />
            <div className="pt-5">
                <Items sections={balanceSheet} />
            </div>

            <BottomButton isSubmitting={isGenerating} isFormValid={true} onSubmit={() => handleDownload()} text="Unduh" />
        </div>
    );
}
