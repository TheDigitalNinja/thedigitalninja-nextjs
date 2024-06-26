import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Digital Ninja",
  description: "The Digital Ninja",
  metadataBase: new URL('https://TheDigital.Ninja'),
};

export default function RootLayout({
  children,
  title = "The Digital Ninja"
}: Readonly<{
  children: React.ReactNode;
  title?: string;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header title={title} />
        {children}
      </body>
    </html>
  );
}
