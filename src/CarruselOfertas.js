// src/CarruselOfertas.jsx
import './CarruselOfertas.css';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import oferta1 from './assets/Imagen.png';
import oferta2 from './assets/Imagen2.png';
import oferta3 from './assets/Imagen3.png';
import oferta4 from './assets/Imagen4.png';
import oferta5 from './assets/Imagen5.png';
import oferta6 from './assets/Imagen6.png';
import oferta7 from './assets/Imagen7.png';
import oferta8 from './assets/Imagen8.png';
import oferta9 from './assets/Imagen9.png';

const ofertas = [
  { img: oferta1, title: 'Oferta 1' },
  { img: oferta2, title: 'Oferta 2' },
  { img: oferta3, title: 'Oferta 3' },
  { img: oferta4, title: 'Oferta 4' },
  { img: oferta5, title: 'Oferta 5' },
  { img: oferta6, title: 'Oferta 6' },
  { img: oferta7, title: 'Oferta 7' },
  { img: oferta8, title: 'Oferta 8' },
  { img: oferta9, title: 'Oferta 9' },
];

const CarruselOfertas = () => {
  return (
    <div style={{ maxWidth: '100%', margin: '0 auto', textAlign: 'center' }}>
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        interval={4000}
        transitionTime={3000}
        swipeable
        emulateTouch
      >
        {ofertas.map((oferta, index) => (
          <div className="zoom-container" key={index}>
            <img src={oferta.img} alt={oferta.title} className="zoom-image" />
            <p className="legend">{oferta.title}</p>
          </div>
        ))}
      </Carousel>

      <div style={{ marginTop: '20px' }}>
        <a
          href="/Consulta"
          className="boton-comprar"
        >
          Comprar ahora
        </a>
      </div>
    </div>
  );
};

export default CarruselOfertas;
