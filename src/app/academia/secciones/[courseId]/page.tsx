// src/app/sections/[courseId]/page.tsx
import BannerSlidernew from "../../../components/BannerSlidernew/BannerSlidernew";
import React from "react";
import { getCourseById } from "../../../../services/coursesServices";
import SectionAccordion from "../../../components/SectionAccordion/SectionAccordion";
import { Course } from "../../../../types/course";
import styles from "./SectionsPage.module.css"; // Importar el CSS
import NavBar from "../../../components/navbar/NavBar";

const SectionsPage = async ({ params }: { params: { courseId: string } }) => {
  const course: Course | null = await getCourseById(params.courseId);
  const images = ["/banneracademia.png"];

  if (!course || !course.sections) {
    return <div>Secciones no encontradas</div>;
  }

  return (
    <>
      <NavBar />
      <BannerSlidernew images={images} interval={3000} />

      <div className={styles.container}>
        {" "}
        {/* Aplicar clase del contenedor */}
        <div className={styles.subcontainer}>
          <h1 className={styles.title}>{course.title}</h1>
          <p className={styles.texto}>
            Por {course.especialista} especialista en {course.rubro}
          </p>
        </div>
        <h3 className={styles.subtitle}>Contenido</h3>
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
