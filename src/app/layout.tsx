import type {Metadata} from "next";
import Link from "next/link";
import './globals.css';
import Footer from "@/app/components/Footer";
import WhatsAppLink from "@/app/components/WhatsAppLink";
import Image from "next/image";
import { roboto } from "@/app/components/font";


export const metadata: Metadata = {
  title: {
    default: "Contratistas",
    absolute: "",
    template: "%s - Contratistas",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
      <WhatsAppLink/>
        <header>
          <nav>
            <div>
              <Link href="/"><Image src="/logoContratista.png" alt="logo-Contratista" width={200} height={100} /></Link>
            </div>
            <div>
              <Link href="/beneficios">Beneficios</Link>
              <Link href="/compras">Compras</Link>
              <Link href="/puntos">Puntos</Link>
              <Link href="/academia-para-contratistas">Academia para Contratistas</Link>
              <Link href="/documentos-utiles">Documentos útiles</Link>
              <Link href="/cuenta">Cuenta</Link>
            </div>    
          </nav>
        </header>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
