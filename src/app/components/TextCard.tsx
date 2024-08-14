import React from 'react';
import styles from './TextCard.module.css';

interface TextCardProps {
  title: string;
  content?: string;
}

const TextCard: React.FC<TextCardProps> = ({ title, content }) => {
  return (
    <div className={styles.textCard}>
      <h2 className={styles.textCardTitle}>{title}</h2>
      <p className={styles.textCardContent}>{content}</p>
    </div>
  );
};

export default TextCard;