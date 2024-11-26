import BannerSlidernew from "../../../components/BannerSlidernew/BannerSlidernew";
import React from "react";

import { getCourseById } from "../../../../services/coursesServices";
import CourseDetail from "../../../components/CourseDetail/CourseDetail";
import { Course } from "../../../../types/course";
import NavBar from "../../../components/navbar/NavBar";

// El tipo de `PageProps` debe importarse directamente si es necesario.
type PageProps = {
  params: {
    id: string;
  };
};

const CourseDetailPage = async ({ params }: PageProps) => {
  const course: Course | null = await getCourseById(params.id);
  const images = ["/banneracademia.png"];

  if (!course) {
    return <div>Curso no encontrado</div>;
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