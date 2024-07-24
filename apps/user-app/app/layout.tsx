import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./lib/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Paytm",
  description: "Paytm clone by Keshav Banka",
};

type LayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: LayoutProps): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className + " bg-gray-200 h-screen w-screen"}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
