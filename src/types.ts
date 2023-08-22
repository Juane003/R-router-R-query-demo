export interface Product {
  title: string;
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: Rating;
}

export interface Rating {
  rate: number;
  count: number;
}

export type ProductForCard = Omit<
  Product,
  "rating" | "description" | "category"
>;
