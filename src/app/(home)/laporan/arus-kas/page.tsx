"use client";
import Navbar from "@/components/layout/navbar";
import { getCashFlow } from "@/utils/report";
import { useEffect, useState } from "react";
import { Items } from "@/components/report/items";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import Loading from "@/components/ui/loading";
import { ReportSection } from "@/types";

// Extend jsPDF with autoTable
declare module 'jspdf' {
    interface jsPDF {
        autoPrint: (options?: AutoPrintInput | undefined) => jsPDF;
    }
}

const generatePDF = (cashflowData: ReportSection[]) => {
    const doc = new jsPDF();
    const currentDate = format(new Date(), 'dd MMMM yyyy', { locale: id });

    // Add title
    doc.setFontSize(18);
    doc.text('Laporan Arus Kas', 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Dibuat pada: ${currentDate}`, 14, 30);

    let yPosition = 40;

    cashflowData.forEach((section, sectionIndex) => {
        // Add section title
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.setFont("arial", 'bold');
        doc.text(section.section, 14, yPosition);
        yPosition += 10;


        //      [
        //     {
        //         "section": "Arus Kas Masuk",
        //         "items": [
        //             {
        //                 "item_name": "Total Arus Kas Masuk",
        //                 "amount": 0
        //             }
        //         ]
        //     },
        //     {
        //         "section": "Arus Kas Keluar",
        //         "items": [
        //             {
        //                 "item_name": "Total Arus Kas Keluar",
        //                 "amount": 0
        //             }
        //         ]
        //     },
        //     {
        //         "section": "Saldo Kas",
        //         "items": [
        //             {
        //                 "item_name": "Saldo Awal",
        //                 "amount": 0
        //             },
        //             {
        //                 "item_name": "Kenaikan/(Penurunan) Kas",
        //                 "amount": 0
        //             },
        //             {
        //                 "item_name": "Saldo Akhir",
        //                 "amount": 0
        //             }
        //         ]
        //     }
        // ]

        // Prepare data for the table with proper formatting
        const tableData = section.items.map(item => [
            { 
                content: item.item_name,
                styles: { 
                    fontStyle: item.item_name.includes('Total') || item.item_name === 'Saldo Awal' || item.item_name === 'Saldo Akhir' ? 'bold' : 'normal',
                    cellPadding: 5
                }
            },
            { 
                content: item.amount ? new Intl.NumberFormat('id-ID', { 
                    style: 'currency', 
                    currency: 'IDR',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0 
                }).format(item.amount).replace('IDR', 'Rp') : 'Rp0',
                styles: { 
                    halign: 'right',
                    fontStyle: item.item_name.includes('Total') || item.item_name === 'Saldo Awal' || item.item_name === 'Saldo Akhir' ? 'bold' : 'normal',
                    cellPadding: 5
                }
            }
        ]);

        // Add table with proper styling
        (doc as any).autoPrint({
            startY: yPosition,
            head: [
                [
                    { 
                        content: 'Keterangan',
                        styles: { 
                            fillColor: [59, 130, 246],
                            textColor: 255,
                            fontStyle: 'bold',
                            cellPadding: 5
                        }
                    },
                    { 
                        content: 'Jumlah',
                        styles: { 
                            fillColor: [59, 130, 246],
                            textColor: 255,
                            fontStyle: 'bold',
                            halign: 'right',
                            cellPadding: 5
                        }
                    }
                ]
            ],
            body: tableData,
            theme: 'grid',
            headStyles: { 
                fillColor: [59, 130, 246],
                textColor: 255,
                fontStyle: 'bold',
                cellPadding: 5
            },
            styles: {
                cellPadding: 5,
                lineColor: [0, 0, 0],
                lineWidth: 0.1
            },
            margin: { left: 14, right: 14, top: 10 },
            didDrawPage: function (data: any) {
                // Update y position for next section
                yPosition = data.cursor?.y || yPosition + 50;
            }
        });

        // Add some space between sections
        yPosition += 10;

        // Add new page if needed
        if (sectionIndex < cashflowData.length - 1 && yPosition > 250) {
            doc.addPage();
            yPosition = 20;
        }
    });

    // Save the PDF
    doc.save(`Laporan_Arus_Kas_${format(new Date(), 'yyyyMMdd')}.pdf`);
};

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
            generatePDF(cashflow);
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
            <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t">
                <button
                    type="button"
                    onClick={handleDownload}
                    disabled={isGenerating || cashflow.length === 0}
                    className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full w-full transition-colors disabled:opacity-50 flex items-center justify-center gap-2'
                >
                    {isGenerating ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Membuat Laporan...
                        </>
                    ) : (
                        'Unduh Laporan (PDF)'
                    )}
                </button>
            </div>
        </div>
    );
}
