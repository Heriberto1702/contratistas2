import React, { useState, useEffect, useCallback } from "react";
import EditCourseModal from "./EditCourseModal";
import styles from "./css/CoursesTable.module.css";

// Define la interfaz para los cursos
interface Course {
  id_curso: number;
  nombre_curso: string;
  especialista: string;
  activo: boolean;
  destacado: boolean;
}

const CoursesTable: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener los cursos
  const fetchCourses = useCallback(async () => {
    try {
      setError(null); // Reiniciar estado de error
      const response = await fetch("/api/cursos/obtenerTodos");
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data: Course[] = await response.json();
      setCourses(data);
    } catch (error) {
      setError("Error al obtener los cursos. Por favor, intenta nuevamente.");
      console.error("Error al obtener los cursos:", error);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleEditClick = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  const handleSaveCourse = async () => {
    await fetchCourses(); // Refrescar la lista tras guardar cambios
    handleCloseModal(); // Cerrar el modal
  };

  return (
    <div className={styles.container}>
      <h2>Gestión de Cursos</h2>
      {error && <p className={styles.error}>{error}</p>}
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