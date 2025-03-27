"use client";

import Link from "next/link";
import CoursesTable from "../components/CoursesTable";
import CreateCourseForm from "../components/CreateCourseForm";

const AdminDashboardCursos = () => {

  return (
    <div className="p-8">
            <Link href="/admin">
        <p className="text-blue-600">← Volver al Dashboard</p>  
      </Link>
      <h1 className="text-2xl font-bold mb-4">Administración de Cursos</h1>

      <section className="mb-8">
        <CreateCourseForm />
      </section>

      <section>
        <h2 className="text-xl font-semibold">Cursos Actuales</h2>
        <CoursesTable />
      </section>
    </div>
  );
};

export default AdminDashboardCursos;