"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Styles  from './NavBar.module.css';
const Footer: React.FC = () => {
  return (
<header className={Styles.header}>
        <nav className={Styles.nav}>
          <div>
            <Link href="/">
              <Image
                src="/logoContratista.png"
                alt="logo-Contratista"
                width={182}
                height={119}
              />
            </Link>
          </div>
          <div>
            <Link className={Styles.a} href="/compras">Compras</Link>
            <Link className={Styles.a} href="/academia">Academia para Contratistas</Link>
            <Link className={Styles.a} href="/documentosutiles">Documentos útiles</Link>
            <Link className={Styles.a} href="/galeria">Galeria</Link>
            <Link className={Styles.a} href="/datos">Cuenta</Link>
          </div>
        </nav>
      </header>
  );
};

export default Footer;      