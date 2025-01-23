"use client";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import NavBar from "../../../components/navbar/NavBar";
import BannerSlidernew from "../../../components/BannerSlidernew/BannerSlidernew";
import Image from "next/image";
import Styles from "./eventDetail.module.css";

interface Event {
  id_evento: number;
  nombre_evento: string;
  locacion: string;
  cupos: number;
  imagen_evento: string;
  imagen_des_evento: string;
  fecha_hora: string;
  cupo_reservado: number;
}

const EventPage = () => {
  const { id_evento } = useParams(); // Obtener el id_evento de la URL usando useParams
  const [event, setEvent] = useState<Event | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [id_contratista, setIdContratista] = useState<number | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchEvents = useCallback(async () => {
    try {
      const response = await fetch("/api/eventos/obtener");

      if (response.ok) {
        const data: Event[] = await response.json();
        const foundEvent = data.find(
          (event) => event.id_evento === parseInt(id_evento as string)
        );
        if (foundEvent) {
          setEvent(foundEvent); // Almacena el evento específico
        } else {
          throw new Error("No se encontró el evento especificado.");
        }
      } else {
        throw new Error("No se pudieron obtener los eventos.");
      }
    } catch (error: any) {
      setError(error.message || "Hubo un problema al obtener los eventos.");
    } finally {
      setIsLoading(false);
    }
  }, [id_evento]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents, id_evento]);

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, 4800);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  useEffect(() => {
    const fetchContratistaId = async () => {
      try {
        const response = await fetch("/api/user/idcontratista");
        const data = await response.json();

        if (response.ok) {
          setIdContratista(data.id_contratista);
        } else {
          throw new Error("No se pudo obtener el ID del contratista.");
        }
      } catch (error: any) {
        setError(
          error.message || "Hubo un problema al obtener el ID del contratista."
        );
      }
    };
    fetchContratistaId();
  }, []);

  const images = ["/banneracademia.png"];

  if (isLoading) {
    return <div className="loading">Cargando evento...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!event) {
    return <div className="error">No se encontró el evento especificado.</div>;
  }

  const handleAttend = async (eventId: number) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/eventos/asistir", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_evento: eventId,
          id_contratista,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al registrar la asistencia.");
      }
      setSuccess("Asistencia registrada correctamente.");
      fetchEvents();
    } catch (err: any) {
      setError(err.message || "Hubo un problema al registrar la asistencia.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NavBar />
      <BannerSlidernew images={images} interval={3000} />
      <div className={Styles.container}>
        {success && <div className={`${Styles.message} ${Styles.success}`}>{success}</div>}
        {error && <div className={`${Styles.message} ${Styles.error}`}>{error}</div>}

        <h1 className={Styles.title}>{event.nombre_evento}</h1>
        <p className={Styles.location}>Locación: {event.locacion}</p>
        <p className={Styles.date}>Fecha y hora: {event.fecha_hora}</p>
        <p className={Styles.slots}>Cupos disponibles: {event.cupos}</p>

        <div className={Styles.imageContainer}>
          <Image
            className={Styles.image}
            width={600}
            height={400}
            src={event.imagen_evento}
            alt={`Imagen del evento ${event.nombre_evento}`}
          />
        </div>
        <div className={Styles.imageContainer}>
          <Image
            className={Styles.image}
            width={600}
            height={400}
            src={event.imagen_des_evento}
            alt={`Imagen descriptiva del evento ${event.nombre_evento}`}
          />
        </div>

        <button
          className={Styles.attendButton}
          onClick={() => handleAttend(event.id_evento)}
          disabled={loading}
        >
          {loading ? "Registrando..." : "Asistir"}
        </button>
      </div>
    </div>
  );
};

export default EventPage;
