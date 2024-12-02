"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./AdminEventos.css"; // Importa el archivo CSS
import Image from "next/image";
import BannerSlidernew from "../../components/BannerSlidernew/BannerSlidernew";


const AdminEventos = () => {

  const images = ["/banner.png", "/banner.png"];

  const [formData, setFormData] = useState<{
    nombre_evento: string;
    locacion: string;
    cupos: string;
    imagen_evento: File | null;
    fecha: string;
    hora: string;
  }>({
    nombre_evento: "",
    locacion: "",
    cupos: "",
    imagen_evento: null,
    fecha: "",
    hora: "",
  });

  const tiendas = [
    "Tienda 1",
    "Tienda 2",
    "Tienda 3",
    "Tienda 4",
    "Tienda 5",
    "Tienda 6",
    "Tienda 7",
    "Tienda 8",
    "Tienda 9",
    "Tienda 10",
    "Tienda 11",
    "Tienda 12",
    "Tienda 13",
    "Tienda 14",
    "Tienda 15",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      imagen_evento: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fecha_hora = `${formData.fecha}T${formData.hora}:00`;

    const form = new FormData();
    form.append("nombre_evento", formData.nombre_evento);
    form.append("locacion", formData.locacion);
    form.append("cupos", formData.cupos);
    if (formData.imagen_evento) form.append("imagen_evento", formData.imagen_evento);
    form.append("fecha_hora", fecha_hora);

    try {
      const response = await fetch("/api/eventos", {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        alert("Evento creado exitosamente.");
        setFormData({
          nombre_evento: "",
          locacion: "",
          cupos: "",
          imagen_evento: null,
          fecha: "",
          hora: "",
        });
      } else {
        alert("Error al crear el evento.");
      }
    } catch (error) {
      console.error(error);
      alert("Error al enviar el formulario.");
    }
  };

  


  return (
    <div className="admin-eventos">
      <BannerSlidernew images={images} interval={3000} />
      <h1 className="titulo">Crear Nuevo Evento</h1>
      <form className="formulario" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre_evento"
          placeholder="Nombre del Evento"
          value={formData.nombre_evento}
          onChange={handleChange}
          required
        />
        <select name="locacion" value={formData.locacion} onChange={handleChange} required>
          <option value="">Selecciona una locación</option>
          {tiendas.map((tienda, index) => (
            <option key={index} value={tienda}>
              {tienda}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="cupos"
          placeholder="Cupos"
          value={formData.cupos}
          onChange={handleChange}
          max={100}
          required
        />
        <input type="file" name="imagen_evento" accept="image/*" onChange={handleFileChange} required />
        <input
          type="date"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="hora"
          value={formData.hora}
          onChange={handleChange}
          required
        />
        <button type="submit">Crear Evento</button>
      </form>
    </div>
  );
};

export default AdminEventos;
