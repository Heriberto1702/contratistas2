import BannerSlidernew from "../../components/BannerSlidernew/BannerSlidernew";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getCourses } from '../../../services/coursesServices';
import { Course } from '../../../types/course';
import styles from './CoursesPage.module.css'; // Importar el CSS

const Page = async () => {
  const images = ["/banneracademia.png"];
  const courses: Course[] = await getCourses();
  return (
    <>
      <header>
        <nav>
          <div>
            <Link href="/">
              <Image
                src="/logoContratista.png"
                alt="logo-Contratista"
                width={182}
                height={119}
              />
            </Link>
          </div>
          <div>
            <Link href="/compras">Compras</Link>
            <Link href="/academia">Academia para Contratistas</Link>
            <Link href="/documentosutiles">Documentos útiles</Link>
            <Link href="/cuenta">Cuenta</Link>
          </div>
        </nav>
      </header>
      <BannerSlidernew images={images} interval={3000} />
      <div className={styles.container}> {/* Aplicar la clase del contenedor */}
      <h1 className={styles.title}>Lista de Cursos</h1> {/* Aplicar la clase del título */}
      <ul className={styles.list}> {/* Aplicar la clase de la lista */}
        {courses.map((course) => (
          <li key={course.id} className={styles.listItem}> {/* Aplicar la clase del elemento de la lista */}
            <Link href={`/academia/cursos/${course.id}`} className={styles.link}> {/* Aplicar la clase del enlace */}
              {course.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};
export default Page;
