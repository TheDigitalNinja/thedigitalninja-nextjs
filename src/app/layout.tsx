import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from 'next/script';
import { AuthProvider } from '../components/AuthProvider';
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
      <head>
        <Script 
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){window.dataLayer.push(arguments);}
                  gtag('js', new Date());

            gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}