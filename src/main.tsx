import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "tailwindcss/tailwind.css";

const router = createBrowserRouter([
  {
    path: "/",
    lazy: () => import("./pages/IndexPage.tsx"),
  },
]);

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
