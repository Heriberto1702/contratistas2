"use client";

import React from 'react';
import styles from './Footer.module.css';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
      <Image src="/logoContratista.png" alt="logo-Contratista" width={200} height={100} />
        <div className={styles.navSection}>
          <ul className={styles.navList}>
            <li className={styles.navItem}><a href="/terminos-y-condiciones">Términos y condiciones</a></li>
            <li className={styles.navItem}><a href="/reglamento-de-programa">Reglamento del programa</a></li>
          </ul>
        </div>
      </div>
      <div className={styles.bottomSection}>
        <p>&copy;  {new Date().getFullYear()} Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;