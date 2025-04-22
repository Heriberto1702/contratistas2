import React, { useState, useEffect } from "react";
import styles from "./css/EventosListados.module.css";
import Image from "next/image";
import EditEventModal from "./EditEventModal";

const EventList = () => {
  const [eventos, setEventos] = useState<any[]>([]);
  const [selectedEvento, setSelectedEvento] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await fetch("/api/eventos/obtener");
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setEventos(data);
        } else {
          throw new Error("La respuesta no es un array");
        }
      } catch (error: any) {
        setError(error.message || "Hubo un problema al cargar los eventos.");
        console.error("Error al obtener los eventos:", error);
      }
    };
    fetchEventos();
  }, []);

  const handleEditClick = (evento: any) => {
    setSelectedEvento(evento);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvento(null);
  };
  const handleSaveEvento = (updatedEvento: any) => {
    setEventos((prevEventos) =>
      prevEventos.map((evento) =>
        evento.id_evento === updatedEvento.id_evento
          ? {
              ...evento,
              ...updatedEvento,
              imagen_evento: evento.imagen_evento, // conservar imagen
              imagen_des_evento: evento.imagen_des_evento,
            }
          : evento
      )
    );
  };
  return (
    <div>
      {error ? (
        <p className={styles.errorMessage}>Error: {error}</p>
      ) : (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Nombre del Evento</th>
                <th className={styles.th}>Ubicación</th>
                <th className={styles.th}>Cupos</th>
                <th className={styles.th}>Cupos Reservados</th>
                <th className={styles.th}>Fecha y Hora</th>
                <th className={styles.th}>Activo</th>
                <th className={styles.th}>Imagen</th>
                <th className={styles.th}>Imagen Descriptiva</th>
                <th className={styles.th}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {eventos.map((evento) => (
                <tr key={evento.id_evento} className={styles.tr}>
                  <td className={styles.td} data-label="Nombre del Evento">
                    {evento.nombre_evento}
                  </td>
                  <td className={styles.td} data-label="Ubicación">
                    {evento.locacion}
                  </td>
                  <td className={styles.td} data-label="Cupos">
                    {evento.cupos}
                  </td>
                  <td className={styles.td} data-label="Cupos Reservados">
                    {evento.cupo_reservado ?? "N/A"}
                  </td>
                  <td className={styles.td} data-label="Fecha y Hora">
                    {new Date(evento.fecha_hora).toLocaleString()}
                  </td>
                  <td className={styles.td} data-label="Activo">
                    {evento.activo ? "Sí" : "No"}
                  </td>
                  <td className={styles.td} data-label="Imagen">
                    <Image
                      width={80}
                      height={80}
                      src={evento.imagen_evento}
                      alt={`Imagen de ${evento.nombre_evento}`}
                      className={styles.image1}
                    />
                  </td>
                  <td className={styles.td} data-label="Imagen Descriptiva">
                    <Image
                      width={970}
                      height={1280}
                      src={evento.imagen_des_evento}
                      alt={`Imagen descriptiva de ${evento.nombre_evento}`}
                      className={styles.image2}
                    />
                  </td>
                  <td className={styles.td} data-label="Acciones">
                    <button
                      className={styles.detailsButton}
                      onClick={() => handleEditClick(evento)}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isModalOpen && selectedEvento && (
            <EditEventModal
              eventoId={selectedEvento.id_evento}
              onClose={handleCloseModal}
              onSave={handleSaveEvento}
            />
          )}
        </>
      )}
    </div>
  );
};
export default EventList;
