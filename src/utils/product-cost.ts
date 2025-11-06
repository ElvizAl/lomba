"use client";

import { ProductCost } from "@/types";
import apiClient from "@/lib/api-client";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ProductCostPayload {
  name: string;
  cost: string;
}

export const getProductCosts = async (): Promise<ProductCost[]> => {
  try {
    const result = await apiClient(`${baseUrl}/api/product-costs`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result.data;
  } catch (error) {
    console.error('Get product costs error:', error);
    throw error;
  }
};

export const saveProductCosts = async (productCosts: ProductCostPayload[]) => {
  try {
    const result = await apiClient(`${baseUrl}/api/product-costs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ products: productCosts }),
    });
    return result.data;
  } catch (error) {
    console.error('Save product costs error:', error);
    throw error;
  }
};
