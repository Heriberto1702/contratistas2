import Link from "next/link";
import styles from "../../academia/cursos/CoursesPage.module.css";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const formatDate = (isoDate: string): string => {
      const date = new Date(isoDate);
      return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${date.getFullYear()}`;
    };
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses/obtener");
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        if (Array.isArray(data)) {

          data.forEach((course) => {
            course.fecha_hora_Inicio = formatDate(course.fecha_hora_Inicio);
            course.fecha_hora_Fin = formatDate(course.fecha_hora_Fin);
          });
          
          setCourses(data);
        } else {
          throw new Error("La respuesta no es un array");
        }
      } catch (error: any) {
        setError(error.message || "Hubo un problema al cargar los cursos.");
        console.error("Error al obtener los cursos:", error);
      }
    };

    fetchCourses();
  }, []);
  
  return (
    <div>
      {error ? (
        <p className={styles.errorMessage}>Error: {error}</p>
      ) : (
        <div className={styles.container}>
          <ul className={styles.list}>
            {courses.map((course) => (
              <li key={course.id_curso} className={styles.listItem}>
                <div className={styles.continarcurso}>
                  <div className={styles.continarimage}>
                    <Image
                      className={styles.configimage}
                      width={392}
                      height={156}
                      src={course.imagen_curso}
                      alt={course.nombre_curso}
                    />
                  </div>
                  <div className={styles.continarinfo}>
                    <h2 className={styles.title}>{course.nombre_curso}</h2>
                    <p>Inicio el: {course.fecha_hora_Inicio}</p>
                    <p>Finaliza el: {course.fecha_hora_Fin}</p>
                    <p>Hora de inicio curso: {course.hora}</p>
                    <p className={styles.recomendaciones}>{course.recomendaciones}</p>
                    <Link
                      href={`/academia/cursos/${course.id_curso}`}
                      className={styles.link}
                    >
                      Ver más
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Page;
