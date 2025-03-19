import { useState, useEffect } from "react";
import "jspdf-autotable";
import ModulePopup from "../ModulePopup/ModulePopup";
import styles from "./SectionAccordion.module.css";

interface SectionAccordionProps {
  section: {
    id_sesion: string;
    nombre_sesion: string;
    descripcion: string;
    Modulos: Array<{
      id_modulo: string;
      titulo_modulo: string;
      contenido: string;
      url: string;
    }>;
  };
  id_curso: number;

}
const SectionAccordion: React.FC<SectionAccordionProps> = ({
  section,
  id_curso,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<null | {
    id_modulo: string;
    titulo_modulo: string;
    contenido: string;
    url: string;
  }>(null);
  const [progress, setProgress] = useState(0);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  // Cargar el progreso al iniciar el componente
  useEffect(() => {
    const fetchProgress = async () => {
      const response = await fetch(
        `/api/courses/progreso?id_curso=${id_curso}`
      );
      const data = await response.json();
      if (data.avance) {
        setProgress(data.avance);
        const completed = Math.round(
          data.avance / (100 / section.Modulos.length)
        );
        setCompletedModules(new Array(completed).fill(""));
        setIsCompleted(data.avance === 100); // Aquí nos aseguramos de que si está 100, no se permita agregar más módulos
  
      }
    };
    fetchProgress();
  }, [section.id_sesion, section.Modulos.length, id_curso]);
  // Función para abrir y cerrar el accordion
  const toggleSection = () => setIsOpen(!isOpen);
  // Abrir el popup de módulo y actualizar el progreso
  const openPopup = async (module: {
    id_modulo: string;
    titulo_modulo: string;
    contenido: string;
    url: string;
  }) => {
    setSelectedModule(module);
    // Solo permitimos marcar como completado si el curso no está finalizado
    if (!isCompleted && !completedModules.includes(module.id_modulo)) {
      const updatedCompleted = [...completedModules, module.id_modulo];
      setCompletedModules(updatedCompleted);
      const newProgress =
        (updatedCompleted.length / section.Modulos.length) * 100;
      setProgress(newProgress);
      setIsCompleted(newProgress === 100);
      // Llamar a la API para actualizar el progreso en la base de datos
      await fetch("/api/courses/progreso", {
        method: "PUT",
        body: JSON.stringify({
          id_curso: id_curso,
          nuevoAvance: updatedCompleted.length,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  };
  // Cerrar el popup
  const closePopup = () => {
    setSelectedModule(null);
  };
  return (
    <>
   
      <div className={styles.accordionContainer}>
        <p
          className={`${styles.accordionTitle} ${isOpen ? styles.open : ""}`}
          onClick={toggleSection}
        >
          {section.nombre_sesion}
        </p>

        <div
          className={`${styles.accordionContent} ${isOpen ? styles.open : ""}`}
        >
          <p className={styles.accordionDescription}>{section.descripcion}</p>
          <ul className={styles.moduleList}>
            {section.Modulos && section.Modulos.length > 0 ? (
              section.Modulos.map((module) => (
                <li
                  key={module.id_modulo}
                  className={`${styles.moduleItem} ${
                    completedModules.includes(module.id_modulo)
                      ? styles.completed
                      : ""
                  }`}
                >
                  <button
                    className={styles.viewButton}
                    onClick={() => openPopup(module)}
                  >
                    &#9654;
                  </button>
                  {module.titulo_modulo}
                </li>
              ))
            ) : (
              <li>No hay módulos disponibles para esta sesión.</li>
            )}
          </ul>
        </div>

        {selectedModule && (
          <ModulePopup module={selectedModule} onClose={closePopup} />
        )}
      </div>
    </>
  );
};

export default SectionAccordion;
