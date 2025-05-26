// src/CarruselOfertas.jsx
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




const CarruselOfertas = () => {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      showIndicators={true}
      interval={1100}
      transitionTime={150}  
      swipeable
      emulateTouch
      style={{ border: 'none' }}
    >
        
      <div>
        <img src={oferta1} alt="Oferta 1" />
        <p className="legend"></p>
      </div>
      <div>
        <img src={oferta2} alt="Oferta 2" />
        <p className="legend"></p>
      </div>
      <div>
        <img src={oferta3} alt="Oferta 3" />
        <p className="legend"></p>
      </div>

      <div>
        <img src={oferta4} alt="Oferta 4" />
        <p className="legend"></p>
      </div>
      <div>
        <img src={oferta4} alt="Oferta 4" />
        <p className="legend"></p>
      </div>
      <div>
        <img src={oferta5} alt="Oferta 5" />
        <p className="legend"></p>
      </div>
      <div>
        <img src={oferta6} alt="Oferta 6" />
        <p className="legend"></p>
      </div>

      <div>
        <img src={oferta7} alt="Oferta 7" />
        <p className="legend"></p>
      </div>

      <div>
        <img src={oferta8} alt="Oferta 8" />
        <p className="legend"></p>
      </div>

      <div>
        <img src={oferta9} alt="Oferta 9" />
        <p className="legend"></p>
      </div>
    </Carousel>
  );
};

export default CarruselOfertas;
////Users/benjamingarcia/sam/monk/reac/monkeyapp/assets/Imagen9.png