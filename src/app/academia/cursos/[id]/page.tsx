// src/app/course/[id]/page.tsx
import BannerSlidernew from "../../../components/BannerSlidernew/BannerSlidernew";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getCourseById } from "../../../../services/coursesServices";
import CourseDetail from "../../../components/CourseDetail/CourseDetail";
import { Course } from "../../../../types/course";
import NavBar from "../../../components/navbar/NavBar";
const CourseDetailPage = async ({ params }: { params: { id: string } }) => {
  const course: Course | null = await getCourseById(params.id);
  const images = ["/banneracademia.png"];
  if (!course) {
    return <div>Curso no encontrado</div>;
  }

  return (
    <>
      <NavBar />
      <BannerSlidernew images={images} interval={3000} />
      <CourseDetail course={course} />;
    </>
  );
};

export default CourseDetailPage;
