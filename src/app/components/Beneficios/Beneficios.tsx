import styles from './Beneficios.module.css';
import Image from 'next/image';
interface Beneficio {
  id: number;
  imagen: string;
  titulo: string;
  descripcion: string;
  descuento: string;
}

const beneficios: Beneficio[] = [
  {
    id: 1,
    imagen: '/images/beneficio1.jpg',
    titulo: 'EL ZOCALO',
    descripcion: 'Aprovecha solo viernes mexicanos',
    descuento: '10% de descuento',
  },
  {
    id: 2,
    imagen: '/images/beneficio2.jpg',
    titulo: 'TIP TOP',
    descripcion: 'Aplica en todos los combos.',
        descuento: '20% de descuento',
  },
  // Añade más beneficios aquí...
  {
    id: 3,
    imagen: '/images/beneficio3.jpg',
    titulo: 'ZACATELIMON',
    descripcion: 'Por compra de mas de C$500',
    descuento: '10% de descuento',
  },
  {
    id: 4,
    imagen: '/images/beneficio4.jpg',
    titulo: 'BUFFALO WINGSl',
    descripcion: 'Aplica solo a combo chunks.',
    descuento: '10% de descuento',
  },
  {
    id: 5,
    imagen: '/images/beneficio5.jpg',
    titulo: 'CINEMAS',
    descripcion: 'En Cinemas Galerías, Plaza Inter y VIP',
    descuento: '15% de descuento',
  },
  {
    id: 6,
    imagen: '/images/beneficio6.jpg',
    titulo: 'HOOTERS',
    descripcion: 'Aplica en alitas los dias jueves.',
    descuento: '15% de descuento',
  },
  {
    id: 7,
    imagen: '/images/beneficio7.jpg',
    titulo: 'EL MOLINO',
    descripcion: 'Por compra de mas de C$500',
    descuento: '5% de descuento ',
  },
  {
    id: 8,
    imagen: '/images/beneficio8.jpg',
    titulo: 'CHIK CHAK',
    descripcion: 'Beneficio en menu corporativo.',
    descuento: '10% de descuento',
  },
];

const Beneficios: React.FC = () => {
  return (
    <div className={styles.grid}>
      {beneficios.map((beneficio) => (
        <div key={beneficio.id} className={styles.card}>
          <Image width={1000} height={1000} src={beneficio.imagen} alt={beneficio.titulo} className={styles.image} />
          <h3 className={styles.titulo}>{beneficio.titulo}</h3>
          <p className={styles.descripcion}>{beneficio.descripcion}</p>
          <p className={styles.descuento}>{beneficio.descuento}</p>
        </div>
      ))}
    </div>
  );
};

export default Beneficios;
