import Link from "next/link";
import styles from "../../academia/cursos/CoursesPage.module.css";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("todos"); // todos | misCursos | resultados

  useEffect(() => {
    const formatDate = (isoDate: string): string => {
      const date = new Date(isoDate);
      return `${date.getDate().toString().padStart(2, "0")}/${(
        date.getMonth() + 1
      )
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
          setFilteredCourses(data); // Inicializamos los cursos filtrados
        } else {
          throw new Error("La respuesta no es un array");
        }
      } catch (error: any) {
        setError(error.message || "Hubo un problema al cargar los cursos.");
        console.error("Error al obtener los cursos:", error);
      }
    };
    const fetchEnrolledCourses = async () => {
      try {
        const response = await fetch("/api/courses/obtenerMatriculados"); // API para cursos matriculados
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        if (Array.isArray(data)) {
          data.forEach((course) => {
            course.fecha_hora_Inicio = formatDate(course.fecha_hora_Inicio);
            course.fecha_hora_Fin = formatDate(course.fecha_hora_Fin);
          });

          setEnrolledCourses(data);
        } else {
          throw new Error("La respuesta no es un array");
        }
      } catch (error: any) {
        setError(
          error.message || "Hubo un problema al cargar los cursos matriculados."
        );
        console.error("Error al obtener los cursos matriculados:", error);
      }
    };
    fetchEnrolledCourses();
    fetchCourses();
  }, []);

  // Actualizar los cursos filtrados cuando cambia el término de búsqueda o el filtro
  useEffect(() => {
    let filtered = courses;

    if (searchTerm) {
      filtered = filtered.filter(
        (course) =>
          course.nombre_curso
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    if (filterType === "misCursos") {
      // Mostrar solo los cursos donde el usuario está matriculado
      const enrolledIds = new Set(enrolledCourses.map((c) => c.id_curso));
      filtered = filtered.filter((course) => enrolledIds.has(course.id_curso));
    } else if (filterType === "resultados") {
      // Mostrar solo los cursos con avance > 0
      const advancedCourses = new Set(
        enrolledCourses.filter((c) => c.avance > 0).map((c) => c.id_curso)
      );
      filtered = filtered.filter((course) =>
        advancedCourses.has(course.id_curso)
      );
    }

    setFilteredCourses(filtered);
  }, [searchTerm, filterType, courses, enrolledCourses]);

  return (
    <div>
      {error ? (
        <p className={styles.errorMessage}>Error: {error}</p>
      ) : (
        <div className={styles.container}>
          {/* Buscador */}
          <div className={styles.encabezadofiltro}>
            {/* Filtros */}
            <div className={styles.filters}>
              <button
                className={filterType === "todos" ? styles.activeFilter : ""}
                onClick={() => setFilterType("todos")}
              >
                Todos los cursos
              </button>
              <button
                className={
                  filterType === "misCursos" ? styles.activeFilter : ""
                }
                onClick={() => setFilterType("misCursos")}
              >
                Mis cursos
              </button>
              <button
                className={
                  filterType === "resultados" ? styles.activeFilter : ""
                }
                onClick={() => setFilterType("resultados")}
              >
                Resultados
              </button>
            </div>
            <div className={styles.search}>
              <input
                type="text"
                placeholder="Buscar cursos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Listado de cursos */}
          <ul className={styles.list}>
            {filteredCourses.map((course) => (
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
                    <p className={styles.recomendaciones}>
                      {course.recomendaciones}
                    </p>
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
