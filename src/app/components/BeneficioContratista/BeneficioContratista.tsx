"use client";
import React, { useState } from "react";
import Styles from "./BenericioContratista.module.css";
import Image from "next/image";
import Link from "next/link";

interface BeneficioContratistaProps {
  nombreClub: string;
}

interface Beneficio {
  titulo: string;
  descripcion: string;
  imageUrl?: string;
  link?: string;
}

const UserMembershipInfo: React.FC<BeneficioContratistaProps> = ({
  nombreClub,
}) => {
  // Beneficios para cada tipo de club
  const beneficiosGold: Beneficio[] = [
    {
      titulo: "Asesoría personalizada oro",
      descripcion:
        "Recibe orientación experta adaptada a tus necesidades y proyectos.",
      link: "https://www.sinsa.com.ni",
    },
    {
      titulo: "Descuentos preferenciales oro",
      descripcion:
        "Accede a precios especiales en una amplia gama de productos. Aplica para tienda física y compra por whatsapp. No aplica para compras en Web.",
      imageUrl: "/descuentospreferenciales.png",
    },
    {
      titulo: "Capacitación y talleres prácticos oro",
      descripcion:
        "Mejora tus conocimientos con entrenamientos especializados, sesiones interactivas para el desarrollo de su trabajo, de manera online o presencial según calendario.",
    },
    {
      titulo: "Visitas a fábricas oro",
      descripcion:
        "Conoce de primera mano los procesos de producción y descubre nuevas soluciones para tus proyectos.",
    },
    {
      titulo: "Programa de Cash Back y puntos oro",
      descripcion:
        "Acumula beneficios por tus compras y canjéalos por productos o descuentos.",
    },
    {
      titulo: "Línea de crédito preferencial con Credex oro",
      descripcion:
        "Disfruta de financiamiento exclusivo con condiciones favorables.",
    },
    {
      titulo: "Descuentos en otros comercios oro",
      descripcion: "Obtén beneficios adicionales en establecimientos aliados.",
    },
  ];

  const beneficiosPlatinum: Beneficio[] = [
    {
      titulo: "Asesoría personalizada plata",
      descripcion:
        "Recibe orientación experta adaptada a tus necesidades y proyectos.",
    },
    {
      titulo: "Descuentos preferenciales plata",
      descripcion:
        "Accede a precios especiales en una amplia gama de productos. Aplica para tienda física y compra por whatsapp. No aplica para compras en Web.",
      imageUrl: "/descuentospreferenciales.png",
    },
    {
      titulo: "Capacitación y talleres prácticos plata",
      descripcion:
        "Mejora tus conocimientos con entrenamientos especializados, sesiones interactivas para el desarrollo de su trabajo, de manera online o presencial según calendario.",
    },
    {
      titulo: "Visitas a fábricas plata",
      descripcion:
        "Conoce de primera mano los procesos de producción y descubre nuevas soluciones para tus proyectos.",
    },
    {
      titulo: "Programa de Cash Back y puntos plata",
      descripcion:
        "Acumula beneficios por tus compras y canjéalos por productos o descuentos.",
    },
    {
      titulo: "Línea de crédito preferencial con Credex plata",
      descripcion:
        "Disfruta de financiamiento exclusivo con condiciones favorables.",
    },
    {
      titulo: "Descuentos en otros comercios plata",
      descripcion: "Obtén beneficios adicionales en establecimientos aliados.",
    },
  ];

  const beneficiosBronce: Beneficio[] = [
    {
      titulo: "Asesoría personalizada bronce",
      descripcion:
        "Recibe orientación experta adaptada a tus necesidades y proyectos.",
    },
    {
      titulo: "Descuentos preferenciales bronce",
      descripcion:
        "Accede a precios especiales en una amplia gama de productos. Aplica para tienda física y compra por whatsapp. No aplica para compras en Web.",
      imageUrl: "/descuentospreferenciales.png",
    },
    {
      titulo: "Capacitación y talleres prácticos bronce",
      descripcion:
        "Mejora tus conocimientos con entrenamientos especializados, sesiones interactivas para el desarrollo de su trabajo, de manera online o presencial según calendario.",
    },
    {
      titulo: "Visitas a fábricas bronce",
      descripcion:
        "Conoce de primera mano los procesos de producción y descubre nuevas soluciones para tus proyectos.",
    },
    {
      titulo: "Programa de Cash Back y puntos bronce",
      descripcion:
        "Acumula beneficios por tus compras y canjéalos por productos o descuentos.",
    },
    {
      titulo: "Línea de crédito preferencial con Credex bronce",
      descripcion:
        "Disfruta de financiamiento exclusivo con condiciones favorables.",
    },
    {
      titulo: "Descuentos en otros comercios bronce",
      descripcion: "Obtén beneficios adicionales en establecimientos aliados.",
    },
  ];

  // Estado para manejar la apertura y cierre de cada beneficio
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null); // Cierra el acordeón si está abierto
    } else {
      setOpenIndex(index); // Abre el acordeón correspondiente
    }
  };

  return (
    <div className={Styles.container}>
      {nombreClub === "Gold" ? (
        <div className={Styles.subcontainer}>
          <div className={Styles.imagen}>
            <div className={Styles.imagenes}>
              <Image
                className={Styles.imagen1}
                src={"/gold.png"}
                width={497}
                height={331}
                alt="Imagen Gold"
              />
              <Image
                className={Styles.imagen2}
                src={"/oro.png"}
                width={214}
                height={214}
                alt="Imagen Contratista Oro"
              />
            </div>
            <p>Club contratista GOLD</p>
          </div>

          {/* Acordeón de beneficios para Gold */}
          <div className={Styles.acordion}>
            {beneficiosGold.map((beneficio, index) => (
              <div
                key={index}
                className={`${Styles.accordionItem} ${
                  openIndex === index ? Styles.open : ""
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className={Styles.accordionButton}
                >
                  {beneficio.titulo}
                  {openIndex === index && (
                    <div className={Styles.accordionContent}>
                      <p>{beneficio.descripcion}</p>
                      {beneficio.imageUrl && (
                        <div className={Styles.imageContainer}>
                          <Image
                            src={beneficio.imageUrl}
                            width={646}
                            height={506}
                            alt={beneficio.titulo}
                            className={Styles.benefitImage}
                          />
                        </div>
                      )}
                      {beneficio.link && (
                        <Link href={beneficio.link}>sinsa.com.ni</Link>
                      )}
                    </div>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : nombreClub === "Platinum" ? (
        <div className={Styles.subcontainer}>
          <div className={Styles.imagen}>
            <div className={Styles.imagenes}>
              <Image
                className={Styles.imagen1}
                src={"/platinum.png"}
                width={497}
                height={331}
                alt="Imagen Platinum"
              />
              <Image
                className={Styles.imagen2}
                src={"/plata.png"}
                width={214}
                height={214}
                alt="Imagen Contratista Plata"
              />
            </div>
            <p>Club contratista PLATINUM</p>
          </div>

          {/* Acordeón de beneficios para Platinum */}
          <div className={Styles.acordion}>
            {beneficiosPlatinum.map((beneficio, index) => (
              <div
                key={index}
                className={`${Styles.accordionItem} ${
                  openIndex === index ? Styles.open : ""
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className={Styles.accordionButton}
                >
                  {beneficio.titulo}
                  {openIndex === index && (
                    <div className={Styles.accordionContent}>
                      <p>{beneficio.descripcion}</p>
                      {beneficio.imageUrl && (
                        <div className={Styles.imageContainer}>
                          <Image
                            src={beneficio.imageUrl}
                            width={646}
                            height={506}
                            alt={beneficio.titulo}
                            className={Styles.benefitImage}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : nombreClub === "Bronze" ? (
        <div className={Styles.subcontainer}>
          <div className={Styles.imagen}>
            <div className={Styles.imagenes}>
              <Image
                className={Styles.imagen1}
                src={"/platinum.png"}
                width={497}
                height={331}
                alt="Imagen Bronce"
              />
              <Image
                className={Styles.imagen2}
                src={"/plata.png"}
                width={214}
                height={214}
                alt="Imagen Contratista Bronce"
              />
            </div>
            <p>Club contratista BRONCE</p>
          </div>

          {/* Acordeón de beneficios para Platinum */}
          <div className={Styles.acordion}>
            {beneficiosBronce.map((beneficio, index) => (
              <div
                key={index}
                className={`${Styles.accordionItem} ${
                  openIndex === index ? Styles.open : ""
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className={Styles.accordionButton}
                >
                  {beneficio.titulo}
                  {openIndex === index && (
                    <div className={Styles.accordionContent}>
                      <p>{beneficio.descripcion}</p>
                      {beneficio.imageUrl && (
                        <div className={Styles.imageContainer}>
                          <Image
                            src={beneficio.imageUrl}
                            width={646}
                            height={506}
                            alt={beneficio.titulo}
                            className={Styles.benefitImage}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserMembershipInfo;
