import { useState, useEffect } from "react";
import styles from "./css/EventosListados.module.css";
import axios from "axios";

interface Event {
  id_evento: number;
  nombre_evento: string;
  fecha_hora: string;
  locacion: string;
  cupos: number;
  cupo_reservado: number;
}

interface EditEventModalProps {
  eventoId: number | null;
  onClose: () => void;
  onSave: (updatedEvento: Event) => void;
}

const LOCACIONES = [
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

const EditEventModal: React.FC<EditEventModalProps> = ({
  eventoId,
  onClose,
  onSave,
}) => {
  const [evento, setEvento] = useState<Event | null>(null);
  const [nombreEvento, setNombreEvento] = useState("");
  const [fechaHora, setFechaHora] = useState("");
  const [locacion, setLocacion] = useState("");
  const [cupos, setCupos] = useState(0);
  const [cupoReservado, setCupoReservado] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvento = async () => {
      if (!eventoId) return;
      try {
        const response = await axios.get(`/api/eventos/obtener?id_evento=${eventoId}`);
        const data = response.data;
        setEvento(data);
        setNombreEvento(data.nombre_evento);
        setFechaHora(data.fecha_hora);
        setLocacion(data.locacion);
        setCupos(data.cupos);
        setCupoReservado(data.cupo_reservado);
      } catch (error) {
        console.error("Error al obtener el evento:", error);
      }
    };

    fetchEvento();
  }, [eventoId]);

  const handleSaveClick = async () => {
    if (!nombreEvento || !fechaHora || !locacion || cupos <= 0) {
      setError("Por favor completa todos los campos correctamente.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("nombre_evento", nombreEvento);
      formData.append("fecha_hora", fechaHora);
      formData.append("locacion", locacion);
      formData.append("cupos", cupos.toString());
      formData.append("cupo_reservado", cupoReservado.toString());

      await axios.put(`/api/eventos/actualizar?id=${eventoId}`, formData);

      const updatedEvento: Event = {
        id_evento: eventoId ?? 0,
        nombre_evento: nombreEvento,
        fecha_hora: fechaHora,
        locacion,
        cupos,
        cupo_reservado: cupoReservado,
      };

      onSave(updatedEvento);
      onClose();
    } catch (error) {
      console.error("Error al actualizar el evento:", error);
      setError("Hubo un problema al guardar los cambios.");
    }
  };

  return (
    evento && (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <h2>Editar Evento</h2>

          {error && <p className={styles.error}>{error}</p>}

          <label>Nombre del Evento</label>
          <input
            type="text"
            value={nombreEvento}
            onChange={(e) => setNombreEvento(e.target.value)}
          />

          <label>Fecha y Hora</label>
          <input
            type="datetime-local"
            value={fechaHora}
            onChange={(e) => setFechaHora(e.target.value)}
          />

          <label>Locación</label>
          <select
            value={locacion}
            onChange={(e) => setLocacion(e.target.value)}
          >
            <option value="">Selecciona una locación</option>
            {LOCACIONES.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>

          <label>Cupos Totales</label>
          <input
            type="number"
            value={cupos}
            onChange={(e) => setCupos(Number(e.target.value))}
          />

          <label>Cupos Reservados</label>
          <input
            type="number"
            value={cupoReservado}
            onChange={(e) => setCupoReservado(Number(e.target.value))}
          />

          <div className={styles.buttonGroup}>
            <button className={styles.saveButton} onClick={handleSaveClick}>
              Guardar
            </button>
            <button className={styles.cancelButton} onClick={onClose}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default EditEventModal;
