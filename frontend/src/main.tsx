import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient=new QueryClient();

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster position="top-center" reverseOrder={false} />
    </QueryClientProvider>
  </BrowserRouter>
);

