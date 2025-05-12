"use client";

import EventList from "../components/EventList";
import CreateEventList from "../components/CreateEventList";
import Link from "next/link";
import "../AdminPage.css";
const AdminDashboardEventos = () => {
  return (
    <div className="p-8">
      <Link href="/admin">
        <p className="text-blue-600">← Volver al Dashboard</p>
      </Link>
      <h1 className="text-2xl font-bold mb-4 title2">Administración de Eventos</h1>

      <section className="mb-8">
        <CreateEventList />
      </section>
<br></br>
      <section>
        <h2 className="text-xl font-semibold title2">Eventos Creados </h2>
        <EventList />
      </section>
    </div>
  );
};

export default AdminDashboardEventos;
