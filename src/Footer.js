import React from 'react';
import './Footer.css'; // Para estilos, si es necesario

const Footer = () => {
  return (
    <footer className="footer">
    <div className="footer-content">
      <p>&copy; {new Date().getFullYear()} Monkey Phone</p>
    
    </div>
  </footer>

  );
};

export default Footer;
