"use client";
import React, { useEffect, useState, useRef } from "react";
import Confetti from "react-confetti";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import BannerSlidernew from "../../../components/BannerSlidernew/BannerSlidernew";
import SectionAccordion from "../../../components/SectionAccordion/SectionAccordion";
import NavBar from "../../../components/navbar/NavBar";
import CertificateDownloadButton from "../../../components/CertificateDownloadButton/CertificateDownloadButton";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import styles from "./SectionsPage.module.css";
import Link from "next/link";
import Breadcrumbs from "../../../components/Breadcrumbs/breadcrumbs";
import { useRouter } from "next/navigation";

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
  const [confettiShown, setConfettiShown] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

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
        setProgress(data.Cursos_Matriculados[0]?.avance || 0);

        if (!matriculado) {
          router.push(`/academia/cursos/${data.id_curso}`);
        }
      } catch (error: any) {
        setError(error.message || "Hubo un problema al cargar el curso.");
      }
    };
    fetchCourse();
  }, [id_curso, id_contratista, router]);

  useEffect(() => {
    if (progress === 100 && !confettiShown) {
      setShowConfetti(true);

      const timeout = setTimeout(() => {
        setShowConfetti(false);
        setConfettiShown(true);
      }, 7000);

      return () => clearTimeout(timeout);
    }
  }, [progress, confettiShown]);

  useEffect(() => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, [showConfetti]);

  const updateProgress = async () => {
    try {
      const response = await fetch(
        `/api/cursos/obtenerTodos?id_curso=${id_curso}`
      );
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data: Course = await response.json();
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
    
      <div ref={containerRef} className={styles.container}>
        <Link className={styles.back} href={`/academia/cursos/${id_curso}`}>
          &#8592; Regresar
        </Link>

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
              <hr className={styles.divider2} />
            </div>

            <ProgressBar progress={progress} />

            {progress === 100 && (
              <>
                <CertificateDownloadButton
                  nombre_contratista={nombre_contratista ?? null}
                  nombre_curso={course.nombre_curso}
                />

                {showConfetti && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      pointerEvents: "none",
                      zIndex: 10,
                    }}
                  >
                    <Confetti
                      width={dimensions.width}
                      height={dimensions.height}
                      numberOfPieces={200}
                      recycle={false}
                      gravity={0.05}
                    />
                  </div>
                )}
              </>
            )}

            {course.sesiones.map((section) => (
              <div key={section.id_sesion} className={styles.section}>
                <SectionAccordion
                  id_contratista={id_contratista ?? 0}
                  section={section}
                  id_curso={Number(id_curso)}
                  updateProgress={updateProgress}
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
