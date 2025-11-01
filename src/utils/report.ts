import { ReportSection } from "@/types";


type ReportType = "balance-sheet" | "cashflow" | "profit-and-loss";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function fetchReport(type: ReportType): Promise<ReportSection> {
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

export const getBalanceSheet = (): Promise<ReportSection> =>
  fetchReport("balance-sheet");

export const getCashFlow = (): Promise<ReportSection> => fetchReport("cashflow");

export const getProfitAndLoss = (): Promise<ReportSection> =>
  fetchReport("profit-and-loss");
