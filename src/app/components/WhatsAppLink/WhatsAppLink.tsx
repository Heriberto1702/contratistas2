"use client";

import React from 'react';
import styles from './WhatsAppLink.module.css';
import Image
 from 'next/image';
const WhatsAppLink: React.FC = () => {
  const phoneNumber = "YOUR_PHONE_NUMBER"; // Reemplaza con tu número de teléfono, formato: '5491234567890'
  const message = "¡Hola! Me gustaría cotizar con ustedes."; // Mensaje predeterminado
  const whatsappURL = `https://wa.me/${85901154}?text=${encodeURIComponent(message)}`;

  return (
    <div className={styles.whatsappLinkContainer}>
      <a 
      href={whatsappURL} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={styles.whatsappLink}>
          <Image 
          src="/whatsapp-icon.png" 
          alt="WhatsApp" 
          width={20} 
          height={20} 
          className={styles.whatsappIcon}
        />
        Cotizá con nosotros.<span><strong>&nbsp;Haz click aquí!</strong></span>
      </a>
    </div>
  );
};

export default WhatsAppLink;