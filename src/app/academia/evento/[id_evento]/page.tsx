"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import NavBar from "../../../components/navbar/NavBar";
import BannerSlidernew from "../../../components/BannerSlidernew/BannerSlidernew";
import Image from "next/image";
import Styles from "./eventDetail.module.css";
import Link from "next/link";
import Cargando from "@/app/components/Cargando/Cargando";

interface Event {
  id_evento: number;
  nombre_evento: string;
  locacion: string;
  cupos: number;
  imagen_evento: string;
  imagen_des_evento: string;
  fecha_hora: string;
  cupo_reservado: number;
  activo: boolean; // NUEVO CAMPO
}

const EventPage = () => {
  const { id_evento } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [id_contratista, setIdContratista] = useState<number | null>(null);
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([]);
  const [loadingEventId, setLoadingEventId] = useState<number | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    try {
      const response = await fetch("/api/eventos/obtener");
      if (response.ok) {
        const data: Event[] = await response.json();
        const foundEvent = data.find(
          (event) => event.id_evento === parseInt(id_evento as string)
        );
        if (foundEvent) {
          setEvent(foundEvent);
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
    const fetchContratistaId = async () => {
      try {
        const response = await fetch("/api/usuario/idcontratista");
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

  const fetchRegisteredEvents = useCallback(async () => {
    if (!id_contratista) return;

    try {
      const response = await fetch(
        `/api/eventos/registrados?id_contratista=${id_contratista}`
      );
      if (response.ok) {
        const data = await response.json();
        setRegisteredEvents(data.map((event: any) => event.id_evento));
      } else {
        throw new Error("No se pudieron obtener los eventos registrados.");
      }
    } catch (err: any) {
      setError(err.message || "Error al obtener los eventos registrados.");
    }
  }, [id_contratista]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    if (id_contratista) {
      fetchRegisteredEvents();
    }
  }, [id_contratista, fetchRegisteredEvents]);

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, 4800);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const handleEventAction = async (
    eventId: number,
    action: "asistir" | "cancelar"
  ) => {
    setLoadingEventId(eventId);
    setError(null);
    setSuccess(null);

    try {
      const endpoint =
        action === "asistir" ? "/api/eventos/asistir" : "/api/eventos/cancelar";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_evento: eventId,
          id_contratista,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Error al ${action} el evento.`);
      }

      setSuccess(
        `Evento ${
          action === "asistir" ? "registrado" : "cancelado"
        } correctamente.`
      );
      fetchEvents();
      fetchRegisteredEvents();
    } catch (err: any) {
      setError(err.message || `Hubo un problema al ${action} el evento.`);
    } finally {
      setLoadingEventId(null);
    }
  };

  if (isLoading) {
    return <div className="loading"><Cargando /></div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!event) {
    return <div className="error">No se encontró el evento especificado.</div>;
  }

  // Mostrar mensaje si el evento está inactivo
  if (!event.activo) {
    return (
      <div>
        <NavBar />
        <BannerSlidernew images={["/banneracademia.png"]} interval={3000} />
        <div className={Styles.container}>
          <div>
            Este evento está temporalmente inactivo.
          </div>
          <Link href="/academia" className={Styles.back}>Regresar</Link>
        </div>
      </div>
    );
  }

  const images = ["/banneracademia.png"];

  return (
    <div>
      <NavBar />
      <BannerSlidernew images={images} interval={3000} />
      <div className={Styles.container}>
      <Link href="/academia" className={Styles.back}>
        &#8592; Regresar
      </Link>
        {success && (
          <div className={`${Styles.message} ${Styles.success}`}>{success}</div>
        )}
        {error && (
          <div className={`${Styles.message} ${Styles.error}`}>{error}</div>
        )}
        <div className={Styles.encabezado}>
          <div className={Styles.imageContainer}>
            <Image
              className={Styles.image}
              width={100}
              height={100}
              src={event.imagen_evento}
              alt={`Imagen del evento ${event.nombre_evento}`}
            />
          </div>
          <div className={Styles.Info}>
            <div className={Styles.titulares}>
              <h1 className={Styles.title}>{event.nombre_evento}</h1>
            </div>
            <div>
              <p className={Styles.letter}>
                Cupos disponibles: {event.cupos || 0}
              </p>
            </div>
            <div className={Styles.subtitulares}>
              <p className={Styles.letter}>📍 {event.locacion}</p>
              <p className={Styles.letter}>
                📅 {new Date(event.fecha_hora).toLocaleDateString("es-ES")}
              </p>
              <p className={Styles.letter}>
                ⏰ {new Date(event.fecha_hora).toLocaleTimeString("es-ES")}
              </p>
            </div>
          </div>
          <button
            className={`${Styles.attendButton} ${
              registeredEvents.includes(event.id_evento)
                ? Styles.cancelButton
                : ""
            }`}
            onClick={() =>
              handleEventAction(
                event.id_evento,
                registeredEvents.includes(event.id_evento)
                  ? "cancelar"
                  : "asistir"
              )
            }
            disabled={
              loadingEventId === event.id_evento ||
              new Date(event.fecha_hora) < new Date()
            }
          >
            {loadingEventId === event.id_evento
              ? "Procesando..."
              : new Date(event.fecha_hora) < new Date()
              ? "Evento finalizado"
              : registeredEvents.includes(event.id_evento)
              ? "Cancelar"
              : "Asistir"}
          </button>
        </div>
        <div className={Styles.imageContainer}>
          <Image
            className={Styles.image}
            width={1000}
            height={400}
            src={event.imagen_des_evento}
            alt={`Imagen descriptiva del evento ${event.nombre_evento}`}
          />
        </div>
      </div>
    </div>
  );
};

export default EventPage;
