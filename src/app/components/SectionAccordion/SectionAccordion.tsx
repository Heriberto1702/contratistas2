"use client";
import { useState } from "react";
import ModulePopup from "../ModulePopup/ModulePopup";
import styles from "./SectionAccordion.module.css"; // Importando el módulo de estilos
import Link from "next/link";

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
}

const SectionAccordion: React.FC<SectionAccordionProps> = ({ section }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<null | { id_modulo: string; titulo_modulo: string; contenido: string; url: string }>(null);

  const toggleSection = () => setIsOpen(!isOpen);

  const openPopup = (module: { id_modulo: string; titulo_modulo: string; contenido: string; url: string }) => {
    setSelectedModule(module);
  };

  const closePopup = () => {
    setSelectedModule(null);
  };

  return (
    
    <div className={styles.accordionContainer}>
      
      <h2 className={styles.accordionTitle} onClick={toggleSection}>
        {section.nombre_sesion}
      </h2>

      <div
        className={`${styles.accordionContent} ${isOpen ? styles.open : ""}`}
      >
        <p className={styles.accordionDescription}>{section.descripcion}</p>
        <ul className={styles.moduleList}>
          {section.Modulos && section.Modulos.length > 0 ? (
            section.Modulos.map((module) => (
              <li key={module.id_modulo} className={styles.moduleItem}>
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
            <li>No hay módulos disponibles para esta sesión.</li> // Mensaje si no hay módulos
          )}
        </ul>
      </div>
      {selectedModule && (
        <ModulePopup module={selectedModule} onClose={closePopup} />
      )}
    </div>
  );
};

export default SectionAccordion;
