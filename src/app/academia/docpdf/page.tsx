import BannerSlidernew from "../../components/BannerSlidernew/BannerSlidernew";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import TitleText from "../../components/Text/TitleText";
import Container from "../../components/Container/Container";


const Page = () => {
  const images = ["/banneracademia.png"];
  return (
    <>
      <header>
        <nav>
          <div>
            <Link href="/">
              <Image
                src="/logoContratista.png"
                alt="logo-Contratista"
                width={182}
                height={119}
              />
            </Link>
          </div>
          <div>
            <Link href="/compras">Compras</Link>
            <Link href="/academia">Academia para Contratistas</Link>
            <Link href="/documentosutiles">Documentos útiles</Link>
            <Link href="/cuenta">Cuenta</Link>
          </div>
        </nav>
      </header>
      <BannerSlidernew images={images} interval={3000} />
      <TitleText
        title="Maestros y Maestras de la construcción, mantengan a sus clientes satisfechos con esta serie de consejos que le presentamos."
        text="Mantenerlos fidelizados es de suma importancia y utilidad ya que con esto aumenta las probabilidades de que le vuelvan a contratar y recomienden sus servicios a otras personas, ampliando así su cartera de clientes."
      />
      
    </>
  );
};
export default Page;
