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
  tipo_curso: string;
}

interface CourseDetailProps {
  course: Course | null; // Permite null para manejar la carga inicial
  id_contratista: number | null;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ course, id_contratista }) => {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!course || id_contratista === null) return;

    const checkEnrollment = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/courses/cursos/inscripcionStatus?id_contratista=${id_contratista}&id_curso=${course.id_curso}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Error al verificar la inscripción.");
        }

        setIsEnrolled(data.isEnrolled);
      } catch (error: any) {
        setError(error.message || "Error al verificar la inscripción.");
      } finally {
        setLoading(false);
      }
    };

    checkEnrollment();
  }, [course, id_contratista]);

  const handleEnroll = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/courses/cursos/inscribir", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_contratista,
          id_curso: course?.id_curso,
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

  if (!course) {
    return <div className={styles.loading}>Cargando curso...</div>;
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

          {loading ? (
            <p className={styles.loading}>Verificando inscripción...</p>
          ) : isEnrolled ? (
            <Link href={`/academia/secciones/${course.id_curso}`} className={styles.link}>
              Ir a las secciones &#62;
            </Link>
          ) : (
            <button onClick={handleEnroll} className={styles.link} disabled={loading}>
              {loading ? "Inscribiendo..." : "Inscribirse"}
            </button>
          )}
        </div>

        <div className={styles.datacurso}>
          <p>Inicia el: {course.fecha_hora_Inicio}</p>
          <p>Finaliza el: {course.fecha_hora_Fin}</p>
          <p>Hora de inicio curso: {course.hora}</p>
        </div>
      </div>

      <div className={styles.secondData}>
        <h3 className={styles.title}>Detalles del Curso</h3>
        <p>{course.detalles_curso}</p>
        <h3 className={styles.title}>Recomendaciones</h3>
        <p>{course.recomendaciones}</p>
      </div>

      {error && <p className={styles.errorMessage} aria-live="polite">{error}</p>}
    </div>
  );
};

export default CourseDetail;
