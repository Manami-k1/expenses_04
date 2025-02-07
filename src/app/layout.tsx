import type { Metadata } from "next";
import "./globals.css";
import { Provider as ChakraProvider } from "@/components/ui/provider";
import { ClientProvider } from "@/components/ClientProvider"; // 追加

export const metadata: Metadata = {
  title: "家計簿",
  description: "家計簿",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ClientProvider>
          <ChakraProvider>{children}</ChakraProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
