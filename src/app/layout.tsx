"use client"; // Esto convierte este archivo en un componente de cliente

import "./globals.css";
import Footer from "@/app/components/Footer/Footer";
import WhatsAppLink from "@/app/components/WhatsAppLink/WhatsAppLink";
import { roboto } from "@/app/components/font";
import { SessionProvider } from "next-auth/react"; // Importa el SessionProvider
import NextTopLoader from 'nextjs-toploader';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
      <NextTopLoader color = "#FBAF16" />
        <SessionProvider> {/* Envuelve el contenido de la aplicación */}
          <WhatsAppLink />
          <main>{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}