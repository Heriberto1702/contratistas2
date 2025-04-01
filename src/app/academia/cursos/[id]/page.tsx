"use client";

import { useParams } from "next/navigation";
import BannerSlidernew from "../../../components/BannerSlidernew/BannerSlidernew";
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
      <BannerSlidernew images={["/banneracademia.png"]} interval={3000} />
      <CourseDetail id_curso={id_curso} id_contratista={id_contratista} /> 
    </>
  );
};

export default CourseDetailPage;
