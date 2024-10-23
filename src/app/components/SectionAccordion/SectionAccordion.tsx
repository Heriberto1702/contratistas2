// src/components/SectionAccordion.tsx
"use client";
import { Module, Section } from "../../../types/course";
import { useState } from "react";
import ModulePopup from "../ModulePopup/ModulePopup";
import styles from "./SectionAccordion.module.css"; // Importando el módulo de estilos

interface SectionAccordionProps {
  section: Section;
}

const SectionAccordion: React.FC<SectionAccordionProps> = ({ section }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  const toggleSection = () => setIsOpen(!isOpen);

  const openPopup = (module: Module) => {
    setSelectedModule(module);
  };

  const closePopup = () => {
    setSelectedModule(null);
  };

  return (
    <div className={styles.accordionContainer}>
      <h2 className={styles.accordionTitle} onClick={toggleSection}>
        Sesión {section.id}: {section.title}
      </h2>

      <div
        className={`${styles.accordionContent} ${isOpen ? styles.open : ""}`}
      >
        <p className={styles.accordionDescription}>{section.description}</p>
        <ul className={styles.moduleList}>
          {section.modules.map((module) => (
            <li key={module.id} className={styles.moduleItem}>
              {module.title}
              <button
                className={styles.viewButton}
                onClick={() => openPopup(module)}
              >
                Ver Video
              </button>
            </li>
          ))}
        </ul>
      </div>
      {selectedModule && (
        <ModulePopup module={selectedModule} onClose={closePopup} />
      )}
    </div>
  );
};

export default SectionAccordion;
