import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { store } from "@/store";
import { ThemeProvider } from "@/contexts/theme";
import { ReactQueryDevtools } from "react-query/devtools";
import { FontProvider } from "@/contexts/font";
import NotificationProvider from "@/contexts/notification";

const queryClient = new QueryClient();

interface Props {
  children: React.ReactNode;
}

export function Providers({ children }: Props) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <FontProvider defaultFont="lato" storageKey="vite-ui-font">
            <QueryClientProvider client={queryClient}>
              <NotificationProvider>
                {children}
              </NotificationProvider>
              <ReactQueryDevtools position={"bottom-right"} />
            </QueryClientProvider>
          </FontProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}