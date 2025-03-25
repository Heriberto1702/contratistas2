"use client";

import { useState, useEffect } from "react";
import styles from "./CourseDetail.module.css";
import Image from "next/image";
import Link from "next/link";

interface Course {
  id_curso: string;
  nombre_curso: string;
  fecha_hora_Inicio: string;
  fecha_hora_Fin: string;
  hora: string;
  detalles_curso: string;
  imagen_curso: string;
  recomendaciones: string;
  Cursos_Matriculados: any[];
}

interface CourseDetailProps {
  id_curso: string;
  id_contratista: string; // Add id_contratista to the props
}
const CourseDetail = ({ id_curso, id_contratista }: CourseDetailProps) => {
  const [course, setCourse] = useState<Course | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  useEffect(() => {
    if (!id_curso) {
        console.error("id_curso es undefined o vacío");
        return;
    }
    const formatDate = (dateString: string): string => {
        if (!dateString) return "Fecha no disponible";
        const date = new Date(dateString);
        return date.toLocaleString("es-ES", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const fetchCourse = async () => {
        try {
            const response = await fetch(`/api/courses/obtenerTodos?id_curso=${id_curso}`);
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Error al obtener los detalles del curso.");
            }
            if (!data || Object.keys(data).length === 0) {
                throw new Error("No se encontró el curso en la API.");
            }
            // Formatear las fechas y actualizar el estado
            const formattedCourse = {
                ...data,
                fecha_hora_Inicio: formatDate(data.fecha_hora_Inicio),
                fecha_hora_Fin: formatDate(data.fecha_hora_Fin),
            };
            const matriculado =
                Array.isArray(data.Cursos_Matriculados) && data.Cursos_Matriculados.length > 0;
            setCourse(formattedCourse);
            setIsEnrolled(matriculado);
        } catch (err: any) {
            console.error("Error obteniendo el curso:", err);
            setError(err.message || "Hubo un problema al obtener los detalles del curso.");
        } finally {
            setLoading(false);
        }
    };

    fetchCourse();
}, [id_curso]);

  const handleEnroll = async () => {
    setButtonLoading(true);  // Solo actualizamos el estado del botón
    setError(null);
    
    try {
      const response = await fetch("/api/courses/cursos/inscribir", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_contratista: id_contratista,  // Aquí se pasa el ID del contratista
          id_curso: id_curso,  // Y el ID del curso
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error al inscribirse en el curso.");
      }
      setIsEnrolled(true);
    } catch (err: any) {
      setError(err.message || "Hubo un problema al inscribirse.");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <div className={styles.loading}>Cargando curso...</div>;
  }
  if (!course) {
    return <div className={styles.loading}>Curso no encontrado.</div>;
  }
  return (
    <div className={styles.container}>
      <Link href="/academia/cursos" className={styles.back}>
        &#8592; Regresar
      </Link>
      <h1 className={styles.title}>{course.nombre_curso}</h1>
      <div className={styles.firstData}>
        <div className={styles.data}>
          <Image
            className={styles.image}
            width={128}
            height={100}
            src={course.imagen_curso}
            alt={course.nombre_curso}
          />
          {isEnrolled ? (
            <Link
              href={`/academia/secciones/${course.id_curso}`}
              className={styles.link}
            >
              Ir a las secciones &#62;
            </Link>
          ) : (
            <button
              onClick={handleEnroll}
              className={styles.link}
              disabled={buttonLoading}
            >
              {buttonLoading  ? "Inscribiendo..." : "Inscribirse"}
            </button>
          )}
        </div>
        <div className={styles.datacurso}>
          <p>
            <strong>Inicia el: </strong>
            {course.fecha_hora_Inicio}
          </p>
          <p>
            <strong>Finaliza el:</strong> {course.fecha_hora_Fin}
          </p>
          <p>
            <strong>Hora de inicio curso:</strong> {course.hora}
          </p>
        </div>
      </div>
      <div className={styles.secondData}>
        <h3 className={styles.title}>Detalles del Curso</h3>
        <p>{course.detalles_curso}</p>
        <h3 className={styles.title}>Recomendaciones</h3>
        <p>{course.recomendaciones}</p>
      </div>
      {error && (
        <p className={styles.errorMessage} aria-live="polite">
          {error}
        </p>
      )}
    </div>
  );
};

export default CourseDetail;
