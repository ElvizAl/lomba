const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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
