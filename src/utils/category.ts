import apiClient from "@/lib/api-client";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getCategory = async ({
  page,
  limit,
  name,
  start_date,
  end_date,
  id,
  state,
}: {
  page: number;
  limit: number;
  name: string;
  start_date: string;
  end_date: string;
  id: string;
  state: string;
}) => {
  try {
    const queryParams = new URLSearchParams();

    if (id) queryParams.append("id", id);
    if (page) queryParams.append("page", String(page));
    if (limit) queryParams.append("limit", String(limit));
    if (name) queryParams.append("name", name);
    if (start_date) queryParams.append("start_date", start_date);
    if (end_date) queryParams.append("end_date", end_date);
    if (state) queryParams.append("state", state);

    const result = await apiClient(
      `${BASE_URL}/api/categories?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );
    return result.data;
  } catch (error) {
    console.error('Get category error:', error);
    throw error;
  }
};
