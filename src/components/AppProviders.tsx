"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppRouterCacheProvider>
      <Provider store={store}>{children}</Provider>
    </AppRouterCacheProvider>
  );
}
