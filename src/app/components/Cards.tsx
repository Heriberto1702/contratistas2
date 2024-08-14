import React from "react";
import { Card, CardHeader, Button } from "@nextui-org/react";
import styles from "./Cards.module.css";

const Cards: React.FC = () => {
  return (
    <div className={styles.cardsContainer}>


      <Card className={styles.card}>
        <CardHeader className={`${styles.cardHeader} ${styles.contratista}`}>
          <h2 className={styles.texto}>CONTRATISTA</h2>
          <p  className={styles.texto}>Acumulando</p>
          <h3  className={styles.texto}>5.000 puntos</h3>
          <p  className={styles.texto}>En nuestras tiendas o comprando $900.000 en ellas.</p>
        </CardHeader>
        <p className={styles.cardBody}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto animi quisquam perspiciatis repudiandae sapiente ipsam beatae aliquam, deserunt blanditiis ab voluptatibus neque accusamus esse reprehenderit. Voluptatum atque vitae quas. Asperiores.</p>
        <Button  className={styles.buttonClass} radius="full" size="sm">
           Ver más
        </Button>
      </Card>


      <Card className={styles.card}>
        <CardHeader className={`${styles.cardHeader} ${styles.oro}`}>
          <h2 className={styles.texto}>ORO</h2>
          <p className={styles.texto}>Acumulando</p>
          <h3 className={styles.texto}>15.000 puntos</h3>
          <p className={styles.texto}>En nuestras tiendas o formando parte de nuestro CLUB PRO.</p>
        </CardHeader>
        <p className={styles.cardBody}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto animi quisquam perspiciatis repudiandae sapiente ipsam beatae aliquam, deserunt blanditiis ab voluptatibus neque accusamus esse reprehenderit. Voluptatum atque vitae quas. Asperiores.</p>
        <Button  className={styles.buttonClass} radius="full" size="sm">
           Ver más
        </Button>
      </Card>


    </div>
  );
};

export default Cards;
