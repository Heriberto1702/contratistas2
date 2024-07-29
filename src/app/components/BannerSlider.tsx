"use client"
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './BannerSlider.css';
import CustomImage from './CustomImage';



const BannerSlider: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="banner-slider"> {/* Aplica la clase CSS al contenedor */}
      <Slider {...settings}>
        <div>
          <CustomImage
            src="/banner.png"
            alt="Description of the image"
            width={800}
            height={400}
            className="my-custom-image image-desktop"
            link="/beneficios"
          />
          <CustomImage
            src="/ofertas-palco-phone.png"
            alt="Description of the image"
            width={800}
            height={400}
            className="my-custom-image image-tablet"
            link="https://www.sinsa.com.ni/"
          />
          <CustomImage
            src="/ofertas-palco-phone.png"
            alt="Description of the image"
            width={800}
            height={400}
            className="my-custom-image image-mobile"
            link="https://www.sinsa.com.ni/"
          />
        </div>
        <div>
          <CustomImage
            src="/banner.png"
            alt="Description of the image"
            width={800}
            height={400}
            className="my-custom-image image-desktop"
            link="https://www.sinsa.com.ni/"
          />
          <CustomImage
            src="/ofertas-julio-phone-2024.png"
            alt="Description of the image"
            width={800}
            height={400}
            className="my-custom-image image-tablet"
            link="https://www.sinsa.com.ni/"
          />
          <CustomImage
            src="/ofertas-julio-phone-2024.png"
            alt="Description of the image"
            width={800}
            height={400}
            className="my-custom-image image-mobile"
            link="https://www.sinsa.com.ni/"
          />
        </div>
      </Slider>
    </div>
  );
};

export default BannerSlider;