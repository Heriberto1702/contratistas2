// src/components/CourseDetail.tsx

import Link from "next/link";
import { Course } from "../../../types/course";
import styles from "./CourseDetail.module.css"; // Importar el CSS
import Image from "next/image";
interface CourseDetailProps {
  course: Course;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ course }) => {
  return (
    <div className={styles.container}>
      <Link href={`/academia/cursos`} className={styles.back}>
  &#8592; Regresar
</Link>
      {/* Aplicar la clase del contenedor */}
      <h1 className={styles.title}>{course.title}</h1>{" "}
      {/* Aplicar la clase del título */}
      <p className={styles.description}>{course.description}</p>{" "}
      {/* Aplicar la clase de descripción */}
      <div className={styles.firstData}>
        <div className={styles.data}>
          <Image
            className={styles.image}
            width={128}
            height={100}
            src={course.image}
            alt=""
          />
          <Link
            href={`/academia/secciones/${course.id}`}
            className={styles.link}
          >
            {" "}
            {/* Aplicar la clase del enlace */}
            Iniciar Curso &#62;
          </Link>
        </div>
        <div className={styles.datacurso}>
          <p>Inicia el {course.inicio}</p>
          <p>Finaliza el {course.fin}</p>
          <p>Hora de inicio curso: {course.hora}</p>
        </div>
      </div>
      <div className={styles.secondData}>
        <h1 className={styles.title}>Recomendaciones</h1>
        <div dangerouslySetInnerHTML={{ __html: course.recomendaciones }} />
      </div>
    </div>
  );
};

export default CourseDetail;
