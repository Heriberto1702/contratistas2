"use client";

import React, { useEffect, useState } from "react";

interface Course {
  id_curso: number;
  nombre_curso: string;
  descripcion: string;
}

const CoursesTable = () => {
  const [courses, setCourses] = useState<Course[]>([]); // Define el tipo como un array de Course

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses/obtener"); // Llama a la API
        const data = await response.json(); // Supongamos que devuelve un array de cursos
        setCourses(data); // Actualiza el estado con los datos
      } catch (error) {
        console.error("Error al obtener los cursos:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <table className="table-auto w-full border">
      <thead>
        <tr>
          <th className="border px-4 py-2">ID</th>
          <th className="border px-4 py-2">Nombre</th>
          <th className="border px-4 py-2">Descripción</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((course) => (
          <tr key={course.id_curso}>
            <td className="border px-4 py-2">{course.id_curso}</td>
            <td className="border px-4 py-2">{course.nombre_curso}</td>
            <td className="border px-4 py-2">{course.descripcion}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CoursesTable;