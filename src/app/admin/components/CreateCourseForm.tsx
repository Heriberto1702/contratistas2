import React, { useState } from "react";

const CreateCoursePage = () => {
  const [formData, setFormData] = useState({
    title: "",
    especialista: "",
    rubro: "",
    inicio: "",
    fin: "",
    hora: "",
    image: "",
    description: "",
    detalles: "",
    tipoCurso: "",
    recomendaciones: "",
    sections: [],
  });

  // Actualizar el estado del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Aquí podrías agregar validación de los datos antes de enviarlos a la API

    try {
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        alert("Curso creado con éxito");
        // Limpiar formulario después de enviar
        setFormData({
          title: "",
          especialista: "",
          rubro: "",
          inicio: "",
          fin: "",
          hora: "",
          image: "",
          description: "",
          detalles: "",
          tipoCurso: "",
          recomendaciones: "",
          sections: [],
        });
      } else {
        alert("Hubo un error al crear el curso.");
      }
    } catch (error) {
      console.error("Error al crear el curso:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Título del curso:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Especialista:
        <input
          type="text"
          name="especialista"
          value={formData.especialista}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Rubro:
        <input
          type="text"
          name="rubro"
          value={formData.rubro}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Fecha de inicio:
        <input
          type="text"
          name="inicio"
          placeholder="dd/mm/yyyy"
          value={formData.inicio}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Fecha de fin:
        <input
          type="text"
          name="fin"
          placeholder="dd/mm/yyyy"
          value={formData.fin}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Hora de inicio:
        <input
          type="text"
          name="hora"
          value={formData.hora}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Imagen del curso (URL):
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Descripción del curso:
        <input
        type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Detalles del curso:
        <input
        type="text"
          name="detalles"
          value={formData.detalles}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Tipo curso:
        <input
        type="text"
          name="tipoCurso"
          value={formData.tipoCurso}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Recomendaciones:
        <input
        type="text"
          name="recomendaciones"
          value={formData.recomendaciones}
          onChange={handleChange}
          required
        />
      </label>

      {/* Aquí deberías agregar la funcionalidad para agregar secciones y módulos */}
      <div>
        <h3>Secciones</h3>
        {/* Aquí añadirías una interfaz para agregar secciones y módulos dentro del formulario */}
      </div>

      <button type="submit">Crear Curso</button>
    </form>
  );
};

export default CreateCoursePage;
