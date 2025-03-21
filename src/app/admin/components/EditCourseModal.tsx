import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./css/EditCourseModal.module.css";

interface Curso {
  id_curso: string;
  nombre_curso: string;
  descripcion: string;
  especialista: string;
  fecha_hora_Inicio: string;
  fecha_hora_Fin: string;
  hora: string;
  rubro: string;
  recomendaciones: string;
  detalles_curso: string;
  tipo_curso: string;
  sesiones: {
    nombre_sesion: string;
    descripcion: string;
    fecha_hora: string;
    Modulos: { titulo_modulo: string; contenido: string }[];
  }[];
}

interface EditCourseModalProps {
  cursoId: string;
  onClose: () => void;
  onSave: (updatedCourse: Curso) => void; // ✅ Ahora usa la interfaz 'Curso'
}

const EditarCurso: React.FC<EditCourseModalProps> = ({
  cursoId,
  onClose,
  onSave,
}) => {
  const [curso, setCurso] = useState<Curso | null>(null);

  // Cargar los datos del curso
  useEffect(() => {
    const fetchCurso = async () => {
      try {
        const response = await fetch(
          `/api/courses/obtener?id_curso=${cursoId}`
        );
        if (response.status !== 200) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setCurso(data);
      } catch (error) {
        console.error("Error cargando el curso:", error);
      }
    };

    fetchCurso();
  }, [cursoId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (curso) {
      setCurso({ ...curso, [e.target.name]: e.target.value });
    }
  };

  // Función para agregar una nueva sesión
  const agregarSesion = () => {
    if (curso) {
      const nuevaSesion = {
        nombre_sesion: "",
        descripcion: "",
        fecha_hora: new Date().toISOString().slice(0, 10), // Fecha actual en formato 'YYYY-MM-DD'
        Modulos: [],
      };
      const updatedSesiones = [...curso.sesiones, nuevaSesion];
      setCurso({ ...curso, sesiones: updatedSesiones });
    }
  };

  // Función para agregar un nuevo módulo a una sesión
  const agregarModulo = (sesionIndex: number) => {
    if (curso) {
      const nuevaSesion = { ...curso.sesiones[sesionIndex] };
      const nuevoModulo = { titulo_modulo: "", contenido: "" };
      nuevaSesion.Modulos.push(nuevoModulo);
      const updatedSesiones = [...curso.sesiones];
      updatedSesiones[sesionIndex] = nuevaSesion;
      setCurso({ ...curso, sesiones: updatedSesiones });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!curso) {
      alert("Error: No hay información del curso para actualizar.");
      return;
    }

    const formData = new FormData();
    formData.append("nombre_curso", curso.nombre_curso || "");
    formData.append("descripcion", curso.descripcion || "");
    formData.append("especialista", curso.especialista || "");
    formData.append("fecha_hora_Inicio", curso.fecha_hora_Inicio || "");
    formData.append("fecha_hora_Fin", curso.fecha_hora_Fin || "");
    formData.append("hora", curso.hora || "");
    formData.append("rubro", curso.rubro || "");
    formData.append("recomendaciones", curso.recomendaciones || "");
    formData.append("detalles_curso", curso.detalles_curso || "");
    formData.append("tipo_curso", curso.tipo_curso || "");

    // Validar que `sesiones` sea un array antes de agregarlo
    if (Array.isArray(curso.sesiones)) {
      formData.append("sesiones", JSON.stringify(curso.sesiones));
    } else {
      console.error("Error: 'sesiones' no está definido o no es un array");
      alert("Error: 'sesiones' no está definido o no es un array");
      return;
    }
    if (!curso.nombre_curso || !curso.descripcion || !curso.fecha_hora_Inicio) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }
    try {
      const response = await axios.put(
        `/api/courses/actualizar?id=${cursoId}`,
        formData
      );

      const data = response.data;
      alert("Curso actualizado con éxito");
      onSave(data); // Pasar el curso actualizado
      onClose(); // Cierra el modal después de guardar
    } catch (error) {
      console.error("Error actualizando el curso:", error);
      alert("Error al actualizar el curso");
    }
  };

  return (
    curso && (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <button className={styles.closeButton} onClick={onClose}>
            X
          </button>
          <h2 className={styles.modalTitle}>Editar Curso</h2>
          <form onSubmit={handleSubmit} className={styles.editCourseForm}>
            <div className={styles.formGroup}>
              <label htmlFor="nombre_curso" className={styles.label}>
                Nombre del Curso
              </label>
              <input
                type="text"
                id="nombre_curso"
                name="nombre_curso"
                value={curso.nombre_curso}
                onChange={handleChange}
                className={styles.inputField}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="descripcion" className={styles.label}>
                Descripción
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={curso.descripcion}
                onChange={handleChange}
                className={styles.textareaField}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="especialista" className={styles.label}>
                Especialista
              </label>
              <input
                type="text"
                id="especialista"
                name="especialista"
                value={curso.especialista}
                onChange={handleChange}
                className={styles.inputField}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="fecha_hora_Inicio" className={styles.label}>
                Fecha y Hora de Inicio
              </label>
              <input
                type="date"
                id="fecha_hora_Inicio"
                name="fecha_hora_Inicio"
                value={curso.fecha_hora_Inicio}
                onChange={handleChange}
                className={styles.inputField}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="fecha_hora_Fin" className={styles.label}>
                Fecha y Hora de Fin
              </label>
              <input
                type="date"
                id="fecha_hora_Fin"
                name="fecha_hora_Fin"
                value={curso.fecha_hora_Fin}
                onChange={handleChange}
                className={styles.inputField}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="hora" className={styles.label}>
                Hora
              </label>
              <input
                type="time"
                id="hora"
                name="hora"
                value={curso.hora}
                onChange={handleChange}
                className={styles.inputField}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="rubro" className={styles.label}>
                Rubro
              </label>
              <input
                type="text"
                id="rubro"
                name="rubro"
                value={curso.rubro}
                onChange={handleChange}
                className={styles.inputField}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="recomendaciones" className={styles.label}>
                Recomendaciones
              </label>
              <textarea
                id="recomendaciones"
                name="recomendaciones"
                value={curso.recomendaciones}
                onChange={handleChange}
                className={styles.textareaField}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="detalles_curso" className={styles.label}>
                Detalles del Curso
              </label>
              <textarea
                id="detalles_curso"
                name="detalles_curso"
                value={curso.detalles_curso}
                onChange={handleChange}
                className={styles.textareaField}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="tipo_curso" className={styles.label}>
                Tipo de Curso
              </label>
              <input
                type="text"
                id="tipo_curso"
                name="tipo_curso"
                value={curso.tipo_curso}
                onChange={handleChange}
                className={styles.inputField}
              />
            </div>
            <button
              type="button"
              onClick={agregarSesion}
              className={styles.addButton}
            >
              Agregar Nueva Sesión
            </button>
            {/* Módulos y Sesiones */}
            {curso.sesiones &&
              curso.sesiones.map((sesion, sesionIndex) => (
                <div key={sesionIndex} className={styles.sessionGroup}>
                  <label className={styles.label}>Título de la Sesión</label>
                  <input
                    className={styles.inputField}
                    type="text"
                    name={`nombre_sesion_${sesionIndex}`}
                    value={sesion.nombre_sesion}
                    onChange={(e) => {
                      const updatedSesiones = curso.sesiones.map((s, idx) =>
                        idx === sesionIndex
                          ? { ...s, nombre_sesion: e.target.value }
                          : s
                      );
                      setCurso({ ...curso, sesiones: updatedSesiones });
                    }}
                  />

                  <label className={styles.label}>
                    Descripcion de la sesion
                  </label>

                  <textarea
                    name={`descripcion_sesion_${sesionIndex}`}
                    value={sesion.descripcion}
                    onChange={(e) => {
                      const updatedSesiones = curso.sesiones.map((s, idx) =>
                        idx === sesionIndex
                          ? { ...s, descripcion: e.target.value }
                          : s
                      );
                      setCurso({ ...curso, sesiones: updatedSesiones });
                    }}
                    className={styles.textareaField}
                  />

                  <button
                    type="button"
                    onClick={() => agregarModulo(sesionIndex)}
                    className={styles.addButton}
                  >
                    Agregar Módulo
                  </button>
                  {sesion.Modulos && sesion.Modulos.length > 0 ? (
                    sesion.Modulos.map((modulo, moduloIndex) => (
                      <div key={moduloIndex} className={styles.moduleGroup}>
                        <div className={styles.formGroup}>
                          <label
                            htmlFor={`titulo_modulo_${moduloIndex}`}
                            className={styles.label}
                          >
                            Título del Módulo
                          </label>
                          <input
                            type="text"
                            id={`titulo_modulo_${moduloIndex}`}
                            value={modulo.titulo_modulo}
                            onChange={(e) => {
                              const updatedSesiones = [...curso.sesiones];
                              updatedSesiones[sesionIndex].Modulos[
                                moduloIndex
                              ].titulo_modulo = e.target.value;
                              setCurso({ ...curso, sesiones: updatedSesiones });
                            }}
                            className={styles.inputField}
                          />
                        </div>

                        <div className={styles.formGroup}>
                          <label
                            htmlFor={`contenido_${moduloIndex}`}
                            className={styles.label}
                          >
                            Contenido
                          </label>
                          <textarea
                            id={`contenido_${moduloIndex}`}
                            value={modulo.contenido}
                            onChange={(e) => {
                              const updatedSesiones = [...curso.sesiones];
                              updatedSesiones[sesionIndex].Modulos[
                                moduloIndex
                              ].contenido = e.target.value;
                              setCurso({ ...curso, sesiones: updatedSesiones });
                            }}
                            className={styles.textareaField}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className={styles.noModulesText}>
                      No hay módulos para esta sesión
                    </p>
                  )}
                </div>
              ))}

            <div className={styles.buttonGroup}>
              <button type="submit" className={styles.submitBtn}>
                Actualizar Curso
              </button>
              <button
                type="button"
                onClick={onClose}
                className={styles.closeBtn}
              >
                Cerrar
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default EditarCurso;
