"use client";
import Navbar from "@/components/layout/navbar";
import { getProfitAndLoss } from "@/utils/report";
import { useEffect, useState } from "react";
import { Items } from "@/components/report/items";
import Loading from "@/components/ui/loading";
import { ReportSection } from "@/types";
import BottomButton from "@/components/ui/bottom-button";
import generatePDF from "@/utils/generate-pdf";

export default function ProfitAndLoss() {
    const [profitAndLoss, setProfitAndLoss] = useState<ReportSection[]>([]);
    const [loading, setLoading] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);
    useEffect(() => {
        (async () => {
            const data = await getProfitAndLoss()
            setProfitAndLoss(data);
            setLoading(false);
        })();
    }, []);

    const handleDownload = () => {
        if (profitAndLoss.length === 0) return;
        setIsGenerating(true);
        try {
            generatePDF("Laba Rugi", profitAndLoss);
        } catch (error) {
            console.error('Error generating PDF:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    if (loading) {
        return (
            <Loading />
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4">
            <Navbar title="Laba Rugi" />
            <div className="pt-5">
                <Items sections={profitAndLoss} />
            </div>
            <BottomButton isSubmitting={isGenerating} isFormValid={true} onSubmit={() => handleDownload()} text="Unduh" />
        </div>
    );
}
