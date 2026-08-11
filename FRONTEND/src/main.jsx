// import { createRoot } from "react-dom/client";
// import "./index.css";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { RouterProvider, createRouter } from "@tanstack/react-router";
// import { routeTree } from "./routing/routeTree.js";
// import store from "./store/store.js";
// import { Provider } from "react-redux";

// export const queryClient = new QueryClient();
// const router = createRouter({
//   routeTree,
//   context: {
//     queryClient,
//     store,
//   },
// });

// createRoot(document.getElementById("root")).render(
//   <Provider store={store}>
//     <QueryClientProvider client={queryClient}>
//       <RouterProvider router={router} />
//     </QueryClientProvider>
//   </Provider>,
// );




import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routing/routeTree.js";
import store from "./store/store.js";
import { Provider } from "react-redux";

// Background color force apply
if (typeof document !== "undefined") {
  document.documentElement.style.backgroundColor = "#0f172a";
  document.body.style.backgroundColor = "#0f172a";
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