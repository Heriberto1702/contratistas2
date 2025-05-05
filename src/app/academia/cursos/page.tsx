"use client";

import NavBar from "../../components/navbar/NavBar";
import Allcourses from "../../components/Curso/Allcourses"
import Breadcrumbs from "../../components/Breadcrumbs/breadcrumbs";
import BannerStatic from "../../components/BannerEstatico/BannerStatic";

const Page = () => {

  return (
    <>
      <NavBar/>
      <BannerStatic images={["/banneracademia.png"]} />
      <Breadcrumbs />
      <Allcourses/>
    </>
  );
};

export default Page;