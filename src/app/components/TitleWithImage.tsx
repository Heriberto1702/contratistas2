import React from 'react';
import CustomImage from './CustomImage';

interface TitleWithImageProps {
  mainTitle?: string;
  subTitle?: string;
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
  mainTitle,
  subTitle,
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
      <h1>{mainTitle}</h1>
      <h2>{subTitle}</h2>
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