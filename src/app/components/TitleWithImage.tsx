import React from 'react';
import CustomImage from './CustomImage';

interface TitleWithImageProps {

  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  imageLink?: string;
  className?: string;
  imageClassName?: string;
  autoplay?: boolean;
}

const TitleWithImage: React.FC<TitleWithImageProps> = ({

  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
  imageLink,
  className,
  imageClassName,
  
}) => {
  return (
    <div className={className}>
      <CustomImage
        src={imageSrc}
        alt={imageAlt}
        width={imageWidth}
        height={imageHeight}
        className={imageClassName}
        link={imageLink}
        
      />
    </div>
  );
};

export default TitleWithImage;