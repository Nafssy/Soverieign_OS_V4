import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SovereignProvider } from "@/context/SovereignContext";

export const metadata: Metadata = {
  title: "SOVEREIGN OS v4.0",
  description: "Personal Operating System — Academic Fortress & Career Architecture",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{ fontFamily: "'DM Sans', sans-serif" }}
        className="antialiased"
      >
        <SovereignProvider>
          {children}
          <Toaster />
        </SovereignProvider>
      </body>
    </html>
  );
}