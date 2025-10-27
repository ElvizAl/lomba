interface ReportItem {
  item_name: string;
  amount: number;
}

export interface ReportFormat {
  section: string;
  items: ReportItem[];
}

type ReportType = "balance-sheet" | "cashflow" | "profit-and-loss";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function fetchReport(type: ReportType): Promise<ReportFormat> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : "";

  const response = await fetch(`${BASE_URL}/api/reports/${type}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${type} data`);
  }

  const result = await response.json();
  return result.data;
}

export const getBalanceSheet = (): Promise<ReportFormat> =>
  fetchReport("balance-sheet");

export const getCashFlow = (): Promise<ReportFormat> => fetchReport("cashflow");

export const getProfitAndLoss = (): Promise<ReportFormat> =>
  fetchReport("profit-and-loss");
