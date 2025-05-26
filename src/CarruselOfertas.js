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




const CarruselOfertas = () => {
  return (

    <div style={{ maxWidth: '100%', margin: '0 auto', border: 'none', textAlign: 'center'  }}>
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      showIndicators={true}
      interval={3000}
      transitionTime={900}  
      swipeable
      emulateTouch
      style={{ border: 'none' }}
    >
        
      <div>
        <img src={oferta1} alt="Oferta 1" style={{ border: 'none', height: '100%', objectFit: 'cover'}}/>
        <p className="legend">Oferta 1</p>
      </div>
      <div>
        <img src={oferta2} alt="Oferta 2" style={{ border: 'none',height: '100%', objectFit: 'cover' }}/>
        <p className="legend">Oferta 2</p>
      </div>
      <div>
        <img src={oferta3} alt="Oferta 3" style={{ border: 'none',height: '100%', objectFit: 'cover' }} />
        <p className="legend">Oferta 3</p>
      </div>

      <div>
        <img src={oferta4} alt="Oferta 4" style={{ border: 'none',height: '100%', objectFit: 'cover' }}/>
        <p className="legend">Oferta 4</p>
      </div>
      <div>
        <img src={oferta4} alt="Oferta 4" style={{ border: 'none',height: '100%', objectFit: 'cover' }} />
        <p className="legend">Oferta 5</p>
      </div>
      <div>
        <img src={oferta5} alt="Oferta 5" style={{ border: 'none' ,height: '100%', objectFit: 'cover'}}/>
        <p className="legend">Oferta 6</p>
      </div>
      <div>
        <img src={oferta6} alt="Oferta 6" style={{ border: 'none' ,height: '100%', objectFit: 'cover'}}/>
        <p className="legend">Oferta 7</p>
      </div>

      <div>
        <img src={oferta7} alt="Oferta 7" style={{ border: 'none' ,height: '100%', objectFit: 'cover'}}/>
        <p className="legend">Oferta 8</p>
      </div>

      <div>
        <img src={oferta8} alt="Oferta 9" style={{ border: 'none' ,height: '100%', objectFit: 'cover'}}/>
        <p className="legend">Oferta 9</p>
      </div>

      <div>
        <img src={oferta9} alt="Oferta 9" style={{ border: 'none' ,height: '100%', objectFit: 'cover'}}/>
        <p className="legend">Oferta 10</p>
      </div>
    </Carousel>

    <div style={{ marginTop: '20px' }}>
    <a
        href="/Consulta"
        style={{
          display: 'inline-block',
          marginTop: '20px',
          padding: '12px 30px',
          backgroundColor: '#ff6600',
          color: 'white',
          fontSize: '18px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 'bold',
          boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
          transition: 'background-color 0.3s ease'
        }}
        onMouseOver={e => e.target.style.backgroundColor = '#e65c00'}
        onMouseOut={e => e.target.style.backgroundColor = '#ff6600'}
      >
        Comprar ahora
      </a>
      </div>
    </div>
  );
};

export default CarruselOfertas;
////Users/benjamingarcia/sam/monk/reac/monkeyapp/assets/Imagen9.png