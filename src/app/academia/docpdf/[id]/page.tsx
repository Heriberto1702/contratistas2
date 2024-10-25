import BannerSlidernew from "../../../components/BannerSlidernew/BannerSlidernew";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getPdfById, pdfData } from "../../../../services/coursesServices";
import { PDF } from "../../../../types/course";
import PdfViewer from "../../../components/PdfViewer/PdfViewer";
import styles from './Pagination.module.css';

const DocsPage = async ({ params }: { params: { id: string } }) => {
  const pdf: PDF | null = await getPdfById(params.id);
  const images = ["/banneracademia.png"];
  
  if (!pdf) {
    return <div>PDF no encontrado</div>;
  }

  // Obtener el total de PDFs
  const totalPDFs = pdfData.length;
  const currentId = parseInt(params.id, 10);

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
      
      {/* Paginación */}
      <div className={styles.pagination}>
      <Link 
        href={`/academia/docpdf/${currentId - 1}`} 
        className={styles.pagelink} 
        style={{ display: currentId <= 1 ? 'none' : 'inline' }}>
        Anterior
      </Link>
      <span className={styles.pageInfo}>{` Pdf ${currentId} de ${totalPDFs} `}</span>
      <Link 
        href={`/academia/docpdf/${currentId + 1}`} 
        className={styles.pagelink} 
        style={{ display: currentId >= totalPDFs ? 'none' : 'inline' }}>
        Siguiente
      </Link>
    </div>
    </>
  );
};

export default DocsPage;