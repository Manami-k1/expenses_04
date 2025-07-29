"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { SnackbarProvider } from "notistack";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppRouterCacheProvider>
      <Provider store={store}>
        <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          {children}
        </SnackbarProvider>
      </Provider>
    </AppRouterCacheProvider>
  );
}
