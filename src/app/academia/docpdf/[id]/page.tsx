import BannerSlidernew from "../../../components/BannerSlidernew/BannerSlidernew";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getPdfById } from "../../../../services/coursesServices";
import { PDF } from "../../../../types/course";
import PdfViewer from "../../../components/PdfViewer/PdfViewer";



const DocsPage = async ({ params }: { params: { id: string } }) => {
  const pdf: PDF | null = await getPdfById(params.id);
  const images = ["/banneracademia.png"];
  if (!pdf) {
    return <div>pdf no encontrado</div>;
  }

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
      <PdfViewer pdf={pdf} />
    </>
  );
};

export default DocsPage;
