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

  const response = await fetch(
    `${BASE_URL}/api/transactions?${queryParams.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get transaction");
  }

  const result = await response.json();
  return result.data;
};

export const submitTransaction = async (transaction: any): Promise<any> => {
  const response = await fetch(`${BASE_URL}/api/transactions/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    body: JSON.stringify(transaction),
  });

  if (!response.ok) {
    throw new Error("Failed to submit transaction");
  }

  const result = await response.json();
  return result.data.transaction;
};

export const scanTransaction = async (image: any): Promise<any> => {
  const formData = new FormData();
  formData.append("image", image);
  const response = await fetch(`${BASE_URL}/api/transactions/scan`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to scan transaction");
  }

  const result = await response.json();
  return result.data.items;
};

export const updateTransaction = async (transactions: any): Promise<any> => {
  const response = await fetch(`${BASE_URL}/api/transactions/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    body: JSON.stringify(transactions),
  });

  if (!response.ok) {
    throw new Error("Failed to update transaction");
  }

  const result = await response.json();
  return result.data;
};

export const deleteTransaction = async (transactionId: Array<string>) => {
  const response = await fetch(`${BASE_URL}/api/transactions/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    body: JSON.stringify(transactionId),
  });

  if (!response.ok) {
    throw new Error("Failed to delete transaction");
  }

  const result = await response.json();
  return result.data;
};
