import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routing/routeTree.js";
import store from "./store/store.js";
import { Provider } from "react-redux";

// DIRECT DOM INJECTION FOR SKY BLUE MOVING BACKGROUND
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    html, body, #root {
      background: linear-gradient(-45deg, #0284c7, #38bdf8, #0ea5e9, #0284c7) !important;
      background-size: 400% 400% !important;
      animation: skyGradientMove 8s ease infinite !important;
      min-height: 100vh !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    @keyframes skyGradientMove {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;
  document.head.appendChild(style);
}

export const queryClient = new QueryClient();
const router = createRouter({
  routeTree,
  context: {
    queryClient,
    store,
  },
});

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Provider>,
);
