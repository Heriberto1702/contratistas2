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
  const [id_contratista, setIdContratista] = useState<number | null>(null);
  const params = useParams(); // Obtener el ID del curso desde la URL

  useEffect(() => {
    const fetchContratistaId = async () => {
      try {
        const response = await fetch("/api/user/idcontratista");
        const data = await response.json();

        if (response.ok) {
          setIdContratista(data.id_contratista);
        } else {
          throw new Error("No se pudo obtener el ID del contratista.");
        }
      } catch (error: any) {
        setError(error.message || "Hubo un problema al obtener el ID del contratista.");
      }
    };

    fetchContratistaId();
  }, []);

  useEffect(() => {
    const formatDate = (isoDate: string): string => {
      const date = new Date(isoDate);
      return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${date.getFullYear()}`;
    };
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
          foundCourse.fecha_hora_Inicio = formatDate(foundCourse.fecha_hora_Inicio);
        foundCourse.fecha_hora_Fin = formatDate(foundCourse.fecha_hora_Fin);
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



  return (
    <>
      <NavBar />
      <BannerSlidernew images={images} interval={3000} />
    
      {id_contratista !== null && <CourseDetail course={course} id_contratista={id_contratista} />}

    </>
  );
};

export default CourseDetailPage;
