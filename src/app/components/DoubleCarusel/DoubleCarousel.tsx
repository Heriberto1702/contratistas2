"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import styles from "./DoubleCarousel.module.css";
import Link from "next/link";
import TitleText from "../Text/TitleText";

interface Curso {
  id_curso: number;
  imagen_curso: string;
  nombre_curso: string;
  descripcion: string;
  destacado: boolean;
}

const DoubleCarousel: React.FC = () => {
  const [cursosDestacados, setCursosDestacados] = useState<Curso[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesToShow = 1;
  const autoplaySpeed = 3000;

  const fetchCursos = async () => {
    try {
      const response = await fetch("/api/cursos/obtenerTodos");
      const data = await response.json();

      const destacados = data.filter(
        (curso: Curso) => curso.destacado === true
      );
      setCursosDestacados(destacados);
    } catch (error) {
      console.error("Error al obtener cursos destacados:", error);
    }
  };

  useEffect(() => {
    fetchCursos();
  }, []);

  const totalSlides = cursosDestacados.length;
  const infiniteCursos = [...cursosDestacados, ...cursosDestacados];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? totalSlides - 1 : prevSlide - 1
    );
  }, [totalSlides]);

  useEffect(() => {
    if (cursosDestacados.length > 0) {
      const interval = setInterval(nextSlide, autoplaySpeed);
      return () => clearInterval(interval);
    }
  }, [nextSlide, cursosDestacados]);

  // Si no hay cursos destacados, no renderiza nada
  if (cursosDestacados.length === 0) return null;

  return (
    <>
      <TitleText subtitle="Conoce nuestros cursos destacados" />
      <div className={styles.carouselContainer}>
        <div
          className={styles.carouselTrack}
          style={{
            transform: `translateX(-${(currentSlide * 100) / slidesToShow}%)`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          {infiniteCursos.map((curso, index) => (
            <div
              className={styles.carouselSlide}
              key={index}
              style={{ width: `calc(100% / ${slidesToShow} - 5px)` }}
            >
              <div className={styles.bannerItem}>
                <div className={styles.bannerContent}>
                  <h3 className={styles.bannerTitle}>{curso.nombre_curso}</h3>
                  <Link
                    href={`/academia/cursos/${curso.id_curso}`}
                    className={styles.bannerLink}
                  >
                    Ver curso &#10095;
                  </Link>
                </div>
                <Image
                  width={591}
                  height={317}
                  src={curso.imagen_curso}
                  alt={curso.nombre_curso}
                  className={styles.bannerImage}
                />
              </div>
            </div>
          ))}
        </div>
        <button className={styles.prevBtn} onClick={prevSlide}>
          &#10094;
        </button>
        <button className={styles.nextBtn} onClick={nextSlide}>
          &#10095;
        </button>
      </div>
    </>
  );
};
export default DoubleCarousel;
