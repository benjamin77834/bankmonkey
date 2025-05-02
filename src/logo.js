import React from 'react';
import './logo.css';  // Importamos el archivo de estilos CSS
import newLogo from './assets/monito.png'; // Cambia la ruta según donde esté tu archivo
const AppLogo = () => {
  return (
    <div className="logo-container">
      <img src={newLogo} alt="" className="app-logo" />
    </div>
  );
};

export default AppLogo;
