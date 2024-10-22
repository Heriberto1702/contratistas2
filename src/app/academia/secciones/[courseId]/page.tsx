// src/app/sections/[courseId]/page.tsx
import BannerSlidernew from "../../../components/BannerSlidernew/BannerSlidernew";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getCourseById } from "../../../../services/coursesServices";
import SectionAccordion from "../../../components/SectionAccordion/SectionAccordion";
import { Course } from "../../../../types/course";
import styles from "./SectionsPage.module.css"; // Importar el CSS

const SectionsPage = async ({ params }: { params: { courseId: string } }) => {
  const course: Course | null = await getCourseById(params.courseId);
  const images = ["/banneracademia.png"];

  if (!course || !course.sections) {
    return <div>Secciones no encontradas</div>;
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
      
      <div className={styles.container}>
        {" "}
        {/* Aplicar clase del contenedor */}
        <h1 className={styles.title}>Secciones de {course.title}</h1>{" "}
        {/* Aplicar clase del título */}
        {course.sections.map((section) => (
          <div key={section.id} className={styles.section}>
            {" "}
            {/* Aplicar clase para cada sección */}
            <SectionAccordion section={section} />
          </div>
        ))}
      </div>
    </>
  );
};

export default SectionsPage;
