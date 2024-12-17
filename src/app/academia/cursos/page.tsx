"use client";

import BannerSlidernew from "../../components/BannerSlidernew/BannerSlidernew";
import NavBar from "../../components/navbar/NavBar";
import Allcourses from "../../components/Curso/Allcourses"

const Page = () => {
  const images = ["/banneracademia.png"];
  return (
    <>
      <NavBar/>
      <BannerSlidernew images={images} interval={3000} />
      <Allcourses/>
    </>
  );
};

export default Page;