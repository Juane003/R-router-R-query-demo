import { QueryClient, useQuery } from "@tanstack/react-query";
import { getProducts } from "./utils/api";
import { useLoaderData } from "react-router-dom";
import { Product } from "./types";
import { ProductCard } from "./components/ProductCard";

const productsQuery = () => ({
  queryKey: ["products"],
  queryFn: async () => getProducts(),
});

export const loader = (queryClient: QueryClient) => async () => {
  const query = productsQuery();

  const queryData = queryClient.getQueryData(query.queryKey);

  if (queryData) return queryData;

  return await queryClient.fetchQuery(query);
};

function App() {
  const initialData = useLoaderData() as Product[];

  const { data: products } = useQuery({ ...productsQuery, initialData });

  const renderProducts = (product: Product) => (
    <ProductCard product={product} />
  );

  return (
    <section className="p-2 flex flex-wrap gap-4 w-full justify-center">
      {products.map(renderProducts)}
    </section>
  );
}

export default App;
