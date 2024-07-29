import Image from 'next/image';
import React from 'react';

interface CustomImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  link?: string;
  autoplay?: boolean;
}

const CustomImage: React.FC<CustomImageProps> = ({ 
  src, 
  alt, 
  width, 
  height, 
  className, 
  objectFit = 'cover', 
  link,
  
}) => {
  const imageElement = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={{ objectFit }}
      className={className}
    />
  );

  return (
    <div className={className}>
      {link ? <a href={link}>{imageElement}</a> : imageElement}
    </div>
  );
};

export default CustomImage;