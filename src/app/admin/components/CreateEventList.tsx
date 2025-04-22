import React, { useState } from "react";
import styles from "./css/EventList.module.css";


const AdminEventos = () => {
  const [formData, setFormData] = useState<{
    nombre_evento: string;
    locacion: string;
    cupos: string;
    imagen_evento: File | null;
    imagen_des_evento: File | null;
    fecha: string;
    hora: string;
    activo?: boolean;
    cupo_reservado:string;
  }>({
    nombre_evento: "",
    locacion: "",
    cupos: "",
    activo: false,
    imagen_evento: null,
    imagen_des_evento: null,
    fecha: "",
    hora: "",
    cupo_reservado:"",
  });

  const tiendas = [
    "Sinsa Carretera Masaya",
    "Sinsa Radial",
    "Sinsa Norte",
    "Sinsa El Periodista",
    "Sinsa Home Center",
    "Sinsa Masaya",
    "Sinsa Jinotepe",
    "Sinsa Leon",
    "Sinsa Rivas",
    "Sinsa Juigalpa",
    "Sinsa Chinandega",
    "Sinsa Esteli",
    "Sinsa Matagalpa",
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
  const handleFileChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file2 = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      imagen_des_evento: file2,
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
    if (formData.imagen_des_evento) form.append("imagen_des_evento", formData.imagen_des_evento);
    form.append("fecha_hora", fecha_hora);
    form.append("cupo_reservado", formData.cupo_reservado);
    form.append("activo", formData.activo ? "true" : "false");
    
    try {
      const response = await fetch("/api/eventos/crear", {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        alert("Evento creado exitosamente.");
        setFormData({
          nombre_evento: "",
          locacion: "",
          cupos: "",
          activo: false,
          imagen_evento: null,
          imagen_des_evento: null,
          fecha: "",
          hora: "",
          cupo_reservado:"",
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
    <div className={styles["admin-eventos"]}>
      <h1 className={styles["titulo"]}>Crear Nuevo Evento</h1>
      <form className={styles["formulario"]} onSubmit={handleSubmit}>
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
         <input
          type="number"
          name="cupo_reservado"
          placeholder="Cupos Reservados"
          value={formData.cupo_reservado}
          onChange={handleChange}
          max={100}
          required
        />
        <label>Icono
        <input
          type="file"
          name="imagen_evento"
          accept="image/*"
          onChange={handleFileChange}
          required
        /></label>
         <label>Imagen Descriptiva
           <input
          type="file"
          name="imagen_des_evento"
          accept="image/*"
          onChange={handleFileChange2}
          required
        /></label>
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
        <div className={styles.labelcheckbox}>
            Activo:
            <input
              type="checkbox"
              name="activo"
              checked={formData.activo}
              onChange={(e) =>
                setFormData({ ...formData, activo: e.target.checked })
              }
            />
          </div>
        <button type="submit">Crear Evento</button>
      </form>

    
    </div>
  );
};

export default AdminEventos;