import React, { useEffect, useState } from 'react';
//import './Planes.css'; // Aquí deberías mover los estilos CSS

const dummyData = {
  info: [
    {
      nombre_comercial: "Jungle Boost Lite",
      descripcion_oferta_comercial: "15GB min ilimitado y 1500 sms 30 Dias Redes Soc. Hot Spot",
      precio_minorista: "255",
      comprable: "1",
      descripcion_oferta: "15 GB · 30 días",
      offering: "ByPlus 15 Ilimitado",
      idoferta_app: 88
    },
    {
      nombre_comercial: "Tree Top",
      descripcion_oferta_comercial: "20 GB + 20GB  ilim min y 1500 sms 30 días",
      precio_minorista: "289",
      comprable: "1",
      descripcion_oferta: "40 GB · 30 días",
      offering: "ByPlus 40 Ilimitado",
      idoferta_app: 56
    }
  ]
};

export default function Planes() {
  const [ofertas, setOfertas] = useState([]);

  useEffect(() => {
    // Simulación de API: puedes cambiar por fetch(URL)
    setOfertas(dummyData.info);
  }, []);

  const contratar = (idOferta) => {
    alert(`Contratando oferta con ID: ${idOferta}`);
    // Aquí puedes hacer algo como window.location.href o una llamada a backend
  };

  return (
    <div className="planes-container">
      {/* Carrusel */}
      <div className="carousel">
        <button id="prev" className="nav" onClick={() => scrollCarousel(-1)}>&#10094;</button>
        <div id="track" className="track">
          {ofertas.map(oferta => (
            <div className="card" key={oferta.idoferta_app}>
              <img src="img/plan1.png" alt={oferta.nombre_comercial} />
              <h3>{oferta.nombre_comercial}</h3>
              <ul>
                <li>{oferta.descripcion_oferta}</li>
                <li>{oferta.descripcion_oferta_comercial}</li>
                <li>${oferta.precio_minorista} MXN</li>
              </ul>
              <button className="btn" onClick={() => contratar(oferta.idoferta_app)}>Contratar</button>
            </div>
          ))}
        </div>
        <button id="next" className="nav" onClick={() => scrollCarousel(1)}>&#10095;</button>
      </div>

      {/* Tabla comparativa */}
      <table>
        <thead>
          <tr>
            <th>Plan</th>
            <th>Datos</th>
            <th>Vigencia</th>
            <th>Hotspot</th>
            <th>Precio</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {ofertas.map(oferta => {
            const [datos, vigencia] = oferta.descripcion_oferta.split("·").map(s => s.trim());
            const hotspot = oferta.descripcion_oferta_comercial.toLowerCase().includes("hot spot") ? "Sí" : "No";
            return (
              <tr key={oferta.idoferta_app}>
                <td>{oferta.nombre_comercial}</td>
                <td>{datos}</td>
                <td>{vigencia}</td>
                <td>{hotspot}</td>
                <td>${oferta.precio_minorista}</td>
                <td><button className="cta-mini" onClick={() => contratar(oferta.idoferta_app)}>Contratar</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// Función para scroll horizontal del carrusel
function scrollCarousel(direction) {
  const track = document.getElementById('track');
  if (track) {
    track.scrollBy({ left: direction * 350, behavior: 'smooth' });
  }
}
