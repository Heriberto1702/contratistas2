import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/app/components/Footer/Footer";
import WhatsAppLink from "@/app/components/WhatsAppLink/WhatsAppLink";
import { roboto } from "@/app/components/font";

export const metadata: Metadata = {
  title: {
    default: "Contratistas",
    absolute: "",
    template: "%s - Contratistas",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <WhatsAppLink />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
