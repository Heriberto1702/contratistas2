import React from "react";
import { Card, CardHeader, Button } from "@nextui-org/react";
import styles from "./Cards.module.css";

const Cards: React.FC = () => {
  return (
    <div className={styles.cardsContainer}>
      <Card className={styles.card}>
        <CardHeader className={`${styles.cardHeader} ${styles.contratista}`}>
          <h2 className={styles.categoria}>CONTRATISTA <span className={styles.bigsymbol}>&#9829; </span></h2>
          <p className={styles.texto}>Acumulando</p>
          <h3 className={`${styles.texto} ${styles.puntos}`}>5.000 <span className={styles.span}>puntos</span></h3>
          <p className={styles.texto}>
            En nuestras tiendas o comprando $900.000 en ellas.
          </p>
        </CardHeader>
        <div className={styles.cardBody}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            animi quisquam perspiciatis repudiandae sapiente ipsam beatae
            aliquam, deserunt blanditiis ab voluptatibus neque accusamus esse
            reprehenderit. Voluptatum atque vitae quas. Asperiores.
          </p>

          <Button className={styles.buttonClass} radius="full" size="sm">
            Ver más &#10095;
          </Button>
        </div>
      </Card>

      <Card className={styles.card}>
        <CardHeader className={`${styles.cardHeader} ${styles.oro}`}>
          <h2 className={styles.categoria}>ORO <span className={styles.bigstar}>&#9733;</span></h2>
          <p className={styles.texto}>Acumulando</p>
          <h3 className={`${styles.texto} ${styles.puntos}`}>15.000 <span className={styles.span}>puntos</span></h3>
          <p className={styles.texto}>
            En nuestras tiendas o formando parte de nuestro CLUB PRO.
          </p>
        </CardHeader>
        <div className={styles.cardBody}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            animi quisquam perspiciatis repudiandae sapiente ipsam beatae
            aliquam, deserunt blanditiis ab voluptatibus neque accusamus esse
            reprehenderit. Voluptatum atque vitae quas. Asperiores.
          </p>
          <Button className={styles.buttonClass} radius="full" size="sm">
            Ver más &#10095;
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Cards;
