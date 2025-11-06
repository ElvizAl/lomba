import apiClient from "@/lib/api-client";

export const getHighlightInbox = async (): Promise<any> => {
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

export const getInbox = async (): Promise<any> => {
  try {
    const result = await apiClient(
      process.env.NEXT_PUBLIC_API_BASE_URL + "/api/inbox",
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
    console.error('Get inbox error:', error);
    throw error;
  }
};

export const markAsRead = async (id: string): Promise<any> => {
  try {
    const result = await apiClient(
      process.env.NEXT_PUBLIC_API_BASE_URL + "/api/inbox/" + id + "/read",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    return result.data;
  } catch (error) {
    console.error('Mark as read error:', error);
    throw error;
  }
};