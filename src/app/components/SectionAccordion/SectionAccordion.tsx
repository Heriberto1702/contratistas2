import { useState, useEffect } from "react";
import "jspdf-autotable";
import ModulePopup from "../ModulePopup/ModulePopup";
import styles from "./SectionAccordion.module.css";
import PdfPopup from "../PdfPopup/PdfPopup"; // Asegúrate de que la ruta sea correcta
import Image from "next/image";

interface SectionAccordionProps {
  section: {
    id_sesion: string;
    nombre_sesion: string;
    descripcion: string;
    Modulos: Array<{
      id_modulo: string;
      titulo_modulo: string;
      contenido: string;
      recursopdf?: string;
    }>;
  };
  id_curso: number;
  id_contratista: number;
  updateProgress: () => void; // 🔹 Agregamos esta prop
}

const SectionAccordion: React.FC<SectionAccordionProps> = ({
  section,
  id_curso,
  id_contratista,
  updateProgress,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<null | {
    id_modulo: string;
    titulo_modulo: string;
    contenido: string;
  }>(null);

  const [selectedPdfModule, setSelectedPdfModule] = useState<null | {
    id_modulo: string;
    titulo_modulo: string;
    recursopdf?: string;
  }>(null);

  const [completedModules, setCompletedModules] = useState<string[]>([]);

  const toggleSection = () => setIsOpen(!isOpen);

  const openPopup = async (module: {
    id_modulo: string;
    titulo_modulo: string;
    contenido: string;
  }) => {
    setSelectedModule(module);

    if (!completedModules.includes(module.id_modulo)) {
      const updatedCompleted = [...completedModules, module.id_modulo];
      setCompletedModules(updatedCompleted);

      // Enviar solicitud a la API para registrar el módulo como completado
      const response = await fetch("/api/courses/moduloscompletados", {
        method: "POST",
        body: JSON.stringify({
          id_curso,
          id_contratista,
          id_modulo: module.id_modulo,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Módulo completado registrado correctamente");

        // **Llamar a la función para actualizar el progreso en SectionsPage**
        updateProgress();
      } else {
        console.error("Error al registrar el módulo como abierto");
      }
    }
  };
  const openPopuppdf = (module: {
    id_modulo: string;
    titulo_modulo: string;
    recursopdf?: string;
  }) => {
    if (module.recursopdf) {
      setSelectedPdfModule(module);
    } else {
      alert("No hay un PDF disponible para este módulo.");
    }
  };
  const closePdfPopup = () => {
    setSelectedPdfModule(null);
  };
  const closePopup = () => {
    setSelectedModule(null);
  };

  return (
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
          {section.Modulos.length > 0 ? (
            section.Modulos.map((module) => (
              <li
                key={module.id_modulo}
                className={`${styles.moduleItem} ${
                  completedModules.includes(module.id_modulo)
                    ? styles.completed
                    : ""
                }`}
              > <div className={styles.licontainer}>
                {module.recursopdf && (
               
                  <button
                    className={styles.iconPdf}
                    onClick={() => openPopuppdf(module)}
                  >
                    <Image
        width={512}
        height={512}
        src="/icons/documento-pdf.png"
        alt="icono pdf" 
        className={styles.imgcontainer}     
      />

                  </button>
                )}
                <button
                  className={styles.viewButton}
                  onClick={() => openPopup(module)}
                >
                  <Image
        width={512}
        height={512}
        src="/icons/play.png"
        alt="icono play" 
        className={styles.imgcontainer}     
      />
                </button>
                {module.titulo_modulo}
                </div>
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
      {selectedPdfModule && (
        <PdfPopup module={selectedPdfModule} onClose={closePdfPopup} />
      )}
    </div>
  );
};

export default SectionAccordion;
