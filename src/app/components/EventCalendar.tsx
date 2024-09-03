"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./EventCalendar.module.css";
import Image from "next/image";

// Define the Event interface
interface Event {
  date: Date;
  title: string;
  hour: string;
  location: string;
  imageUrl: string;
}

// Sample events data
const events: Event[] = [
  {
    date: new Date(2024, 6, 2),
    title: "Fontanería Básica",
    hour: "10:30am",
    location: "SINSA, Ctra. Masaya",
    imageUrl: '/fontaneria.png'
  },
  {
    date: new Date(2024, 6, 19),
    title: "Carpintería para Principiantes",
    hour: "10:30am",
    location: "SINSA, Radial",
    imageUrl: '/carpinteria.png'
  },
  {
    date: new Date(2024, 6, 22),
    title: "Reparación de Electrodomésticos",
    hour: "10:30am",
    location: "SINSA, Ctra. Masaya",
    imageUrl: '/electrodomesticos.png'
  },
  {
    date: new Date(2024, 7, 3),
    title: "Jardinería y Mantenimiento",
    hour: "10:00am",
    location: "SINSA, Ctra. Masaya",
    imageUrl: '/jardineria.png'
  },
  {
    date: new Date(2024, 7, 15),
    title: "Restauracion con Pintura",
    hour: "11:00am",
    location: "SINSA, Radial",
    imageUrl: '/pintura.png'
  },
];

const EventCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());

  // Maneja el cambio de fecha
  const onChange = (value: Date | Date[] | null) => {
    setSelectedDate(Array.isArray(value) ? value[0] : value);
  };

  // Maneja el cambio de mes
  const onActiveDateChange = ({
    activeStartDate,
  }: {
    activeStartDate: Date | null;
  }) => {
    if (activeStartDate) {
      setSelectedMonth(activeStartDate);
    }
  };

  // Contenido de la celda del calendario
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const event = events.find(
        (event) => event.date.toDateString() === date.toDateString()
      );
      return event ? <div className={styles.eventMarker} /> : null;
    }
    return null;
  };

  // Filtra eventos para el mes seleccionado
  const monthlyEvents = events.filter(
    (event) =>
      event.date.getMonth() === selectedMonth.getMonth() &&
      event.date.getFullYear() === selectedMonth.getFullYear()
  );

  // Filtra eventos para la fecha seleccionada
  const filteredEvents = events.filter(
    (event) =>
      selectedDate && selectedDate.toDateString() === event.date.toDateString()
  );

  // Determina si un evento está seleccionado
  const isSelected = (eventDate: Date) => {
    return selectedDate
      ? eventDate.toDateString() === selectedDate.toDateString()
      : false;
  };

  return (
    <div className={styles.eventCalendarContainer}>
      <div className={styles.eventList}>
        {monthlyEvents.length > 0 ? (
          monthlyEvents.map((event, index) => (
            <div
              key={index}
              className={`${styles.eventItem} ${
                isSelected(event.date) ? styles.selectedEvent : ""
              }`}
            >
              <div className={styles.imageEvent}>
                <Image width={1000} height={1000} src={event.imageUrl} alt={event.title} className={styles.eventImage} />
              </div>
              <div className={styles.information}>
                <div className={styles.eventTitle}>
                  {event.title}
                  <p>09/10 Cupos</p>
                  </div>
                <div className={styles.eventHour}>
                  {event.hour}
                  {event.location}
                </div>
              </div>
              <button
                className={styles.attendButton}
                onClick={() => alert(`Reserva para ${event.title}`)}
              >
                Asistir
              </button>
            </div>
          ))
        ) : (
          <p>Sin Eventos</p>
        )}
      </div>

      <div className={styles.calendarWrapper}>
        <Calendar
          tileContent={tileContent}
          onChange={(value) => onChange(value as Date | Date[] | null)}
          value={selectedDate}
          locale="es-ES"
          onActiveStartDateChange={onActiveDateChange}
        />
      </div>
    </div>
  );
};

export default EventCalendar;
