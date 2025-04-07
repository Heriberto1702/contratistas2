import React from "react";
import styles from "./Documentos.module.css";
import Image from "next/image";

interface DocumentoItem {
  title?: string;
  imageUrl: string;
  url: string;
  linkText?: string;
  logo?: string;
}

interface DocumentoProps {
  modules: DocumentoItem[];
}

const Documentos: React.FC<DocumentoProps> = ({ modules }) => {
  return (
    <div className={styles.contenedor}>
      <div className={styles.tipostarjetas}>
        {modules.map((module, index) => (
          <div key={index} className={styles.tarjetas}>
            <div
              className={styles.imagentarjeta}
              style={{ backgroundImage: `url(${module.imageUrl})` }}
            ></div>
            <div className={styles.tarjetacontenido}>
              {module.title && (
                <h2 className={styles.titulotarjeta}>{module.title}</h2>
              )}
              {module.logo && (
                <Image
                  src={module.logo}
                  alt={`${module.title} logo`}
                  width={102}
                  height={44}
                />
              )}
              <a
                href={module.url}
                className={styles.url}
                rel="noopener noreferrer"
              >
                {module.linkText || "Leer más " }&#10095;
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Documentos;
