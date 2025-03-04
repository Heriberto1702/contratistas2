"use client";

import React from 'react';
import styles from './Footer.module.css';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
   
      <div className={styles.bottomSection}>
        <p>&copy;  {new Date().getFullYear()} - Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;