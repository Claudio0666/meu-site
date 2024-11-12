// src/ImageCarousel.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './css/carrossel.css';

const ImageCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        <div>
          <img src="\src\imagem\Entenda_Autismo.webp" alt="Imagem 1" className="carousel-image" />
          <div className="carousel-content">
            <h2></h2>
            <p> </p>
            <a href="#!" className="carousel-button">Saiba Mais</a>
          </div>
        </div>
        <div>
          <img src="\src\imagem\Instituicoes_Otimizado.webp" alt="Imagem 2" className="carousel-image" />
          <div className="carousel-content">
            <h2></h2>
            <p></p>
            <a href="#!" className="carousel-button">Saiba Mais</a>
          </div>
        </div>
        <div>
          <img src="\src\imagem\34.webp" alt="Imagem 3" className="carousel-image" />
          <div className="carousel-content">
            <h2></h2>
            <p></p>
            <a href="#!" className="carousel-button">Saiba Mais</a>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default ImageCarousel;
