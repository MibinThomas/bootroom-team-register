import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Bootroom | Team Registration",
  description: "Register your team for The Bootroom event.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
