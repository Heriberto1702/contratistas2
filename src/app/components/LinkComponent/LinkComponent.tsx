import Link from 'next/link';
import React from 'react';
import styles from './LinkComponent.module.css'; // Importa el archivo de CSS modules

interface LinkComponentProps {
  href: string;
  text: string;
}

const LinkComponent: React.FC<LinkComponentProps> = ({ href, text }) => {
  return (
    <Link href={href} className={`${styles.link} ${styles.posicion}`}
    >
      {text}
    </Link>
  );
};

export default LinkComponent;