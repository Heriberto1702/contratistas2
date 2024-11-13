"use client";

import BannerSlidernew from "../../components/BannerSlidernew/BannerSlidernew";
import React, { useState, useEffect } from "react";
import NavBar from "../../components/navbar/NavBar";
import { getCourses } from "../../../services/coursesServices";
import { Course } from "../../../types/course";
import styles from "./CoursesPage.module.css"; // Importar el CSS
import Link from "next/link";
import Image from "next/image";
const Page = () => {
  const images = ["/banneracademia.png"];
  
  const [courses, setCourses] = useState<Course[]>([]);
  const [filter, setFilter] = useState<"all" | "enrolled" | "results">("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Estado para manejar la página actual
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 3; // Mostrar 3 cursos por página

  useEffect(() => {
    const fetchCourses = async () => {
      const coursesData: Course[] = await getCourses();
      setCourses(coursesData);
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "enrolled" && course.isEnrolled) ||
      (filter === "results" && course.hasResults);
    
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Lógica para la paginación
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;
  const currentCourses = filteredCourses.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <NavBar/>
      <BannerSlidernew images={images} interval={3000} />
      
      <div className={styles.container}>
        <div className={styles.encabezado}>
          <div className={styles.filters}>
            <button onClick={() => setFilter("all")}>Todos los Cursos</button>
            <button onClick={() => setFilter("enrolled")}>Cursos Inscritos</button>
            <button onClick={() => setFilter("results")}>Resultados de Cursos</button>
          </div>
          <div className={styles.search}>
            <input
              type="text"
              placeholder="Buscar curso..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Lista de cursos paginada */}
        <ul className={styles.list}>
          {currentCourses.map((course) => (
            <li key={course.id} className={styles.listItem}>
              <div className={styles.continarcurso}>
                <div className={styles.continarimage}>
                  <Image
                    className={styles.configimage}
                    width={392}
                    height={156}
                    src={course.image}
                    alt=""
                  />
                </div>
                <div className={styles.continarinfo}>
                  <h2 className={styles.title}>{course.title}</h2>
                  <p>Inicio el: {course.inicio}</p>
                  <p>Finaliza el: {course.fin}</p>
                  <p>Hora de inicio curso: {course.hora}</p>
                  <div
                    className={styles.recomendaciones}
                    dangerouslySetInnerHTML={{ __html: course.recomendaciones }}
                  />
                  <Link
                    href={`/academia/cursos/${course.id}`}
                    className={styles.link}
                  >
                    Ver más
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Controles de paginación */}
        <div className={styles.pagination}>
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Siguiente
          </button>
        </div>
      </div>
    </>
  );
};

export default Page;