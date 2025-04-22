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
  activo: boolean;
  cupo_reservado?: number;
}

const EventCalendar = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([]);
  const [loadingEventId, setLoadingEventId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [id_contratista, setIdContratista] = useState<number | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const today = new Date();

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
      setError(error.message || "Error al obtener el ID del contratista.");
    }
  };

  const fetchEvents = useCallback(async () => {
    const year = selectedMonth.getFullYear();
    const month = selectedMonth.getMonth() + 1;

    try {
      const response = await fetch(`/api/eventos?year=${year}&month=${month}`);
      if (response.ok) {
        const data = await response.json();
        const activos = data.filter((event: Event) => event.activo);
        setEvents(activos);
      } else {
        console.error("Failed to fetch events");
      }
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  }, [selectedMonth]);

  const fetchRegisteredEvents = useCallback(async () => {
    if (!id_contratista) return;
    try {
      const response = await fetch(`/api/eventos/registrados`);
      if (response.ok) {
        const data = await response.json();
        const activeEventIds = events.map((e) => e.id_evento);
        const filteredRegistered = data
          .filter((event: any) => activeEventIds.includes(event.id_evento))
          .map((event: any) => event.id_evento);
        setRegisteredEvents(filteredRegistered);
      } else {
        console.error("Failed to fetch registered events");
      }
    } catch (err) {
      console.error("Error fetching registered events:", err);
    }
  }, [events, id_contratista]);

  useEffect(() => {
    fetchContratistaId();
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    if (id_contratista) {
      fetchRegisteredEvents();
    }
  }, [fetchRegisteredEvents, id_contratista]);

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

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      selectedMonth.getMonth() === today.getMonth() &&
      selectedMonth.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.eventList}>
        {selectedDay !== null ? (
          eventsForSelectedDay.length > 0 ? (
            eventsForSelectedDay.map((event) => (
              <div key={event.id_evento} className={styles.eventItem}>
                <Image
                  src={event.imagen_evento}
                  alt={event.nombre_evento}
                  width={200}
                  height={100}
                  className={styles.eventImage}
                />
                <div className={styles.eventDetails}>
                  <h3 className={styles.enlace}>
                    <Link
                      href={`/academia/evento/${event.id_evento}`}
                      className={styles.link}
                    >
                      {event.nombre_evento}{" "}
                      <span className={styles.linkdetalle}>(ver detalles)</span>
                    </Link>
                  </h3>
                  <p>
                    Cupos disponibles:{" "}
                    <span className={styles.cupos}>{event.cupos || 0}</span>
                  </p>
                  <div className={styles.eventMeta}>
                    <p>
                      📅{" "}
                      {new Date(event.fecha_hora).toLocaleDateString("es-ES")}
                    </p>
                    <p>
                      ⏰{" "}
                      {new Date(event.fecha_hora).toLocaleTimeString("es-ES")}
                    </p>
                    <p>📍 {event.locacion}</p>
                  </div>
                  <p className={styles.text}>
                    <Link href={"https://form.jotform.com/250274836316862"}>
                      Si desea agregar más personas a este evento, haga{" "}
                      <span className={styles.linkmedio}>
                        <b>clic aquí</b>
                      </span>
                    </Link>
                  </p>
                  <hr className={styles.divider} />
                </div>
                <button
                  className={`${styles.attendButton} ${
                    registeredEvents.includes(event.id_evento)
                      ? styles.cancelButton
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
                new Date(
                  selectedMonth.getFullYear(),
                  selectedMonth.getMonth() - 1
                )
              )
            }
          >
            {"<"}
          </button>
          <h2>
            {selectedMonth.toLocaleString("es-ES", { month: "long" })}{" "}
            {selectedMonth.getFullYear()}
          </h2>
          <button
            onClick={() =>
              setSelectedMonth(
                new Date(
                  selectedMonth.getFullYear(),
                  selectedMonth.getMonth() + 1
                )
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
              (event) =>
                new Date(event.fecha_hora).getDate() === day &&
                new Date(event.fecha_hora).getMonth() ===
                  selectedMonth.getMonth()
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
  );
};

export default EventCalendar;
