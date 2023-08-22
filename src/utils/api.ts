import { Product } from "@/types";

const BASE_URL = "https://fakestoreapi.com/";

export const getCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}products/categories`);

    if (!response.ok) throw new Error("Error in response");

    return await response.json();
  } catch (e: any) {
    console.log(e.message);
  }
};

export const getProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}products`);

    if (!response.ok) throw new Error("Error in response");

    return await response.json();
  } catch (e: any) {
    console.log(e.message);
  }
};

export const getProductsByCategory = async (category: string) => {
  try {
    const response = await fetch(`${BASE_URL}products`);

    if (!response.ok) throw new Error("Error in response");

    const data = (await response.json()) as Product[];

    return data.filter((product) => product.category === category);
  } catch (e: any) {
    console.log(e.message);
  }
};
