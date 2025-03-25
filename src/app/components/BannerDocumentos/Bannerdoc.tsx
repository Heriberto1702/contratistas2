import Link from 'next/link';
import Image from 'next/image';
import style from './Bannerdocs.module.css'
interface BannerProps {
  imageUrl: string;
  linkUrl: string;
  altText: string;
  width?: number;
  height?: number;
}

const BannerDocumentos: React.FC<BannerProps> = ({ imageUrl, linkUrl, altText, width = 300, height = 200 }) => {
  return (
    <div className={style.containerBanner}>
      <Link href={linkUrl}>
          <Image className={style.Imagen} src={imageUrl} alt={altText} width={width} height={height} />
      </Link>
    </div>
  );
};

export default BannerDocumentos;