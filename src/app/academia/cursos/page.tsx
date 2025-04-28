"use client";

import BannerSlidernew from "../../components/BannerSlidernew/BannerSlidernew";
import NavBar from "../../components/navbar/NavBar";
import Allcourses from "../../components/Curso/Allcourses"
import Breadcrumbs from "../../components/Breadcrumbs/breadcrumbs";

const Page = () => {
  const images = ["/banneracademia.png"];
  return (
    <>
      <NavBar/>
      <BannerSlidernew images={images} interval={3000} />
      <Breadcrumbs />
      <Allcourses/>
    </>
  );
};

export default Page;