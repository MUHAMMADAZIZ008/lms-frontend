import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import AntProvider from "./providers/ant-provider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AntProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AntProvider>
  </QueryClientProvider>
);
