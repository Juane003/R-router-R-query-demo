import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { getCategories } from "@/utils/api";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { Link, useLoaderData } from "react-router-dom";
import { Outlet } from "react-router-dom";

const categoriesQuery = () => ({
  queryKey: ["categories"],
  queryFn: async () => getCategories(),
});

export const loader = (queryClient: QueryClient) => async () => {
  const query = categoriesQuery();

  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

export const RootLayout = () => {
  const initialData = useLoaderData() as string[];

  const { data: categories } = useQuery({ ...categoriesQuery(), initialData });

  const renderCategories = (category: string) => {
    return (
      <li className="w-[120px]">
        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
          <Link to={`/category/${category}`} className="w-[120px]">
            {category}
          </Link>
        </NavigationMenuLink>
      </li>
    );
  };

  return (
    <>
      <header className="w-full h-16 bg-slate-800">
        <NavigationMenu className="p-3">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul>{categories.map(renderCategories)}</ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>
      <Outlet />
    </>
  );
};
