import Image from 'next/image';
import { useState } from 'react';
import ZoomModal from './ZoomModal';
import styles from './ImageGallery.module.css';

type ImageGalleryProps = {
  images: string[];
};

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className={styles.grid}>
      {images.map((img, index) => (
        <div key={index} className={styles.imageItem} onClick={() => setSelectedImage(img)}>
          <Image src={img} alt={`Imagen ${index + 1}`} width={150} height={150} />
        </div>
      ))}

      {selectedImage && (
        <ZoomModal images={images} selectedImage={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </div>
  );
};

export default ImageGallery;
