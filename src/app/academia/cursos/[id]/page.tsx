"use client";

import BannerSlidernew from "../../../components/BannerSlidernew/BannerSlidernew";
import NavBar from "../../../components/navbar/NavBar";
import CourseDetail from "../../../components/CourseDetail/CourseDetail";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Course {
  id_curso: string;
  nombre_curso: string;
  fecha_hora_Inicio: string;
  fecha_hora_Fin: string;
  hora: string;
  detalles_curso:string;
  imagen_curso: string;
  recomendaciones: string;
  tipo_curso:string;
}

const CourseDetailPage = () => {
  const [course, setCourse] = useState<Course | null>(null);
  const [error, setError] = useState<string | null>(null);
  const params = useParams(); // Obtener el ID del curso desde la URL

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch("/api/courses/obtener");
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data: Course[] = await response.json();

        // Buscar el curso por ID
        const foundCourse = data.find((c) => c.id_curso == params.id);

        if (foundCourse) {
          setCourse(foundCourse);
        } else {
          throw new Error("Curso no encontrado.");
        }
      } catch (error: any) {
        setError(error.message || "Hubo un problema al cargar el curso.");
      }
    };

    fetchCourse();
  }, [params.id]);

  const images = ["/banneracademia.png"];

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!course) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <NavBar />
      <BannerSlidernew images={images} interval={3000} />
      <CourseDetail course={course} />
    </>
  );
};

export default CourseDetailPage;
