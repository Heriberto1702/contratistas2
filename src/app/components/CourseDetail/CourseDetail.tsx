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
  course: Course; // Recibir el curso como prop
  id_contratista: number; // ID del usuario
}

const CourseDetail: React.FC<CourseDetailProps> = ({ course, id_contratista }) => {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Verificamos si el usuario ya está inscrito en el curso al cargar el componente
  useEffect(() => {
    const checkEnrollment = async () => {
      try {
        const response = await fetch(
          `/api/courses/cursos/inscripcionStatus?id_contratista=${id_contratista}&id_curso=${course.id_curso}`
        );
        const data = await response.json();
        
        if (response.ok) {
          setIsEnrolled(data.isEnrolled); // Actualiza el estado basado en la respuesta de la API
        } else {
          setError(data.message || "Error al verificar la inscripción.");
        }
      } catch (error) {
        setError("Error al verificar la inscripción.");
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    checkEnrollment();
  }, [id_contratista, course.id_curso]);

  const handleEnroll = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/courses/cursos/inscribir", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_contratista,
          id_curso: course.id_curso,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al inscribirse en el curso."); 
      }

      setIsEnrolled(true); // Actualiza el estado a inscrito
    } catch (err: any) {
      setError(err.message || "Hubo un problema al inscribirse.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Link href={`/academia/cursos`} className={styles.back}>
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
            // Si el usuario ya está inscrito, mostramos el enlace a las secciones
            <Link
              href={`/academia/secciones/${course.id_curso}`}
              className={styles.link}
            >
              Ir a las secciones &#62;
            </Link>
          ) : (
            // Si el usuario no está inscrito, mostramos el botón para inscribirse
            <button
              onClick={handleEnroll}
              className={styles.link}
              disabled={loading}
            >
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
        <div>{course.detalles_curso}</div>
        <h3 className={styles.title}>Recomendaciones</h3>
        <div>{course.recomendaciones}</div>
      </div>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default CourseDetail;
