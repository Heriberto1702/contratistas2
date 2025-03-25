"use client"; // Esto convierte este archivo en un componente de cliente

import "./globals.css";
import Footer from "@/app/components/Footer/Footer";
import { SessionProvider } from "next-auth/react"; // Importa el SessionProvider
import NextTopLoader from 'nextjs-toploader';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
      <NextTopLoader color = "#FBAF16" />
        <SessionProvider> {/* Envuelve el contenido de la aplicación */}
          
        <main className="mainContent" >{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}