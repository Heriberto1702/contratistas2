import React, { useState, useEffect } from "react";
import EditCourseModal from "./EditCourseModal";
import styles from "./css/CoursesTable.module.css";

const CoursesTable = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses/obtenerTodos");
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error al obtener los cursos:", error);
      }
    };
    fetchCourses();
  }, []);

  const handleEditClick = (course: any) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  const handleSaveCourse = (updatedCourse: any) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id_curso === updatedCourse.id_curso ? updatedCourse : course
      )
    );
  };

  return (
    <div className={styles.container}>
      <h1>Lista de Cursos</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>ID</th>
            <th className={styles.th}>Nombre</th>
            <th className={styles.th}>Especialista</th>
            <th className={styles.th}>Activo</th>
            <th className={styles.th}>Destacado</th>
            <th className={styles.th}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id_curso} className={styles.tr}>
              <td className={styles.td}>{course.id_curso}</td>
              <td className={styles.td}>{course.nombre_curso}</td>
              <td className={styles.td}>{course.especialista}</td>
              <td className={styles.td}>{course.activo ? "Sí" : "No"}</td>
              <td className={styles.td}>{course.destacado ? "Sí" : "No"}</td>
              <td className={styles.td}>
                <button
                  className={styles.detailsButton}
                  onClick={() => handleEditClick(course)}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && selectedCourse && (
        <EditCourseModal
          cursoId={selectedCourse.id_curso}
          onClose={handleCloseModal}
          onSave={handleSaveCourse}
        />
      )}
    </div>
  );
};

export default CoursesTable;
