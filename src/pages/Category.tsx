import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/types";
import { getProductsByCategory } from "@/utils/api";
import { QueryClient, useQuery } from "@tanstack/react-query";
import {
  Link,
  LoaderFunctionArgs,
  useLoaderData,
  useParams,
} from "react-router-dom";

type LoaderData = Awaited<ReturnType<ReturnType<typeof loader>>>;

const productsWithCategoryQuery = (categoryId: string) => ({
  queryKey: ["products", categoryId],
  queryFn: async () => getProductsByCategory(categoryId),
});

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const query = productsWithCategoryQuery(params.categoryId as string);

    const queryData = queryClient.getQueryData(query.queryKey) as
      | Product[]
      | undefined;

    if (!queryData) {
      return (await queryClient.fetchQuery(query)) as Product[];
    }

    return queryData;
  };

export const Category = () => {
  const initialData = useLoaderData() as LoaderData;

  const { categoryId } = useParams() as { categoryId: string };

  const { data: categoryProducts } = useQuery({
    ...productsWithCategoryQuery(categoryId),
    initialData,
  });

  const renderProducts = (product: Product) => (
    <ProductCard product={product} />
  );

  return (
    <section className="p-4">
      <h1 className="capitalize font-bold pb-2">{categoryId}</h1>
      <Link to={"/"}>Go Back</Link>
      <section className="flex flex-wrap justify-center ">
        {categoryProducts?.map(renderProducts)}
      </section>
      ;
    </section>
  );
};
