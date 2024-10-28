import { useState } from 'react';
import Image from 'next/image';
import styles from './ZoomModal.module.css';

type ZoomModalProps = {
  images: string[];
  selectedImage: string;
  onClose: () => void;
};

const ZoomModal: React.FC<ZoomModalProps> = ({ images, selectedImage, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(images.indexOf(selectedImage));

  const handleNext = () => setCurrentIndex((currentIndex + 1) % images.length);
  const handlePrevious = () => setCurrentIndex((currentIndex - 1 + images.length) % images.length);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        <button className={styles.prevButton} onClick={handlePrevious}>◀</button>
        <Image src={images[currentIndex]} alt="Imagen ampliada" width={600} height={600} />
        <button className={styles.nextButton} onClick={handleNext}>▶</button>
      </div>
    </div>
  );
};

export default ZoomModal;
