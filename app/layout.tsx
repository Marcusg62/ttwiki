import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "tt wiki - We got the tea. ",
  description: "We got the tea. ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#F7FAFC" }} className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
