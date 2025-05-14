import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { MainLayout } from "./components/layouts/mainLayout";
import Home from "./pages/Home";
import FetchOld from "./pages/FetchOld";
import FetchRQ from "./pages/FetchRQ";
import FetchIndv from "./components/layouts/ui/FetchIndv";
import { InfiniteScroll } from "./pages/InfiniteScroll";

// Create a React Query client
const queryClient = new QueryClient();

// Define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/trad", element: <FetchOld /> },
      { path: "/rq", element: <FetchRQ /> },
      { path: "/rq/:id", element: <FetchIndv /> },
      { path: "/infinite", element: <InfiniteScroll /> },
    ],
  },
]);

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
