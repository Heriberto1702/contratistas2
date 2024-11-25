"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Container from "../Container/Container";
import styles from "./EventCalendar.module.css";

interface Event {
  id: number;
  date: Date;
  title: string;
  hour: string;
  location: string;
  image: string;
  availableSeats: number;
  totalSeats: number;
  userReservations: Set<number>;
}

const initialEvents: Event[] = [
  {
    id: 1,
    date: new Date(2024, 11, 24),
    title: "Fontanería Básica",
    hour: "10:30am",
    location: "SINSA, Ctra. Masaya",
    image: "/fontaneria.png",
    availableSeats: 10,
    totalSeats: 10,
    userReservations: new Set(),
  },
  {
    id: 2,
    date: new Date(2024, 11, 25),
    title: "Carpintería para Principiantes",
    hour: "10:30am",
    location: "SINSA, Ctra. Masaya",
    image: "/carpinteria.png",
    availableSeats: 10,
    totalSeats: 10,
    userReservations: new Set(),
  },
  {
    id: 3,
    date: new Date(2024, 7, 24),
    title: "Reparación de Electrodomésticos",
    hour: "10:30am",
    location: "SINSA, Ctra. Masaya",
    image: "/electrodomesticos.png",
    availableSeats: 10,
    totalSeats: 10,
    userReservations: new Set(),
  },
  {
    id: 4,
    date: new Date(2024, 8, 24),
    title: "Fontanería Básica",
    hour: "10:30am",
    location: "SINSA, Ctra. Masaya",
    image: "/fontaneria.png",
    availableSeats: 10,
    totalSeats: 10,
    userReservations: new Set(),
  },
  {
    id: 5,
    date: new Date(2024, 8, 26),
    title: "Fontanería Básica",
    hour: "10:30am",
    location: "SINSA, Ctra. Masaya",
    image: "/fontaneria.png",
    availableSeats: 10,
    totalSeats: 10,
    userReservations: new Set(),
  },
  {
    id: 6,
    date: new Date(2024, 7, 28),
    title: "Fontanería Básica",
    hour: "10:30am",
    location: "SINSA, Ctra. Masaya",
    image: "/fontaneria.png",
    availableSeats: 10,
    totalSeats: 10,
    userReservations: new Set(),
  },
  {
    id: 7,
    date: new Date(2024, 8, 28),
    title: "Fontanería Básica",
    hour: "02:30am",
    location: "SINSA, Ctra. Masaya",
    image: "/fontaneria.png",
    availableSeats: 10,
    totalSeats: 10,
    userReservations: new Set(),
  },
  {
    id: 8,
    date: new Date(2024, 8, 28),
    title: "Fontanería Básica",
    hour: "02:30am",
    location: "SINSA, Ctra. Masaya",
    image: "/fontaneria.png",
    availableSeats: 10,
    totalSeats: 10,
    userReservations: new Set(),
  },
  {
    id: 9,
    date: new Date(2024, 8, 28),
    title: "Fontanería Básica",
    hour: "02:30am",
    location: "SINSA, Ctra. Masaya",
    image: "/fontaneria.png",
    availableSeats: 10,
    totalSeats: 10,
    userReservations: new Set(),
  },
  {
    id: 10,
    date: new Date(2024, 8, 26),
    title: "Fontanería Básica",
    hour: "02:30am",
    location: "SINSA, Ctra. Masaya",
    image: "/fontaneria.png",
    availableSeats: 10,
    totalSeats: 10,
    userReservations: new Set(),
  },
  // Más eventos...
];

const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (month: number, year: number) => {
  return new Date(year, month, 1).getDay();
};

const EventCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [eventsByMonth, setEventsByMonth] = useState<Map<string, Event[]>>(
    new Map()
  );
  const [userReservations, setUserReservations] = useState<Set<number>>(
    new Set()
  );
  const today = new Date();

  useEffect(() => {
    // Organize events by month
    const eventsMap = new Map<string, Event[]>();
    initialEvents.forEach((event) => {
      const monthKey = `${event.date.getFullYear()}-${event.date.getMonth()}`;
      if (!eventsMap.has(monthKey)) {
        eventsMap.set(monthKey, []);
      }
      eventsMap.get(monthKey)?.push(event);
    });
    setEventsByMonth(eventsMap);
    setSelectedDate(null); // Reset the selected date when the month changes
  }, [selectedMonth]);

  const handleDateClick = (day: number, isCurrentMonth: boolean) => {
    const newDate = new Date(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth() + (isCurrentMonth ? 0 : day < 15 ? 1 : -1),
      day
    );
    setSelectedDate(newDate);
  };

  const handleAttendClick = (eventId: number) => {
    setEventsByMonth((prevEventsByMonth) => {
      const monthKey = `${selectedMonth.getFullYear()}-${selectedMonth.getMonth()}`;
      const updatedEvents = (prevEventsByMonth.get(monthKey) || []).map((event) => {
        if (event.id === eventId) {
          if (event.availableSeats > 0 && !event.userReservations.has(eventId)) {
            return {
              ...event,
              availableSeats: event.availableSeats - 1,
              userReservations: new Set([...event.userReservations, eventId]),
            };
          }
        }
        return event;
      });
      prevEventsByMonth.set(monthKey, updatedEvents);
      return new Map(prevEventsByMonth);
    });
    setUserReservations(new Set([...userReservations, eventId]));
  };

  const handleCancelClick = (eventId: number) => {
    setEventsByMonth((prevEventsByMonth) => {
      const monthKey = `${selectedMonth.getFullYear()}-${selectedMonth.getMonth()}`;
      const updatedEvents = (prevEventsByMonth.get(monthKey) || []).map((event) => {
        if (event.id === eventId) {
          if (event.userReservations.has(eventId)) {
            return {
              ...event,
              availableSeats: event.availableSeats + 1,
              userReservations: new Set(
                [...event.userReservations].filter(
                  (reservation) => reservation !== eventId
                )
              ),
            };
          }
        }
        return event;
      });
      prevEventsByMonth.set(monthKey, updatedEvents);
      return new Map(prevEventsByMonth);
    });
    setUserReservations(new Set([...userReservations].filter(reservation => reservation !== eventId)));
  };

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const daysInCurrentMonth = getDaysInMonth(
    selectedMonth.getMonth(),
    selectedMonth.getFullYear()
  );
  const firstDayOfMonth = getFirstDayOfMonth(
    selectedMonth.getMonth(),
    selectedMonth.getFullYear()
  );
  const daysInPreviousMonth = getDaysInMonth(
    selectedMonth.getMonth() - 1,
    selectedMonth.getFullYear()
  );

  const days = Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1);

  const monthKey = `${selectedMonth.getFullYear()}-${selectedMonth.getMonth()}`;
  const filteredEvents = eventsByMonth.get(monthKey)?.filter(
    (event) =>
      selectedDate && event.date.toDateString() === selectedDate.toDateString()
  ) || [];

  return (
    <div className={styles.container}>
      <div className={styles.eventList}>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div key={event.id} className={styles.eventItem}>
              <div>
                <Image
                  width={100}
                  height={100}
                  src={event.image}
                  alt={event.title}
                  className={styles.eventImage}
                />
              </div>
              <div>
                <div className={styles.eventTitle}>
                  <div>{event.title}</div>
                  <Container
                    displayType="flex"
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                    gap="0.3rem"
                  >
                    <Image width={20} height={20} src="/cupo.png" alt="" />{" "}
                    Cupos: {event.availableSeats}/{event.totalSeats}
                  </Container>
                </div>

                <div className={styles.information}>
                  <Container
                    displayType="flex"
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                    gap="0.3rem"
                  >
                    <Image
                      width={20}
                      height={20}
                      src="/calendario.png"
                      alt=""
                    />
                    {event.date.toLocaleDateString()}
                  </Container>
                  <Container
                    displayType="flex"
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                    gap="0.3rem"
                  >
                    <Image width={20} height={20} src="/reloj.png" alt="" />
                    {event.hour}
                  </Container>
                  <Container
                    displayType="flex"
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                    gap="0.3rem"
                  >
                    <Image width={20} height={20} src="/ubicacion.png" alt="" />
                    {event.location}
                  </Container>
                </div>
              </div>
              <div>
                {event.userReservations.has(event.id) ? (
                  <button
                    className={styles.cancelButton}
                    onClick={() => handleCancelClick(event.id)}
                  >
                    Cancelar
                  </button>
                ) : (
                  <button
                    className={styles.attendButton}
                    onClick={() => handleAttendClick(event.id)}
                    disabled={event.availableSeats === 0 || event.date < today}
                  >
                    {event.availableSeats > 0 ? "Asistir" : "Asistir"}
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <>
          <Image width={60} height={60} src="/calendario.png" alt="" />
          <p>Sin eventos</p>
        </>
        )}
      </div>
      <div className={styles.calendarContainer}>
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
          <h2>{months[selectedMonth.getMonth()]}</h2>
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
        <div className={styles.calendar}>
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
                <div
                  key={`prev-${i}`}
                  className={`${styles.day} ${styles.otherMonthDay}`}
                  onClick={() =>
                    handleDateClick(
                      daysInPreviousMonth - firstDayOfMonth + i + 1,
                      false
                    )
                  }
                >
                  {daysInPreviousMonth - firstDayOfMonth + i + 1}
                </div>
              ))}
            {days.map((day) => {
              const dayDate = new Date(
                selectedMonth.getFullYear(),
                selectedMonth.getMonth(),
                day
              );
              const isToday =
                today.getDate() === day &&
                today.getMonth() === selectedMonth.getMonth() &&
                today.getFullYear() === selectedMonth.getFullYear();
              const isPastEvent = (eventsByMonth.get(monthKey) || []).some(
                (event) =>
                  event.date.getDate() === day &&
                  event.date.getMonth() === selectedMonth.getMonth() &&
                  event.date < today
              );

              return (
                <div
                  key={day}
                  className={`${styles.day} ${isToday ? styles.today : ""} ${
                    isPastEvent ? styles.pastEventDay : ""
                  }`}
                  onClick={() => handleDateClick(day, true)}
                >
                  {day}
                  {(eventsByMonth.get(monthKey) || []).some(
                    (event) =>
                      event.date.getDate() === day &&
                      event.date.getMonth() === selectedMonth.getMonth()
                  ) && (
                    <div
                      className={`${styles.eventMarker} ${
                        isPastEvent ? styles.pastEventMarker : ""
                      }`}
                    />
                  )}
                </div>
              );
            })}
            {Array(42 - (firstDayOfMonth + daysInCurrentMonth))
              .fill(null)
              .map((_, i) => (
                <div
                  key={`next-${i}`}
                  className={`${styles.day} ${styles.otherMonthDay}`}
                  onClick={() => handleDateClick(i + 1, false)}
                >
                  {i + 1}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;