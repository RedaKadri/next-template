import type { Metadata } from "next";

import { Toaster } from "sonner";

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
      <body className="h-screen antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
