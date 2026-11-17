
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Authify | Secure Authentication",
  description:
    "A simple and secure authentication system built with Next.js and JWT.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
