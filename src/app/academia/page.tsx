import React from "react";
import EventCalendar from "@/app/components/EventCalendar";
import BannerCarousel from "../components/BannerCarousel";
import TextCard from "../components/TextCard";

const Page = () => {
  const bannerImages = ["/banneracademia.png", "/banneracademia.png"];

  return (
    <>
      <div>
        <BannerCarousel images={bannerImages} />
      </div>
      <TextCard
        title="¿Qué es academia para Contratistas?"
        content="Es una plataforma online de capacitación del Círculo de Especialistas en la que solo por ser socio podrá aprender diversas técnicas y conocer nuevos productos e innovaciones para perfeccionar su trabajo."
      />
      <TextCard title="¿Qué puede encontrar en nuestra Academia para especialistas?" />
      <EventCalendar />
    </>
  );
};

export default Page;
