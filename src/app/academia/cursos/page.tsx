"use client";

import NavBar from "../../components/navbar/NavBar";
import Allcourses from "../../components/Curso/Allcourses"
import Breadcrumbs from "../../components/Breadcrumbs/breadcrumbs";
import BannerStatic from "../../components/BannerEstatico/BannerStatic";
import { Suspense } from "react";

const Page = () => {

  return (
    <>
      <NavBar/>
      <BannerStatic images={["/banneracademia.png"]} />
      <Suspense>
        {/* Breadcrumbs para navegación */}
        <Breadcrumbs /> 
      </Suspense>
      <Allcourses/>
    </>
  );
};

export default Page;