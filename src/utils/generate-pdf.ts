import { format } from "date-fns";
import { id } from "date-fns/locale";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { ReportSection } from "@/types";

interface jsPDFWithAutoTable extends jsPDF {
  autoTable: (options: any) => jsPDF;
  lastAutoTable?: {
    finalY: number;
  };
}

const generatePDF = (title: string, data: ReportSection[]) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  }) as jsPDFWithAutoTable;

  const currentDate = format(new Date(), "dd/MM/yyyy", { locale: id });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = {
    top: 15,
    left: 10,
    right: 10,
    bottom: 10,
  };

  let yPosition = margin.top;

  // Simple header
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text(title, margin.left, yPosition);
  doc.setFontSize(9);
  doc.setTextColor(100);
  doc.text(`Dibuat: ${currentDate}`, pageWidth - margin.right, yPosition, {
    align: "right",
  });

  yPosition = 20;

  // Add decorative line
  doc.setDrawColor(59, 130, 246); // Blue line
  doc.setLineWidth(0.5);
  doc.line(margin.left, yPosition, pageWidth - margin.right, yPosition);

  yPosition += 15;

  data.forEach((section, sectionIndex) => {
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(section.section, margin.left, yPosition);
    yPosition += 5;

    const tableData = section.items.map((item) => {
      const isTotal =
        item.item_name.includes("Total") ||
        item.item_name === "Saldo Awal" ||
        item.item_name === "Saldo Akhir";

      return {
        name: item.item_name,
        amount: item.amount
          ? new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })
              .format(item.amount)
              .replace("IDR", "Rp")
          : "Rp0",
        isTotal,
      };
    });



    const tableRows = tableData.map((row) => [
      {
        content: row.name,
        styles: { fontStyle: row.isTotal ? "bold" : "normal" },
      },
      {
        content: row.amount,
        styles: {
          halign: "right",
          fontStyle: row.isTotal ? "bold" : "normal",
          textColor: row.amount.startsWith("(") ? [220, 38, 38] : [15, 23, 42], // Red for negative
        },
      },
    ]);

    autoTable(doc, {
      startY: yPosition,
      head: [
        [
          { content: "KETERANGAN", styles: { fontStyle: "bold", fontSize: 9 } },
          {
            content: "JUMLAH",
            styles: { fontStyle: "bold", fontSize: 9, halign: "right" },
          },
        ],
      ],
      body: tableRows as any,
      theme: "plain",
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        fontStyle: "bold",
        lineWidth: 0.2,
      },
      styles: {
        fontSize: 9,
        cellPadding: 2,
        lineWidth: 0.1,
        lineColor: [200, 200, 200],
        minCellHeight: 7,
      },
      columnStyles: {
        0: { cellWidth: "auto", halign: "left" },
        1: { cellWidth: "auto", halign: "right" },
      },
      margin: {
        left: margin.left,
        right: margin.right,
        top: yPosition + 2,
      },
      didDrawPage: function (data : any) {
        yPosition = data?.cursor?.y + 10;

        // Add page number
        const pageSize = doc.internal.pageSize;
        const pageHeight = pageSize.height
          ? pageSize.height
          : pageSize.getHeight();
        doc.setFontSize(8);
        doc.setTextColor(100, 116, 139);
        doc.text(
          `Halaman ${doc.getNumberOfPages()}`,
          pageWidth - margin.right,
          pageHeight - 10,
          { align: "right" }
        );
      },
    });

    yPosition = (doc as any).lastAutoTable.finalY + 5;

    // Check if we need a new page
    if (yPosition > 280 && sectionIndex < data.length - 1) {
      doc.addPage();
      yPosition = margin.top;

      // Simple header for new page
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(`Lanjutan ${title}`, margin.left, yPosition);
      yPosition += 5;
    }
  });

  // Simple footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    const pageHeight =
      doc.internal.pageSize.height || doc.internal.pageSize.getHeight();

    doc.setFontSize(7);
    doc.setTextColor(100);
    doc.text(
      `Halaman ${i} dari ${pageCount} • GloFin ${format(new Date(), "yyyy")}`,
      pageWidth / 2,
      pageHeight - 5,
      { align: "center" }
    );
  }

  // Save the PDF with a simpler filename
  const formattedTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  doc.save(`${formattedTitle}-${format(new Date(), "yyyyMMdd")}.pdf`);
};

export default generatePDF;
