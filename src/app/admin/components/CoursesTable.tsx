import React, { useState, useEffect } from "react";
import styles from "./css/CoursesTable.module.css";

// Modal para ver los detalles del curso
const CourseDetailsModal = ({ course, onClose }: { course: any; onClose: () => void }) => {
  console.log("Curso seleccionado:", course); // Verifica la estructura del curso

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        <h2>{course.nombre_curso}</h2>
        <p><strong>Especialista:</strong> {course.especialista}</p>
        <p><strong>Descripción:</strong> {course.descripcion}</p>
        <p><strong>Detalles:</strong> {course.detalles_curso}</p>
        <p><strong>Recomendaciones:</strong> {course.recomendaciones}</p>
        <p><strong>Tipo de curso:</strong> {course.tipo_curso}</p>
        <p><strong>Fecha de inicio:</strong> {new Date(course.fecha_hora_Inicio).toLocaleDateString()}</p>
        <p><strong>Hora de inicio:</strong> {new Date(course.fecha_hora_Inicio).toLocaleTimeString()}</p>
        
        <h3>Sesiones</h3>
        {Array.isArray(course.sesiones) && course.sesiones.length > 0 ? (
          course.sesiones.map((session: any, index: number) => (
            <div key={index}>
              <h4>{session.nombre_sesion}</h4>
              <p>{session.descripcion}</p>
              <p><strong>Fecha y hora:</strong> {new Date(session.fecha_hora).toLocaleString()}</p>
              <h5>Módulos:</h5>
              {Array.isArray(session.modulos) && session.modulos.length > 0 ? (
                session.modulos.map((module: any, modIndex: number) => (
                  <div key={modIndex}>
                    <p><strong>Título del módulo:</strong> {module.titulo_modulo}</p>
                    <p>{module.contenido}</p>
                  </div>
                ))
              ) : (
                <p>No hay módulos para esta sesión.</p>
              )}
            </div>
          ))
        ) : (
          <p>No hay sesiones disponibles para este curso.</p>
        )}
      </div>
    </div>
  );
};

// Componente principal que maneja la tabla de cursos
const CoursesTable = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses/obtener");
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        if (Array.isArray(data)) {
          setCourses(data);
        } else {
          throw new Error("La respuesta no es un array");
        }
      } catch (error: any) {
        setError(error.message || "Hubo un problema al cargar los cursos.");
        console.error("Error al obtener los cursos:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleViewDetails = (course: any) => {
    console.log("Detalles del curso seleccionados:", course); // Verifica los detalles antes de pasarlos al modal
    setSelectedCourse(course);
  };

  const handleCloseModal = () => {
    setSelectedCourse(null);
  };

  return (
    <div>
      {error ? (
        <p className={styles.errorMessage}>Error: {error}</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Título</th>
              <th className={styles.th}>Especialista</th>
              <th className={styles.th}>Descripción del curso</th>
              <th className={styles.th}>Fecha Inicio</th>
              <th className={styles.th}></th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id_curso} className={styles.tr}>
                <td className={styles.td}>{course.nombre_curso}</td>
                <td className={styles.td}>{course.especialista}</td>
                <td className={styles.td}>{course.descripcion}</td>
                <td className={styles.td}>
                  {new Date(course.fecha_hora_Inicio).toLocaleDateString()}
                </td>
                <td className={styles.td}>
                  <button
                    className={styles.detailsButton}
                    onClick={() => handleViewDetails(course)}
                  >
                    Ver detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Mostrar el modal si hay un curso seleccionado */}
      {selectedCourse && (
        <CourseDetailsModal course={selectedCourse} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default CoursesTable;
