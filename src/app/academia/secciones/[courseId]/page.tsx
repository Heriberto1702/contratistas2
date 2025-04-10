"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import BannerSlidernew from "../../../components/BannerSlidernew/BannerSlidernew";
import SectionAccordion from "../../../components/SectionAccordion/SectionAccordion";
import NavBar from "../../../components/navbar/NavBar";
import CertificateDownloadButton from "../../../components/CertificateDownloadButton/CertificateDownloadButton";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import styles from "./SectionsPage.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Importa useRouter de next/navigation

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
  Cursos_Matriculados: Array<{
    avance: number;
  }>;
}

const SectionsPage = () => {
  const { data: session } = useSession();
  const params = useParams();
  const id_curso = params.courseId as string;
  const id_contratista = session?.user?.id_contratista ?? null;
  const nombre_contratista = session?.user?.name;
  const [course, setCourse] = useState<Course | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [isEnrolled, setIsEnrolled] = useState(false);

  const router = useRouter(); // Correcto: usamos useRouter de next/navigation

  useEffect(() => {
    if (!id_curso) {
      setError("ID de curso no proporcionado.");
      return;
    }
    const fetchCourse = async () => {
      try {
        const response = await fetch(
          `/api/cursos/obtenerTodos?id_curso=${id_curso}`
        );
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data: Course = await response.json();
        setCourse(data);
        const matriculado =
          Array.isArray(data.Cursos_Matriculados) &&
          data.Cursos_Matriculados.length > 0;
        setIsEnrolled(matriculado);
        setProgress(data.Cursos_Matriculados[0]?.avance);

        if (!matriculado) {
          // Redirigir a otra página si no está matriculado
          router.push(`/academia/cursos/${data.id_curso}`);
        }
      } catch (error: any) {
        setError(error.message || "Hubo un problema al cargar el curso.");
      }
    };
    fetchCourse();
  }, [id_curso, id_contratista, router]);
  // Función para manejar la descarga del certificado
  const updateProgress = async () => {
    try {
      const response = await fetch(
        `/api/cursos/obtenerTodos?id_curso=${id_curso}`
      );
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data: Course = await response.json();

      // **Actualizar el progreso en tiempo real**
      setProgress(data.Cursos_Matriculados[0]?.avance || 0);
    } catch (error) {
      console.error("Error al actualizar el progreso:", error);
    }
  };

  const images = ["/banneracademia.png"];
  if (error) return <div>Error: {error}</div>;
  return (
    <>
      <NavBar />
      <BannerSlidernew images={images} interval={3000} />

      <div className={styles.container}>
        <Link
          className={styles.returnButton}
          href={`/academia/cursos/${id_curso}`}
        >
          Regresar
        </Link>

        {/* Si el curso aún no ha cargado, mostrar "Cargando..." solo en la sección de contenido */}
        {!course ? (
          <div className={styles.loadingContainer}>Cargando Secciones...</div>
        ) : course.sesiones && course.sesiones.length > 0 ? (
          <>
            <div className={styles.sombreado}>
              <p className={styles.title}>{course.nombre_curso}</p>
              {course.especialista && course.rubro && (
                <p className={styles.texto}>
                  Por {course.especialista}, especialista en {course.rubro}
                </p>
              )}
            </div>
            <p className={styles.subtitle}>Contenido</p>
            <div className={styles.progresscontainer}>
              <hr className={styles.divider} />
              <hr className={styles.divider2} />
            </div>
            <ProgressBar progress={progress} />
            {progress === 100 && (
              <CertificateDownloadButton
                nombre_contratista={nombre_contratista ?? null}
                nombre_curso={course.nombre_curso}
              />
            )}
            <div></div>
            {course.sesiones.map((section) => (
              <div key={section.id_sesion} className={styles.section}>
                <SectionAccordion
                  id_contratista={id_contratista ?? 0}
                  section={section}
                  id_curso={Number(id_curso)}
                  updateProgress={updateProgress} // 🔹 Pasamos la función aquí
                />
              </div>
            ))}
          </>
        ) : (
          <div className={styles.presencial}>
            <p className={styles.presencialMessage}>
              Este curso es presencial.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default SectionsPage;
