// src/app/sections/[courseId]/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BannerSlidernew from "../../../components/BannerSlidernew/BannerSlidernew";
import SectionAccordion from "../../../components/SectionAccordion/SectionAccordion";
import NavBar from "../../../components/navbar/NavBar";
import styles from "./SectionsPage.module.css";
import Link from "next/link";

interface Course {
  id_curso: string;
  nombre_curso: string;
  especialista: string;
  rubro: string;
  sesiones: Array<{
    id_sesion: string;
    nombre_sesion: string;
    descripcion: string;
    Modulos: Array<{
      id_modulo: string;
      titulo_modulo: string;
      contenido: string;
      url: string;
    }>;
  }>;
}

const SectionsPage = () => {
  const [course, setCourse] = useState<Course | null>(null);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const courseId = params.courseId; // Obtener el ID del curso de la URL

  useEffect(() => {
    if (!courseId) {
      setError("ID de curso no proporcionado.");
      return;
    }
  
    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/courses/obtener?id=${courseId}`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data: Course = await response.json();
        setCourse(data);
      } catch (error: any) {
        setError(error.message || "Hubo un problema al cargar el curso.");
      }
    };
  
    fetchCourse();
  }, [courseId]);

  const images = ["/banneracademia.png"];

  if (error) return <div>Error: {error}</div>;
  if (!course) return <div>Cargando...</div>;

  return (
    <>
      <NavBar />
      <BannerSlidernew images={images} interval={3000} />

      <div className={styles.container}>
      <Link href={`/academia/cursos/${courseId}`}>Regresar</Link>
        <h1 className={styles.title}>{course.nombre_curso}</h1>
        <p className={styles.texto}>
          Por {course.especialista}, especialista en {course.rubro}
        </p>

        <h3 className={styles.subtitle}>Sesiones</h3>
        {course.sesiones.map((section) => (
          <div key={section.id_sesion} className={styles.section}>
            <SectionAccordion section={section} />
          </div>
        ))}
      </div>
    </>
  );
};

export default SectionsPage;
