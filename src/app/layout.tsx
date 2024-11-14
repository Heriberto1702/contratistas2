"use client"; // Esto convierte este archivo en un componente de cliente

import "./globals.css";
import Footer from "@/app/components/Footer/Footer";
import WhatsAppLink from "@/app/components/WhatsAppLink/WhatsAppLink";
import { roboto } from "@/app/components/font";
import { SessionProvider } from "next-auth/react"; // Importa el SessionProvider
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <SessionProvider> {/* Envuelve el contenido de la aplicación */}
          <WhatsAppLink />
          <main>{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}