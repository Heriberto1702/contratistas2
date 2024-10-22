// src/components/CourseDetail.tsx

import Link from 'next/link';
import { Course } from '../../../types/course';
import styles from './CourseDetail.module.css'; // Importar el CSS

interface CourseDetailProps {
  course: Course;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ course }) => {
  return (
    <div className={styles.container}> {/* Aplicar la clase del contenedor */}
      <h1 className={styles.title}>{course.title}</h1> {/* Aplicar la clase del título */}
      <p className={styles.description}>{course.description}</p> {/* Aplicar la clase de descripción */}
      <Link href={`/academia/secciones/${course.id}`} className={styles.link}> {/* Aplicar la clase del enlace */}
        Iniciar Curso
      </Link>
    </div>
  );
};

export default CourseDetail;