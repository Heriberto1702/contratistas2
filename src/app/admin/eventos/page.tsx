"use client";

import EventList from "../components/EventList";
import CreateEventList from "../components/CreateEventList";
import BannerSlidernew from "@/app/components/BannerSlidernew/BannerSlidernew";

const AdminDashboardEventos = () => {

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Administración de Eventos</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold">Crear un Nuevo Evento</h2>
        <CreateEventList />
      </section>

      <section>
        <h2 className="text-xl font-semibold">Eventos Actuales</h2>
        <EventList />
      </section>
    </div>
  );
};

export default AdminDashboardEventos;