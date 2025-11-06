import { ReportSection } from "@/types";
import apiClient from "@/lib/api-client";


type ReportType = "balance-sheet" | "cashflow" | "profit-and-loss";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function fetchReport(type: ReportType): Promise<ReportSection[]> {
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("authToken") : "";
    const result = await apiClient(`${BASE_URL}/api/reports/${type}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  } catch (error) {
    console.error('Get report error:', error);
    throw error;
  }
}

export const getBalanceSheet = (): Promise<ReportSection[]> =>
  fetchReport("balance-sheet");

export const getCashFlow = (): Promise<ReportSection[]> => fetchReport("cashflow");

export const getProfitAndLoss = (): Promise<ReportSection[]> =>
  fetchReport("profit-and-loss");
