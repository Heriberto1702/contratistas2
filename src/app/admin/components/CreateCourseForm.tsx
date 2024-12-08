import React, { useState } from "react";
import styles from "./css/CreateCoursePage.module.css";

interface FormData {
  nombre_curso: string;
  especialista: string;
  rubro: string;
  fecha_hora_Inicio: string;
  fecha_hora_Fin: string;
  hora: string;
  imagen_curso: string;
  descripcion: string;
  detalles_curso: string;
  tipo_curso: string;
  recomendaciones: string;
  sesiones: { nombre_sesion: string; descripcion: string; fecha_hora: string; modulos: { titulo_modulo: string; contenido: string }[] }[]; 
}

const CreateCoursePage = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre_curso: "",
    especialista: "",
    rubro: "",
    fecha_hora_Inicio: "",
    fecha_hora_Fin: "",
    hora: "",
    imagen_curso: "",
    descripcion: "",
    detalles_curso: "",
    tipo_curso: "",
    recomendaciones: "",
    sesiones: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddSection = () => {
    setFormData({
      ...formData,
      sesiones: [
        ...formData.sesiones,
        { nombre_sesion: "", descripcion: "", fecha_hora: "", modulos: [] },
      ],
    });
  };

  const handleSectionChange = (index: number, field: string, value: string) => {
    const newSesiones = [...formData.sesiones];
    newSesiones[index] = { ...newSesiones[index], [field]: value };
    setFormData({
      ...formData,
      sesiones: newSesiones,
    });
  };

  const handleAddModule = (sectionIndex: number) => {
    const newSesiones = [...formData.sesiones];
    newSesiones[sectionIndex].modulos.push({ titulo_modulo: "", contenido: "" });
    setFormData({
      ...formData,
      sesiones: newSesiones,
    });
  };

  const handleModuleChange = (
    sectionIndex: number,
    moduleIndex: number,
    field: string,
    value: string
  ) => {
    const newSesiones = [...formData.sesiones];
    newSesiones[sectionIndex].modulos[moduleIndex] = {
      ...newSesiones[sectionIndex].modulos[moduleIndex],
      [field]: value,
    };
    setFormData({
      ...formData,
      sesiones: newSesiones,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/courses/crear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.error) {
        alert("Hubo un error al crear el curso.");
      } else {
        alert("Curso creado con éxito");
        setFormData({
          nombre_curso: "",
          especialista: "",
          rubro: "",
          fecha_hora_Inicio: "",
          fecha_hora_Fin: "",
          hora: "",
          imagen_curso: "",
          descripcion: "",
          detalles_curso: "",
          tipo_curso: "",
          recomendaciones: "",
          sesiones: [],
        });
      }
    } catch (error) {
      console.error("Error al crear el curso:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <label className={styles.label}>
        Nombre del curso:
        <input
          className={styles.inputField}
          type="text"
          name="nombre_curso"
          value={formData.nombre_curso}
          onChange={handleChange}
          required
        />
      </label>
      <label className={styles.label}>
        Especialista:
        <input
          className={styles.inputField}
          type="text"
          name="especialista"
          value={formData.especialista}
          onChange={handleChange}
          required
        />
      </label>
      <label className={styles.label}>
        Rubro:
        <input
          className={styles.inputField}
          type="text"
          name="rubro"
          value={formData.rubro}
          onChange={handleChange}
          required
        />
      </label>
      <label className={styles.label}>
        Fecha de inicio:
        <input
          className={styles.inputField}
          type="date"
          name="fecha_hora_Inicio"
          value={formData.fecha_hora_Inicio}
          onChange={handleChange}
          required
        />
      </label>
      <label className={styles.label}>
        Fecha de fin:
        <input
          className={styles.inputField}
          type="date"
          name="fecha_hora_Fin"
          value={formData.fecha_hora_Fin}
          onChange={handleChange}
          required
        />
      </label>
      <label className={styles.label}>
        Hora de inicio:
        <input
          className={styles.inputField}
          type="time"
          name="hora"
          value={formData.hora}
          onChange={handleChange}
          required
        />
      </label>
      <label className={styles.label}>
        Imagen del curso (URL):
        <input
          className={styles.inputField}
          type="text"
          name="imagen_curso"
          value={formData.imagen_curso}
          onChange={handleChange}
          required
        />
      </label>
      <label className={styles.label}>
        Descripción del curso:
        <input
          className={styles.inputField}
          type="text"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          required
        />
      </label>
      <label className={styles.label}>
        Detalles del curso:
        <input
          className={styles.inputField}
          type="text"
          name="detalles_curso"
          value={formData.detalles_curso}
          onChange={handleChange}
          required
        />
      </label>
      <label className={styles.label}>
        Tipo de curso:
        <input
          className={styles.inputField}
          type="text"
          name="tipo_curso"
          value={formData.tipo_curso}
          onChange={handleChange}
          required
        />
      </label>
      <label className={styles.label}>
        Recomendaciones:
        <input
          className={styles.inputField}
          type="text"
          name="recomendaciones"
          value={formData.recomendaciones}
          onChange={handleChange}
          required
        />
      </label>

      <div className={styles.sectionsContainer}>
        <h3>Secciones</h3>
        {formData.sesiones.map((section, index) => (
          <div key={index} className={styles.section}>
            <input
              className={styles.inputField}
              type="text"
              placeholder="Nombre de la sesión"
              value={section.nombre_sesion}
              onChange={(e) =>
                handleSectionChange(index, "nombre_sesion", e.target.value)
              }
            />
            <input
              className={styles.inputField}
              type="text"
              placeholder="Descripción de la sesión"
              value={section.descripcion}
              onChange={(e) =>
                handleSectionChange(index, "descripcion", e.target.value)
              }
            />
            <input
              className={styles.inputField}
              type="datetime-local"
              placeholder="Fecha y hora de la sesión"
              value={section.fecha_hora}
              onChange={(e) =>
                handleSectionChange(index, "fecha_hora", e.target.value)
              }
            />
            <button type="button" className={styles.button} onClick={() => handleAddModule(index)}>
              Agregar Módulo
            </button>
            <div>
              {section.modulos.map((module, moduleIndex) => (
                <div key={moduleIndex}>
                  <input
                    className={styles.inputField}
                    type="text"
                    placeholder="Título del módulo"
                    value={module.titulo_modulo}
                    onChange={(e) =>
                      handleModuleChange(
                        index,
                        moduleIndex,
                        "titulo_modulo",
                        e.target.value
                      )
                    }
                  />
                  <textarea
                    className={styles.textarea}
                    placeholder="Contenido del módulo"
                    value={module.contenido}
                    onChange={(e) =>
                      handleModuleChange(
                        index,
                        moduleIndex,
                        "contenido",
                        e.target.value
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button type="button" className={styles.button} onClick={handleAddSection}>
          Agregar Sección
        </button>
      </div>

      <button type="submit" className={styles.button}>Crear Curso</button>
    </form>
  );
};

export default CreateCoursePage;