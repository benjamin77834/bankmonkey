import React from 'react';


const Mensajeria = () => {
  const phoneNumber = "525635013278"; // Número en formato internacional sin "+"
  const message = "Hola requiero ayuda!";

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (

<div className="content-container">
<div className="absolute-container"> 
<p>Presiona el Boton para enviarnos un menjase para poder ayudarte!</p>
    <button onClick={handleClick} className="responsive-select">
      <h3>Enviar WhatsApp</h3>
    </button>




    </div>
    </div>
  );
};

export default Mensajeria;
