// layout.tsx
import type { Metadata } from "next";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/layout/header";
import Footer from "@/app/components/layout/footer";
import { LanguageProvider } from "@/languageprovider";
import ScrollToTop from "@/app/components/scrolltoTop";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "AWT Investment",
  description: "Developed by Websouls",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <LanguageProvider>
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
        </LanguageProvider>
      </body>
    </html>
  );
}
