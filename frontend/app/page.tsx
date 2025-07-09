"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./components/App";

const queryClient = new QueryClient();

const Home: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
};

export default Home;
