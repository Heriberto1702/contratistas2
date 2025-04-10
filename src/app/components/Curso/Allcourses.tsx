import Link from "next/link";
import styles from "../../academia/cursos/CoursesPage.module.css";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("todos"); // todos | misCursos | resultados

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses/obtenerTodos");
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        if (Array.isArray(data)) {
          const activos = data.filter(course => course.activo); // 👈 filtras aquí
          setCourses(activos);
          setFilteredCourses(activos);
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

  useEffect(() => {
    let filtered = courses.map((course) => {
      const enrolledInfo = course.Cursos_Matriculados?.[0] || {};
      return {
        ...course,
        avance: enrolledInfo.avance || 0,
        estado: enrolledInfo.estado || "No inscrito",
      };
    });

    if (searchTerm) {
      filtered = filtered.filter((course) =>
        course.nombre_curso.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType === "misCursos") {
      filtered = filtered.filter((course) => course.estado !== "No inscrito");
    } else if (filterType === "resultados") {
      filtered = filtered.filter((course) => course.avance > 0);
    }

    setFilteredCourses(filtered);
  }, [searchTerm, filterType, courses]);

  return (
    <div>
      {error ? (
        <p className={styles.errorMessage}>Error: {error}</p>
      ) : (
        <div className={styles.container}>
          <div className={styles.encabezadofiltro}>
            <div className={styles.filters}>
              <button
                className={filterType === "todos" ? styles.activeFilter : ""}
                onClick={() => setFilterType("todos")}
              >
                Todos los cursos
              </button>
              <button
                className={filterType === "misCursos" ? styles.activeFilter : ""}
                onClick={() => setFilterType("misCursos")}
              >
                Mis cursos
              </button>
              <button
                className={filterType === "resultados" ? styles.activeFilter : ""}
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

          <ul className={styles.list}>
            {filteredCourses.map((course) => (
              <li key={course.id_curso} className={styles.listItem}>
                <div className={styles.continarcurso}>
                  {/* Enlace alrededor de la imagen y el texto */}
                  <Link href={`/academia/cursos/${course.id_curso}`} passHref>
                    <div className={styles.continarimage}>
                      <Image
                        className={styles.configimage}
                        width={392}
                        height={156}
                        src={course.imagen_curso}
                        alt={course.nombre_curso}
                      />
                      <div className={styles.imageHoverText}>Ver curso</div>
                    </div>
                  </Link>
                  <div className={styles.continarinfo}>
                    <div className={styles.continartext}>
                      <h2 className={styles.title}>{course.nombre_curso}</h2>
                      <span
                        className={`${styles.avance} ${
                          filterType === "resultados" ? styles.resultado : ""
                        }`}
                      >
                        {filterType === "resultados" &&
                          `Avance: ${course.avance}%`}
                        {filterType === "misCursos" && course.estado}
                      </span>
                    </div>
                    <p>{course.descripcion}</p>
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
