import type { Metadata } from "next";

import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ui/theme/theme-provider";

import "./globals.css";

export const metadata: Metadata = {
  title: "Next Template",
  description: "a simple nextjs template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex h-screen flex-col antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header />
          <main className="mx-auto flex w-[90%] flex-grow items-center justify-center">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
