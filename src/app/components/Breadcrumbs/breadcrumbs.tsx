'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Styles from './Breadcrumbs.module.css';

// Mapa de conversiones
const breadcrumbsMap: Record<string, string> = {
  documentosutiles: 'Documentos Útiles',
  presupuesto: 'Presupuesto',
  fidelizar: 'Fidelizar Clientes',
  beneficios: 'Beneficios',
};

// Mapa para niveles (query param)
const nivelMap: Record<string, string> = {
  oro: 'Nivel Oro',
  plata: 'Nivel Plata',
  bronce: 'Nivel Bronce',
};

const Breadcrumbs = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const nivel = searchParams.get('nivel') ?? '';

  const pathSegments = pathname.split('/').filter(Boolean);

  // Si estamos en /beneficios con nivel válido, mostrar sólo Inicio / Nivel X
  if (pathSegments.length === 1 && pathSegments[0] === 'beneficios' && nivelMap[nivel.toLowerCase()]) {
    return (
      <div className={Styles.breadcrumbContainer}>
        <Link href="/" className={Styles.breadcrumbLink}>
          Inicio
        </Link>
        <span className={Styles.breadcrumbSeparator}> / </span>
        <span className={Styles.breadcrumbLink} style={{ cursor: 'default', color: 'gray' }}>
          {nivelMap[nivel.toLowerCase()]}
        </span>
      </div>
    );
  }

  // Para cualquier otra ruta, generar breadcrumb normalmente
  const breadcrumbLinks = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const breadcrumbName =
      breadcrumbsMap[segment] ||
      segment.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());

    return { name: breadcrumbName, href };
  });

  return (
    <div className={Styles.breadcrumbContainer}>
      <Link href="/" className={Styles.breadcrumbLink}>
        Inicio
      </Link>
      {breadcrumbLinks.map((breadcrumb, index) => (
        <span key={index}>
          <span className={Styles.breadcrumbSeparator}> / </span>
          <Link href={breadcrumb.href} className={Styles.breadcrumbLink}>
            {breadcrumb.name}
          </Link>
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
