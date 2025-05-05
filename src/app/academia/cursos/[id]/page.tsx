"use client";

import { useParams } from "next/navigation";
import BannerStatic from "../../../components/BannerEstatico/BannerStatic";
import NavBar from "../../../components/navbar/NavBar";
import CourseDetail from "../../../components/CourseDetail/CourseDetail";
import { useSession } from "next-auth/react";

const CourseDetailPage = () => {
  const { data: session } = useSession();  // Obtener la sesión del usuario   
  const params = useParams();
  const id_curso = params.id as string;
  const id_contratista = session?.user?.id || "";
  return (
    <>
      <NavBar />
      <BannerStatic images={["/banneracademia.png"]} />
      <CourseDetail id_curso={id_curso} id_contratista={id_contratista} /> 
    </>
  );
};

export default CourseDetailPage;
