const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getTransaction = async (params: any) => {
  const queryParams = new URLSearchParams();

  if (params.categoryId) queryParams.append("category_id", params.categoryId);
  if (params.page) queryParams.append("page", params.page);
  if (params.limit) queryParams.append("limit", params.limit);
  if (params.note) queryParams.append("note", params.note);
  if (params.id) queryParams.append("id", params.id);
  if (params.start_date) queryParams.append("start_date", params.start_date);
  if (params.end_date) queryParams.append("end_date", params.end_date);

  try {
    const result = await apiClient(
      `${BASE_URL}/api/transactions?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result.data;
  } catch (error) {
    console.error('Get transaction error:', error);
    throw error;
  }
};

export const submitTransaction = async (transaction: any): Promise<any> => {
  try {
    const result = await apiClient(`${BASE_URL}/api/transactions/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    });
    
    return result.data.transaction;
  } catch (error) {
    console.error('Submit transaction error:', error);
    throw error;
  }
};

import apiClient from "@/lib/api-client";

export const scanTransaction = async (image: any): Promise<any> => {
  const formData = new FormData();
  formData.append("image", image);
  
  try {
    const result = await apiClient(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/transactions/scan`, {
      method: "POST",
      body: formData,
      // Don't set Content-Type header, let the browser set it with the correct boundary
      headers: {
        // Remove the Content-Type header to let the browser set it with the correct boundary
      },
    });
    
    return result.data.items;
  } catch (error) {
    console.error('Scan transaction error:', error);
    throw error;
  }
};

export const updateTransaction = async (transactions: any): Promise<any> => {
  try {
    const result = await apiClient(`${BASE_URL}/api/transactions/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transactions),
    });
    return result.data;
  } catch (error) {
    console.error('Update transaction error:', error);
    throw error;
  }
};

export const deleteTransaction = async (transactionId: Array<string>) => {
  try {
    const result = await apiClient(`${BASE_URL}/api/transactions/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transactionId),
    });
    return result.data;
  } catch (error) {
    console.error('Delete transaction error:', error);
    throw error;
  }
};
