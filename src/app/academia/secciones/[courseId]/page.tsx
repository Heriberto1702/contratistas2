"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BannerSlidernew from "../../../components/BannerSlidernew/BannerSlidernew";
import SectionAccordion from "../../../components/SectionAccordion/SectionAccordion";
import NavBar from "../../../components/navbar/NavBar";
import styles from "./SectionsPage.module.css";
import Link from "next/link";
import { useSession } from "next-auth/react";

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
  const { data: session } = useSession();
  const [course, setCourse] = useState<Course | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isMatriculado, setIsMatriculado] = useState<boolean | null>(null);
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId;
  const id_contratista = session?.user?.id_contratista ?? null; 

  useEffect(() => {
    if (!courseId) {
      setError("ID de curso no proporcionado.");
      return;
    }

    const checkMatricula = async () => {
      try {
        const res = await fetch(
          `/api/courses/secciones?id_contratista=${id_contratista}&id_curso=${courseId}`
        );
        const data = await res.json();

        if (data.error) {
          router.push("/academia/cursos");
        } else {
          setIsMatriculado(true);
          fetchCourse();
        }
      } catch (error: any) {
        setError("Hubo un problema al verificar la matrícula.");
      }
    };

    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/courses/obtener?id_curso=${courseId}`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data: Course = await response.json();
        setCourse(data);
      } catch (error: any) {
        setError(error.message || "Hubo un problema al cargar el curso.");
      }
    };

    checkMatricula();
  }, [courseId, id_contratista, router]);

  const images = ["/banneracademia.png"];

  if (error) return <div>Error: {error}</div>;
  if (!course) return <div>Cargando...</div>;
  if (!isMatriculado) return <div>Redirigiendo...</div>;

  return (
    <>
      <NavBar />
      <BannerSlidernew images={images} interval={3000} />

      <div className={styles.container}>
        <Link href={`/academia/cursos/${courseId}`}>Regresar</Link>
        <p className={styles.title}>{course.nombre_curso}</p>
        {/* Verificar si el curso tiene sesiones */}
        {course.sesiones && course.sesiones.length > 0 ? (
          <>
            <p className={styles.texto}>
              Por {course.especialista}, especialista en {course.rubro}
            </p>

            <p className={styles.subtitle}>Contenido</p>

            {course.sesiones.map((section) => (
              <div key={section.id_sesion} className={styles.section}>
                <SectionAccordion section={section} />
              </div>
            ))}
          </>
        ) : (
          <div className={styles.section}>
            <p className={styles.presencialMessage}>Este curso es presencial.</p>
          </div>
        )}
      </div>
    </>
  );
};


export default SectionsPage;
