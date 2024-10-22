// src/app/course/[id]/page.tsx
import BannerSlidernew from "../../../components/BannerSlidernew/BannerSlidernew";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getCourseById } from "../../../../services/coursesServices";
import CourseDetail from "../../../components/CourseDetail/CourseDetail";
import { Course } from "../../../../types/course";

const CourseDetailPage = async ({ params }: { params: { id: string } }) => {
  const course: Course | null = await getCourseById(params.id);
  const images = ["/banneracademia.png"];
  if (!course) {
    return <div>Curso no encontrado</div>;
  }

  return (
    <>
      <header>
        <nav>
          <div>
            <Link href="/">
              <Image
                src="/logoContratista.png"
                alt="logo-Contratista"
                width={182}
                height={119}
              />
            </Link>
          </div>
          <div>
            <Link href="/compras">Compras</Link>
            <Link href="/academia">Academia para Contratistas</Link>
            <Link href="/documentosutiles">Documentos útiles</Link>
            <Link href="/cuenta">Cuenta</Link>
          </div>
        </nav>
      </header>
      <BannerSlidernew images={images} interval={3000} />
      <CourseDetail course={course} />;
    </>
  );
};

export default CourseDetailPage;
