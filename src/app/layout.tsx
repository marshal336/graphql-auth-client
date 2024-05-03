import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import ApolloClientProvider from "~/configs/Apollo-provider";
import { Toaster } from "~/components/ui/sonner"
import { ThemeProvider } from "~/configs/Theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auth",
  description: "Auth form",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ApolloClientProvider>
            {children}
            <Toaster />
          </ApolloClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
