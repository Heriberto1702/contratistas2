import React, { useState, useEffect } from "react";

const CoursesTable = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses/obtener");
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        // Verificar si la respuesta es un array
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

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Especialista</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.nombre_curso}</td>
                <td>{course.especialista}</td>
                <td>{course.fecha_hora_Inicio}</td>
                <td>{course.fecha_hora_Fin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CoursesTable;