// src/components/CustomCard.tsx
import React from 'react';
import Image from 'next/image';
import styles from './CustomCard.module.css';

interface CustomCardProps {
    title?: string;
    alt: string;
    imageUrl: string;
    linkUrl?: string;
    linkText?: string;
}

const CustomCard: React.FC<CustomCardProps> = ({ title, alt ,imageUrl, linkUrl, linkText }) => {
    return (
        <div className={styles.card}>
            <h2 className={styles.title}>{title}</h2>
            <Image
            width={400}
            height={350}
             src={imageUrl} 
             alt={alt} 
             className={styles.image} />
            <footer className={styles.footer}>
                <a href={linkUrl} className={styles.link}>
                    {linkText}
                </a>
            </footer>
        </div>
    );
};

export default CustomCard;