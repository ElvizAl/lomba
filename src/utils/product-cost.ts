"use client";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ProductCost {
  id: string;
  name: string;
  cost: string;
  created_at: string;
  updated_at: string;
}

export const getProductCosts = async () => {
  const token = localStorage.getItem("authToken");
  const response = await fetch(`${baseUrl}/api/product-costs`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Gagal mengambil data HPP");
  }

  const data = await response.json();
  const items = data.data || [];
  return items;
};

export const saveProductCosts = async (productCosts: ProductCost[]) => {
  const token = localStorage.getItem("authToken");
  const response = await fetch(`${baseUrl}/api/product-costs`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productCosts),
  });

  if (!response.ok) {
    throw new Error("Gagal menyimpan data HPP");
  }

  const result = await response.json();
  return result;
};
