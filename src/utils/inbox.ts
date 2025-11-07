import apiClient from "@/lib/api-client";
import type { InboxData } from "@/types";

export interface PaginationResponse {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface InboxResponse {
  data: InboxData[];
  pagination: PaginationResponse;
}

export const getHighlightInbox = async (): Promise<InboxData[]> => {
  try {
    const result = await apiClient(
      process.env.NEXT_PUBLIC_API_BASE_URL + "/api/inbox/highlight",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        cache: "no-store",
      }
    );
    return result.data;
  } catch (error) {
    console.error('Get highlight inbox error:', error);
    throw error;
  }
};

export const getInbox = async (page: number = 1, limit: number = 10): Promise<InboxResponse> => {
  try {
    const result = await apiClient(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/inbox?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        cache: "no-store",
      }
    );
    
    // Ensure the response has the expected structure
    return {
      data: result.data || [],
      pagination: result.pagination || {
        page,
        limit,
        total: result.data?.length || 0,
        total_pages: 1
      }
    };
  } catch (error) {
    console.error('Get inbox error:', error);
    throw error;
  }
};

export const markAsRead = async (id: string): Promise<void> => {
  try {
    await apiClient(
      process.env.NEXT_PUBLIC_API_BASE_URL + "/api/inbox/" + id + "/read",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
  } catch (error) {
    console.error('Mark as read error:', error);
    throw error;
  }
};