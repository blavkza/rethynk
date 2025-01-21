import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "../components/providers/toaster-provider";

export const metadata: Metadata = {
  title: "Re Think Web Studio Admin",
  description: "Admin dashboard for Re Think Web Studio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen">
          <ToastProvider />
          {children}
        </div>
      </body>
    </html>
  );
}
