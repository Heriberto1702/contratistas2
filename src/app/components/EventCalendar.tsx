"use client";

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './EventCalendar.module.css';

// Define the Event interface
interface Event {
  date: Date;
  title: string;
  hour: string;
  location: string;
}

// Sample events data
const events: Event[] = [
  { date: new Date(2024, 7-1, 2), title: 'Fontanería Básica', hour:'10:30am',location: 'SINSA, Ctra. Masaya' },
  { date: new Date(2024, 7-1, 19), title: 'Carpintería para Principiantes',hour:'10:30am',location: 'SINSA, Radial' },
  { date: new Date(2024, 7-1, 22), title: 'Reparación de Electrodomésticos',hour:'10:30am',location: 'SINSA, Ctra. Masaya' },
];

const EventCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());

  // Maneja el cambio de fecha
  const onChange = (value: Date | Date[] | null) =>  {
    setSelectedDate(Array.isArray(value) ? value[0] : value);
  };

  // Maneja el cambio de mes
  const onActiveDateChange = ({ activeStartDate }: { activeStartDate: Date }) => {
    if (activeStartDate) {
      setSelectedMonth(activeStartDate);
    }
  };

  // Contenido de la celda del calendario
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const event = events.find(event => event.date.toDateString() === date.toDateString());
      return event ? <div className={styles.eventMarker} /> : null;
    }
  };

  // Filtra eventos para el mes seleccionado
  const monthlyEvents = events.filter(
    event => event.date.getMonth() === selectedMonth.getMonth() && event.date.getFullYear() === selectedMonth.getFullYear()
  );

  // Filtra eventos para la fecha seleccionada
  const filteredEvents = events.filter(
    event => selectedDate && selectedDate.toDateString() === event.date.toDateString()
  );

  // Determina si un evento está seleccionado
  const isSelected = (eventDate: Date) => {
    return selectedDate ? eventDate.toDateString() === selectedDate.toDateString() : false;
  };

  return (
    
    <div className={styles.eventCalendarContainer}>

      <div className={styles.eventList}>

        <h3>Eventos del Mes</h3>

        {monthlyEvents.length > 0 ? (monthlyEvents.map((event, index) => (
          <>
          <div
              key={index}
              className={`${styles.eventItem} ${isSelected(event.date) ? styles.selectedEvent : ''}`}>
              {event.title}
              {event.hour}
              {event.location}
            </div>

            <div>
              <button className={styles.attendButton} onClick={() => alert(`Reserva para ${event.title}`)}>Asistir</button>
            </div>
          </>  
          ))
        ) : (
          <p>No hay eventos para este mes</p>
        )}
      </div>

      <div className={styles.calendarWrapper}>
        <Calendar
          onChange={onChange}
          value={selectedDate}
          tileContent={tileContent}
          locale="es-ES"
          onActiveStartDateChange={onActiveDateChange}
        />
      </div>

    </div>
  );
};

export default EventCalendar;