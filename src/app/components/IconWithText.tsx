// src/components/IconWithText.tsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import styles from "./IconWithText.module.css";

interface IconWithTextProps {
  icon: IconProp;
  text: string;
}

const IconWithText: React.FC<IconWithTextProps> = ({ icon, text }) => {
  return (
      <div className={styles.iconWithText}>
        <FontAwesomeIcon icon={icon} className={styles.icon} />
        <span className={styles.text}>{text}</span>
      </div>
  );
};

export default IconWithText;
