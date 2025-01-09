import styles from './Beneficios.module.css';

interface Beneficio {
  id: number;
  imagen: string;
  descripcion: string;
  titulo: string;
  descuento: string;
}

const beneficios: Beneficio[] = [
  {
    id: 1,
    imagen: '/images/beneficio1.jpg',
    descripcion: 'Aprovecha solo viernes mexicanos',
    titulo: 'EL ZOCALO',
    descuento: '10%',
  },
  {
    id: 2,
    imagen: '/images/beneficio2.jpg',
    descripcion: 'Aplica en todos los combos.',
    titulo: 'TIP TOP',
    descuento: '20%',
  },
  // Añade más beneficios aquí...
  {
    id: 3,
    imagen: '/images/beneficio3.jpg',
    descripcion: 'Por compra de mas de C$500',
    titulo: 'ZACATELIMON',
    descuento: '10%',
  },
  {
    id: 4,
    imagen: '/images/beneficio4.jpg',
    descripcion: 'Aplica solo a combo chunks.',
    titulo: 'BUFFALO WINGSl',
    descuento: '10%',
  },
  {
    id: 5,
    imagen: '/images/beneficio5.jpg',
    descripcion: 'En Cinemas Galerías, Plaza Inter y VIP',
    titulo: 'CINEMAS',
    descuento: '15%',
  },
  {
    id: 6,
    imagen: '/images/beneficio6.jpg',
    descripcion: 'Aplica en alitas los dias jueves.',
    titulo: 'HOOTERS',
    descuento: '15%',
  },
  {
    id: 7,
    imagen: '/images/beneficio7.jpg',
    descripcion: 'Por compra de mas de C$500',
    titulo: 'EL MOLINO',
    descuento: '5%',
  },
  {
    id: 8,
    imagen: '/images/beneficio8.jpg',
    descripcion: 'Beneficio en menu corporativo.',
    titulo: 'CHIK CHAK',
    descuento: '10%',
  },
];

const Beneficios: React.FC = () => {
  return (
    <div className={styles.grid}>
      {beneficios.map((beneficio) => (
        <div key={beneficio.id} className={styles.card}>
          <img src={beneficio.imagen} alt={beneficio.titulo} className={styles.image} />
          <p className={styles.descripcion}>{beneficio.descripcion}</p>
          <h3 className={styles.titulo}>{beneficio.titulo}</h3>
          <p className={styles.descuento}>{beneficio.descuento}</p>
        </div>
      ))}
    </div>
  );
};

export default Beneficios;
