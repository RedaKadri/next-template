import type { Metadata } from "next";

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
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
