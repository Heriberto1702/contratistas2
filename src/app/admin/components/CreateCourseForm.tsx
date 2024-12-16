import React, { useState } from "react";
import styles from "./css/CreateCoursePage.module.css";

interface FormData {
  nombre_curso: string;
  especialista: string;
  rubro: string;
  fecha_hora_Inicio: string;
  fecha_hora_Fin: string;
  hora: string;
  imagen_curso: File | null;
  descripcion: string;
  detalles_curso: string;
  tipo_curso: string;
  recomendaciones: string;
  sesiones: {
    nombre_sesion: string;
    descripcion: string;
    fecha_hora: string;
    modulos: { titulo_modulo: string; contenido: string }[];
  }[];
}

const CreateCoursePage = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre_curso: "",
    especialista: "",
    rubro: "",
    fecha_hora_Inicio: "",
    fecha_hora_Fin: "",
    hora: "",
    imagen_curso:null,
    descripcion: "",
    detalles_curso: "",
    tipo_curso: "",
    recomendaciones: "",
    sesiones: [],
  });
  
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      imagen_curso: file,
    }));
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
    newSesiones[sectionIndex].modulos.push({
      titulo_modulo: "",
      contenido: "",
    });
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

  const handleDeleteSection = (index: number) => {
    const newSesiones = formData.sesiones.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      sesiones: newSesiones,
    });
  };

  const handleDeleteModule = (sectionIndex: number, moduleIndex: number) => {
    const newSesiones = [...formData.sesiones];
    newSesiones[sectionIndex].modulos = newSesiones[sectionIndex].modulos.filter((_, i) => i !== moduleIndex);
    setFormData({
      ...formData,
      sesiones: newSesiones,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    form.append("nombre_curso", formData.nombre_curso);
    form.append("descripcion", formData.descripcion);
    form.append("especialista", formData.especialista);
    form.append("fecha_hora_Inicio", formData.fecha_hora_Inicio);
    form.append("fecha_hora_Fin", formData.fecha_hora_Fin);
    form.append("hora", formData.hora);
    form.append("detalles_curso", formData.detalles_curso);
    form.append("recomendaciones", formData.recomendaciones);
    form.append("rubro", formData.rubro);
    form.append("tipo_curso", formData.tipo_curso);
    
    // Agregar sesiones como JSON string
    form.append("sesiones", JSON.stringify(formData.sesiones));
  
    // Si hay una imagen, la agregamos
    if (formData.imagen_curso) {
      form.append("imagen_curso", formData.imagen_curso);
    }
      try {
      
          // Luego de que la imagen se suba, enviar los datos del curso
          const response = await fetch("/api/courses/crear", {
            method: "POST",
            body: form,
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
              imagen_curso: null,
              descripcion: "",
              detalles_curso: "",
              tipo_curso: "",
              recomendaciones: "",
              sesiones: [],
            });
          }
      } catch (error) {
        console.error("Error al subir la imagen:", error);
        alert("Error al subir la imagen.");
      }
    }

    return (
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.headerContainer}>
          <h2 className={styles.title}>Crear Curso</h2>
        </div>
    
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Información General</h3>
          <div className={styles.fieldGroup}>
            <div className={styles.label}>
              Nombre del curso:
              <input
                className={styles.inputField}
                type="text"
                placeholder="Nombre del Curso"
                name="nombre_curso"
                value={formData.nombre_curso}
                onChange={handleChange}
                required
              />
            </div>
    
            <div className={styles.label}>
              Especialista:
              <input
                className={styles.inputField}
                type="text"
                placeholder="Especialista"
                name="especialista"
                value={formData.especialista}
                onChange={handleChange}
                required
              />
            </div>
    
            <div className={styles.label}>
              Rubro:
              <input
                className={styles.inputField}
                type="text"
                placeholder="Rubro"
                name="rubro"
                value={formData.rubro}
                onChange={handleChange}
                required
              />
            </div>
    
            <div className={styles.label}>
              Fecha de inicio:
              <input
                className={styles.inputField}
                type="date"
                name="fecha_hora_Inicio"
                value={formData.fecha_hora_Inicio}
                onChange={handleChange}
                required
              />
            </div>
    
            <div className={styles.label}>
              Fecha de fin:
              <input
                className={styles.inputField}
                type="date"
                name="fecha_hora_Fin"
                value={formData.fecha_hora_Fin}
                onChange={handleChange}
                required
              />
            </div>
    
            <div className={styles.label}>
              Hora de inicio:
              <input
                className={styles.inputField}
                type="time"
                name="hora"
                value={formData.hora}
                onChange={handleChange}
                required
              />
            </div>
    
            <div className={styles.label}>
              Imagen de curso:
              <input
                className={styles.inputField}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </div>
    
            <div className={styles.label}>
              Descripción del curso:
              <input
                className={styles.inputField}
                type="text"
                placeholder="Descripción del Curso"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                required
              />
            </div>
    
            <div className={styles.label}>
              Detalles del curso:
              <input
                className={styles.inputField}
                type="text"
                placeholder="Detalles del Curso"
                name="detalles_curso"
                value={formData.detalles_curso}
                onChange={handleChange}
                required
              />
            </div>
    
            <div className={styles.label}>
              Tipo de curso:
              <select
                className={styles.selectField}
                name="tipo_curso"
                value={formData.tipo_curso}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Selecciona el tipo de curso
                </option>
                <option value="Online">Online</option>
                <option value="Presencial">Presencial</option>
              </select>
            </div>
    
            <div className={styles.label}>
              Recomendaciones:
              <input
                className={styles.inputField}
                type="text"
                placeholder="Recomendaciones"
                name="recomendaciones"
                value={formData.recomendaciones}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
    
        <div className={styles.subSection}>
          <h3 className={styles.sectionTitle}>Secciones</h3>
          {formData.sesiones.map((section, index) => (
            <div key={index} className={styles.sectionContainer}>
              <div className={styles.label}>
                Nombre de la sesión:
                <input
                  className={styles.inputField}
                  type="text"
                  placeholder="Nombre de la sesión"
                  value={section.nombre_sesion}
                  onChange={(e) =>
                    handleSectionChange(index, "nombre_sesion", e.target.value)
                  }
                />
              </div>
              <div className={styles.label}>
                Descripción de la sesión:
                <input
                  className={styles.inputField}
                  type="text"
                  placeholder="Descripción de la sesión"
                  value={section.descripcion}
                  onChange={(e) =>
                    handleSectionChange(index, "descripcion", e.target.value)
                  }
                />
              </div>
              <div className={styles.label}>
                Fecha y hora de la sesión:
                <input
                  className={styles.inputField}
                  type="datetime-local"
                  value={section.fecha_hora}
                  onChange={(e) =>
                    handleSectionChange(index, "fecha_hora", e.target.value)
                  }
                />
              </div>
    
              <div className={styles.moduleContainer}>
                {section.modulos.map((module, moduleIndex) => (
                  <div key={moduleIndex} className={styles.moduleSubContainer}>
                    <div className={styles.moduleTitle}>Módulo {moduleIndex + 1}</div>
                    <div className={styles.moduleFieldGroup}>
                      <div className={styles.label}>
                        Título del módulo:
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
                      </div>
                      <div className={styles.label}>
                        Contenido del módulo:
                        <textarea
                          className={styles.textareaField}
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
                    </div>
                    <div className={styles.moduleActions}>
                      <button
                        type="button"
                        className={`${styles.moduleButton} ${styles.moduleButtonDanger}`}
                        onClick={() => handleDeleteModule(index, moduleIndex)}
                      >
                        Eliminar Módulo
                      </button>
                    </div>
                  </div>
                ))}
                <div className={styles.buttonRow}>
                  <button
                    type="button"
                    className={styles.moduleButton}
                    onClick={() => handleAddModule(index)}
                  >
                    Agregar Módulo
                  </button>
                </div>
              </div>
    
              <div className={styles.buttonRow}>
                <button
                  type="button"
                  className={`${styles.moduleButton} ${styles.moduleButtonDanger}`}
                  onClick={() => handleDeleteSection(index)}
                >
                  Eliminar Sección
                </button>
              </div>
            </div>
          ))}
          <div className={styles.buttonRow}>
            <button
              type="button"
              className={styles.moduleButton}
              onClick={handleAddSection}
            >
              Agregar Sección
            </button>
          </div>
        </div>
    
        <div className={styles.submitContainer}>
          <button type="submit" className={`${styles.button} ${styles.submitButton}`}>
            Crear Curso
          </button>
        </div>
      </form>
    );
    
};

export default CreateCoursePage;
