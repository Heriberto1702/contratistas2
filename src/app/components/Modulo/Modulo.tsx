import React from "react";
import styles from "./Modulo.module.css";

interface ModuloProps {
  title?: string;
  imageUrl: string;
  url: string;
  linkText?: string;
  title2?: string;
  imageUrl2: string;
  url2: string;
  linkText2?: string;
  title3?: string;
  imageUrl3: string;
  url3: string;
  linkText3?: string;
}

const Modulo: React.FC<ModuloProps> = ({ title, imageUrl, url, linkText = "Leer más",title2, imageUrl2, url2, linkText2 = "Leer más",title3, imageUrl3, url3, linkText3 = "Leer más", }) => {
  return (
    <>
    <div
      className={styles.container}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '200px',
      }}
    >
      {title && <h2 className={styles.title}>{title}</h2>}
      <a href={url} className={styles.url}  rel="noopener noreferrer">
        {linkText}
      </a>
    </div>
    <div
      className={styles.container}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imageUrl2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '200px',
      }}
    >
      {title2 && <h2 className={styles.title}>{title2}</h2>}
      <a href={url2} className={styles.url}  rel="noopener noreferrer">
        {linkText2}
      </a>
    </div>
    <div
      className={styles.container}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imageUrl3})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '200px',
      }}
    >
      {title3 && <h2 className={styles.title}>{title3}</h2>}
      <a href={url3} className={styles.url}  rel="noopener noreferrer">
        {linkText3}
      </a>
    </div>
    </>
  );
};

export default Modulo;