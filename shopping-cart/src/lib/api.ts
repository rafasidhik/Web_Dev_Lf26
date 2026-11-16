import { getProductInrPrice } from "./pricing";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const API_URL = "https://fakestoreapi.com/products";

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch products (${response.status} ${response.statusText}). Please try again.`
      );
    }

    const data: Product[] = await response.json();

    // Map fetched products to consistent, realistic Indian retail prices in INR
    return data.map((product) => ({
      ...product,
      price: getProductInrPrice(product),
    }));
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred while fetching products.");
  }
}
