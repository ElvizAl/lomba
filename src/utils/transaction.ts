const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getTransaction = async (params: any) => {
  const response = await fetch(
    `${BASE_URL}/api/transactions?category_id=${params.categoryId}&page=${params.page}&limit=${params.limit}&note=${params.note}&start_date=${params.start_date}&end_date=${params.end_date}`,
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
