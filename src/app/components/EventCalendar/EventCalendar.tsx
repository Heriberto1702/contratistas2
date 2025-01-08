"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./EventCalendar.module.css";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
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
        } else {
          throw new Error("No se pudo obtener el ID del contratista.");
        }
      } catch (error: any) {
        setError(error.message || "Hubo un problema al obtener el ID del contratista.");
      }
    };

    fetchContratistaId();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
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
    };

    fetchEvents();
  }, [selectedMonth]);
  useEffect(() => {
    if (success || warning ||error) {
      const timer = setTimeout(() => {
        setSuccess(null);
        setError(null);
        setWarning(null)
      }, 4800); // 5 segundos
      return () => clearTimeout(timer);
    }
  }, [success, warning, error]);

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
    } catch (err: any) {
      setError(err.message || "Hubo un problema al registrar la asistencia.");
    } finally {
      setLoading(false);
    }
  };

  // Function to check if the day is today
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
                  width={100}
                  height={100}
                  className={styles.eventImage}
                />
                <div className={styles.eventDetails}>
                  <h3>{event.nombre_evento}</h3>
                  <p>
                    Cupos disponibles:{" "}
                    {event.cupos || 0}
                  </p>
                  <div className={styles.eventMeta}>
                    <p>
                      📅 {new Date(event.fecha_hora).toLocaleDateString("es-ES")}
                    </p>
                    <p>
                      ⏰{" "}
                      {new Date(event.fecha_hora).toLocaleTimeString("es-ES")}
                    </p>
                    <p>📍 {event.locacion}</p>
                  </div>
                  <hr className={styles.divider} />
                </div>
                <button
                  className={styles.attendButton}
                  onClick={() => handleAttend(event.id_evento)}
                  disabled={loading}
                >
                  {loading ? "Registrando..." : "Asistir"}
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
                  selectedDay === day ? styles.selectedDay : ""
                } ${isToday(day) ? styles.today : ""}`}
                onClick={() => setSelectedDay(day)}
              >
                {day}
                {dayEvents.length > 0 && (
                  <div className={styles.eventMarker}></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {error && <p className={`${styles.message} ${styles.error}`}>{error}</p>}
      {warning && <p className={`${styles.message} ${styles.warning}`}>{warning}</p>}
{success && <p className={`${styles.message} ${styles.success}`}>{success}</p>}

    </div>
  );
};

export default EventCalendar;
