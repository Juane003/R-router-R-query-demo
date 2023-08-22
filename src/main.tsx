import React from "react";
import ReactDOM from "react-dom/client";
import App, { loader as productsLoader } from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { getCategories } from "./utils/api.ts";
import { RootLayout } from "./pages/RootLayout.tsx";
import {
  Category,
  loader as productsByCategoryLoader,
} from "./pages/Category.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />} loader={getCategories}>
      <Route path="/" element={<App />} loader={productsLoader(queryClient)} />
      <Route
        path="/category/:categoryId"
        element={<Category />}
        loader={productsByCategoryLoader(queryClient)}
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
