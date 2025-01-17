"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import styles from "./EventCalendar.module.css";
import Link from "next/link";

interface Event {
  id_evento: number;
  nombre_evento: string;
  locacion: string;
  cupos: number;
  imagen_evento: string;
  fecha_hora: string;
  cupo_reservado?: number; // Campo opcional para evitar errores en eventos antiguos.
}

const EventCalendar = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([]); // IDs de eventos registrados
  const [loadingEventId, setLoadingEventId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [id_contratista, setIdContratista] = useState<number | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const today = new Date();

  useEffect(() => {
    const fetchContratistaId = async () => {
      try {
        const response = await fetch("/api/user/idcontratista");
        const data = await response.json();

        if (response.ok) {
          setIdContratista(data.id_contratista);
          fetchRegisteredEvents(data.id_contratista); // Cargar eventos registrados
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

  const fetchEvents = useCallback(async () => {
    const year = selectedMonth.getFullYear();
    const month = selectedMonth.getMonth() + 1;

    try {
      const response = await fetch(`/api/eventos?year=${year}&month=${month}`);
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      } else {
        console.error("Failed to fetch events");
      }
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  }, [selectedMonth]);

  const fetchRegisteredEvents = async (contratistaId: number) => {
    try {
      const response = await fetch(`/api/eventos/registrados`);
      if (response.ok) {
        const data = await response.json();
        setRegisteredEvents(data.map((event: any) => event.id_evento));
      } else {
        console.error("Failed to fetch registered events");
      }
    } catch (err) {
      console.error("Error fetching registered events:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, 4800);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const daysInCurrentMonth = new Date(
    selectedMonth.getFullYear(),
    selectedMonth.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    selectedMonth.getFullYear(),
    selectedMonth.getMonth(),
    1
  ).getDay();

  const days = Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1);

  const eventsForSelectedDay = events.filter((event) => {
    const eventDate = new Date(event.fecha_hora);
    return (
      selectedDay !== null &&
      eventDate.getDate() === selectedDay &&
      eventDate.getMonth() === selectedMonth.getMonth()
    );
  });

  const handleEventAction = async (eventId: number, action: "asistir" | "cancelar") => {
    setLoadingEventId(eventId);
    setError(null);
    setSuccess(null);

    try {
      const endpoint = action === "asistir" ? "/api/eventos/asistir" : "/api/eventos/cancelar";
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

      setSuccess(`Evento ${action === "asistir" ? "registrado" : "cancelado"} correctamente.`);
      fetchEvents();
      fetchRegisteredEvents(id_contratista!);
    } catch (err: any) {
      setError(err.message || `Hubo un problema al ${action} el evento.`);
    } finally {
      setLoadingEventId(null);
    }
  };

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      selectedMonth.getMonth() === today.getMonth() &&
      selectedMonth.getFullYear() === today.getFullYear()
    );
  };

  return (
    <>
    <div className={styles.container}>
      <div className={styles.eventList}>
        {selectedDay !== null ? (
          eventsForSelectedDay.length > 0 ? (
            eventsForSelectedDay.map((event) => (
              <div key={event.id_evento} className={styles.eventItem}>
                <Image
                  src={event.imagen_evento}
                  alt={event.nombre_evento}
                  width={100}
                  height={100}
                  className={styles.eventImage}
                />
                <div className={styles.eventDetails}>
                  <h3 className={styles.enlace}>
                    <Link href={`/academia/evento/${event.id_evento}`} className={styles.link}>
                      {event.nombre_evento}
                    </Link>
                  </h3>
                  <p>Cupos disponibles: {event.cupos || 0}</p>
                  <div className={styles.eventMeta}>
                    <p>📅 {new Date(event.fecha_hora).toLocaleDateString("es-ES")}</p>
                    <p>⏰ {new Date(event.fecha_hora).toLocaleTimeString("es-ES")}</p>
                    <p>📍 {event.locacion}</p>
                  </div>
                  <p className={styles.text}><Link href={"https://www.google.com/"}>Si desea agregar mas personas a este evento de clic aquí</Link></p>
                  <hr className={styles.divider} />
                </div>
                <button
                  className={styles.attendButton}
                  onClick={() =>
                    handleEventAction(
                      event.id_evento,
                      registeredEvents.includes(event.id_evento) ? "cancelar" : "asistir"
                    )
                  }
                  disabled={loadingEventId === event.id_evento}
                >
                  {loadingEventId === event.id_evento
                    ? "Procesando..."
                    : registeredEvents.includes(event.id_evento)
                    ? "Cancelar"
                    : "Asistir"}
                </button>
              </div>
            ))
          ) : (
            <p>No hay eventos para este día.</p>
          )
        ) : (
          <p>Selecciona un día para ver los eventos.</p>
        )}
      </div>
      <div className={styles.calendar}>
        <div className={styles.headerCalendar}>
          <button
            onClick={() =>
              setSelectedMonth(
                new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1)
              )
            }
          >
            {"<"}
          </button>
          <h2>
            {selectedMonth.toLocaleString("es-ES", { month: "long" })} {" "}
            {selectedMonth.getFullYear()}
          </h2>
          <button
            onClick={() =>
              setSelectedMonth(
                new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1)
              )
            }
          >
            {">"}
          </button>
        </div>
        <div className={styles.dayNames}>
          {["D", "L", "M", "Mi", "J", "V", "S"].map((day) => (
            <div key={day} className={styles.dayName}>
              {day}
            </div>
          ))}
        </div>
        <div className={styles.days}>
          {Array(firstDayOfMonth)
            .fill(null)
            .map((_, i) => (
              <div key={`prev-${i}`} className={styles.otherMonthDay}></div>
            ))}
          {days.map((day) => {
            const dayEvents = events.filter(
              (event) => new Date(event.fecha_hora).getDate() === day
            );

            return (
              <div
                key={day}
                className={`${styles.day} ${
                  isToday(day) ? styles.today : ""
                } ${selectedDay === day ? styles.selectedDay : ""}`}
                onClick={() => setSelectedDay(day)}
              >
                <span>{day}</span>
                {dayEvents.length > 0 && (
                  <div className={styles.eventMarker}></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {error && <p className={`${styles.message} ${styles.error}`}>{error}</p>}
      {success && (
        <p className={`${styles.message} ${styles.success}`}>{success}</p>
      )}
    </div>
    </>
  );
};

export default EventCalendar;
