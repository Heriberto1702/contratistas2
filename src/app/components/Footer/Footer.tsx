"use client";

import React from "react";
import styles from "./Footer.module.css";
import Image from "next/image";
import logo from "/public/logofooter.png"; // Asegúrate de que la ruta sea correcta

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.bottomSection}>
        <Image src={logo} alt="Logo" width={100} height={50} className={styles.logo} />
        <p>&copy; {new Date().getFullYear()} - Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
