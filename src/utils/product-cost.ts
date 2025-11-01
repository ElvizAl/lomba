"use client";

import { ProductCost } from "@/types";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ProductCostPayload {
  name: string;
  cost: string;
}

export const getProductCosts = async (): Promise<ProductCost[]> => {
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

export const saveProductCosts = async (productCosts: ProductCostPayload[]) => {
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
