import Link from "next/link";
import styles from "./CourseDetail.module.css";
import Image from "next/image";
import React from "react";

interface Course {
  id_curso: string;
  nombre_curso: string;
  fecha_hora_Inicio: string;
  fecha_hora_Fin: string;
  hora: string;
  detalles_curso: string;
  imagen_curso: string;
  recomendaciones: string;
  tipo_curso:string;
}

interface CourseDetailProps {
  course: Course; // Recibir el curso como prop
}

const CourseDetail: React.FC<CourseDetailProps> = ({ course }) => {
  if (!course) {
    return <p className={styles.errorMessage}>Curso no encontrado.</p>;
  }

  return (
    <div className={styles.container}>
      <Link href={`/academia/cursos`} className={styles.back}>
        &#8592; Regresar
      </Link>
      <h1 className={styles.title}>{course.nombre_curso}</h1>
      <div className={styles.firstData}>
        <div className={styles.data}>
          <Image
            className={styles.image}
            width={128}
            height={100}
            src={course.imagen_curso}
            alt={course.nombre_curso}
          />
          <Link
            href={`/academia/secciones/${course.id_curso}`}
            className={styles.link}
          >
            Iniciar Curso &#62;
          </Link>
        </div>
        <div className={styles.datacurso}>
          <p>Inicia el: {course.fecha_hora_Inicio}</p>
          <p>Finaliza el: {course.fecha_hora_Fin}</p>
          <p>Hora de inicio curso: {course.hora}</p>
        </div>
      </div>
      <div className={styles.secondData}>
      <h3 className={styles.title}>Detalles del Curso</h3>
      <div>{course.detalles_curso }</div>
        <h3 className={styles.title}>Recomendaciones</h3>
        <div>{course.recomendaciones }</div>
      </div>
    </div>
  );
};

export default CourseDetail;
