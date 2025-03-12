"use client";

import BannerSlidernew from "../../../components/BannerSlidernew/BannerSlidernew";
import NavBar from "../../../components/navbar/NavBar";
import CourseDetail from "../../../components/CourseDetail/CourseDetail";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

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

const CourseDetailPage = () => {
  const { data: session } = useSession();
  const id_contratista = session?.user?.id_contratista ?? null; // Obtener id_contratista desde la sesión
  const [course, setCourse] = useState<Course | null>(null);
  const [error, setError] = useState<string | null>(null);
  const params = useParams(); // Obtener el ID del curso desde la URL

  useEffect(() => {
    if (!params.id) {
      setError("ID del curso no disponible");
      return;
    }
  
    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/courses/obtener?id_curso=${params.id}`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
  
        const data: Course = await response.json();
  
        setCourse({
          ...data,
          fecha_hora_Inicio: formatDate(data.fecha_hora_Inicio),
          fecha_hora_Fin: formatDate(data.fecha_hora_Fin),
        });
      } catch (error: any) {
        setError(error.message || "Hubo un problema al cargar el curso.");
      }
    };
  
    fetchCourse();
  }, [params.id]);
  

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  return (
    <>
      <NavBar />
      <BannerSlidernew images={["/banneracademia.png"]} interval={3000} />
      {id_contratista && course && <CourseDetail course={course} id_contratista={Number(id_contratista)} />}
      {error && <p className="text-red-500 text-center">{error}</p>}
    </>
  );
};

export default CourseDetailPage;
