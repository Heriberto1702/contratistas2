import React, { useState, useEffect } from "react";
import styles from "./css/CoursesTable.module.css";

const CoursesTable = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses/obtener");
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        if (Array.isArray(data)) {
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
        <p className={styles.errorMessage}>Error: {error}</p> // Uso de la clase errorMessage
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Título</th>
              <th className={styles.th}>Especialista</th>
              <th className={styles.th}>Descripción del curso</th>
              <th className={styles.th}>Fecha Inicio</th>
              <th className={styles.th}>Fecha Fin</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id_curso} className={styles.tr}>
                <td className={styles.td}>{course.nombre_curso}</td>
                <td className={styles.td}>{course.especialista}</td>
                <td className={styles.td}>{course.descripcion}</td>
                <td className={styles.td}>
                  {new Date(course.fecha_hora_Inicio).toLocaleDateString()}
                </td>
                <td className={styles.td}>
                  {new Date(course.fecha_hora_Fin).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CoursesTable;