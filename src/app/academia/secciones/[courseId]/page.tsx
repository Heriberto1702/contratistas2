"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BannerSlidernew from "../../../components/BannerSlidernew/BannerSlidernew";
import SectionAccordion from "../../../components/SectionAccordion/SectionAccordion";
import NavBar from "../../../components/navbar/NavBar";
import styles from "./SectionsPage.module.css";
import Link from "next/link";
import { useSession } from "next-auth/react";
import jsPDF from "jspdf";
import "jspdf-autotable";

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
  const nombre_contratista = session?.user?.name;
  const [nombre_curso, setNombreCurso] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

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
        const response = await fetch(
          `/api/courses/obtener?id_curso=${courseId}`
        );
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data: Course = await response.json();
        setCourse(data);
        setNombreCurso(data.nombre_curso);
      } catch (error: any) {
        setError(error.message || "Hubo un problema al cargar el curso.");
      }
    };

    checkMatricula();
  }, [courseId, id_contratista, router, nombre_curso]);

  useEffect(() => {
    if (isCompleted) {
      setIsCompleted(true);
    }
  }, [isCompleted]);
  // Función para manejar la descarga del certificado
  const generateCertificate = (
    nombre_contratista: string,
    curso: { nombre_curso: string }
  ) => {
    const doc = new jsPDF("landscape");

    // Fondo suave con bordes
    doc.setFillColor(255, 255, 255); // Fondo blanco
    doc.rect(10, 10, 270, 190, "F"); // Fondo cuadrado
    doc.setDrawColor(0, 102, 204); // Azul suave para el borde
    doc.setLineWidth(1); // Ancho de borde suave
    doc.rect(10, 10, 270, 190); // Borde exterior del certificado

    // Logo
    const logoUrl = "/logoContratista.png";
    doc.addImage(logoUrl, "PNG", 20, 15, 50, 50); // Logo más pequeño y posicionado arriba a la izquierda

    // Título
    doc.setFont("times", "bold");
    doc.setFontSize(30); // Título más grande
    doc.setTextColor(0, 102, 204); // Azul suave
    doc.text("CERTIFICADO DE FINALIZACIÓN", 80, 60);

    // Línea decorativa (más sutil)
    doc.setDrawColor(0, 102, 204); // Azul suave
    doc.setLineWidth(0.5);
    doc.line(50, 65, 240, 65);

    // Subtítulo
    doc.setFont("times", "italic");
    doc.setFontSize(18); // Un tamaño intermedio que resalta
    doc.setTextColor(80, 80, 80); // Gris suave
    doc.text("Este certificado es otorgado a:", 100, 85);

    // Nombre del contratista
    doc.setFont("times", "bold");
    doc.setFontSize(24); // Aumentado ligeramente
    doc.setTextColor(20, 20, 20); // Negro elegante
    doc.text(nombre_contratista, 100, 105);

    // Descripción del curso
    doc.setFont("times", "italic");
    doc.setFontSize(16);
    doc.setTextColor(80, 80, 80); // Gris suave
    doc.text("Por haber completado satisfactoriamente la sesión:", 60, 125);

    // Nombre del curso
    doc.setFont("times", "bold");
    doc.setFontSize(22); // Tamaño intermedio y elegante
    doc.setTextColor(0, 102, 204); // Azul
    doc.text(`"${curso.nombre_curso}"`, 90, 145);

    // Fecha de emisión
    doc.setFont("times", "italic");
    doc.setFontSize(14); // Más pequeño para balancear
    doc.setTextColor(80, 80, 80); // Gris suave
    doc.text("Fecha de emisión: " + new Date().toLocaleDateString(), 100, 165);

    // Firma
    doc.setFont("times", "bold");
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0); // Negro para la firma
    doc.text("_________________________", 180, 175);
    doc.text("Instructor Certificador", 190, 185);

    // Guardar el archivo PDF
    doc.save(`Certificado_${nombre_contratista}.pdf`);
  };

  const handleDownloadCertificate = () => {
    if (nombre_contratista && nombre_curso) {
      generateCertificate(nombre_contratista, { nombre_curso });
    } else {
      console.error("Nombre del contratista o del curso no está definido.");
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
          href={`/academia/cursos/${courseId}`}
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
              <p className={styles.texto}>
                Por {course.especialista}, especialista en {course.rubro}
              </p>
            </div>

            <p className={styles.subtitle}>Contenido</p>
            <div className={styles.progresscontainer}>
              <hr className={styles.divider} />
              <hr className={styles.divider2} />
            </div>
            {isCompleted && (
              <button
                className={styles.downloadButton}
                onClick={handleDownloadCertificate}
              >
                Descargar Certificado
              </button>
            )}
            {course.sesiones.map((section) => (
              <div key={section.id_sesion} className={styles.section}>
                <SectionAccordion
                  section={section}
                  nombre_contratista={nombre_contratista ?? ""}
                  id_curso={Number(courseId)}
                  nombre_curso={course.nombre_curso ?? ""}
                  setCursoCompletado={() => {
                    setIsCompleted(true);
                  }}
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
