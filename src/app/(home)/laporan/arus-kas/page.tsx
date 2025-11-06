"use client";
import Navbar from "@/components/layout/navbar";
import { getCashFlow } from "@/utils/report";
import { useEffect, useState } from "react";
import { Items } from "@/components/report/items";
import Loading from "@/components/ui/loading";
import { ReportSection } from "@/types";
import BottomButton from "@/components/ui/bottom-button";
import generatePDF from "@/utils/generate-pdf";

export default function CashFlow() {
    const [cashflow, setCashflow] = useState<ReportSection[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCashFlow().then((data) => {
            setCashflow(data || []);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    const handleDownload = () => {
        if (cashflow.length === 0) return;
        setIsGenerating(true);
        try {
            generatePDF("Arus Kas", cashflow);
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
            <Navbar title="Arus Kas" />
            <div className="pt-5">
                <Items sections={cashflow} />
            </div>
            
            <BottomButton isSubmitting={isGenerating} isFormValid={true} onSubmit={() => handleDownload()} text="Unduh" />
        </div>
    );
}
