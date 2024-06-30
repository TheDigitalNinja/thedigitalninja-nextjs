import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "../components/Footer";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Digital Ninja",
  description: "The Digital Ninja",
  metadataBase: new URL('https://TheDigital.Ninja'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Footer />
      </body>
    </html>
  );
}