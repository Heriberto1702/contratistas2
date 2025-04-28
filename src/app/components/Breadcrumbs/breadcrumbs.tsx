'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Styles from './Breadcrumbs.module.css';

// Mapa de conversiones
const breadcrumbsMap: Record<string, string> = {
  documentosutiles: 'Documentos Útiles', // Personalización de la ruta
  presupuesto: 'Presupuesto',
  fidelizar: 'Fidelizar Clientes',
  // Puedes agregar más conversiones si lo necesitas
};

const Breadcrumbs = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean); // Dividir la ruta en segmentos

  // Generamos los enlaces dinámicamente
  const breadcrumbLinks = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join('/')}`; // Crea el enlace completo para cada segmento

    // Si el segmento tiene una conversión personalizada en el mapa, se usa ese valor
    // Si no, reemplazamos guiones por espacios y capitalizamos la primera letra de cada palabra
    const breadcrumbName = breadcrumbsMap[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());

    return { name: breadcrumbName, href };
  });

  return (
    <div className={Styles.breadcrumbContainer}>
      <Link href="/" className={Styles.breadcrumbLink}>Inicio</Link>
      {breadcrumbLinks.map((breadcrumb, index) => (
        <span key={index}>
          <span className={Styles.breadcrumbSeparator}> / </span>
          <Link href={breadcrumb.href} className={Styles.breadcrumbLink}>
            {breadcrumb.name} {/* Nombre del breadcrumb con formato */}
          </Link>
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
