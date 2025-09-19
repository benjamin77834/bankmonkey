import './App.css';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React, { Component } from 'react';
 
        
//import AppLogo from './logo';
import Login from './Login';
import Consulta from './Consulta';
import Dashboard from './Dashboard';
import Ofertaesim from './Ofertaesim';
import CarruselOfertas from './CarruselOfertas';
import AiraloOffers from './AiraloOffers';
import NotificacionCorreo from  './NotificacionCorreo';

import Esim from './Esim';
import Planes from './Planes';
import Footer from './Footer';
import Mensajeria from './Mensajeria';
import ProtectedRoute from './ProtectedRoute';
import 'primereact/resources/themes/lara-light-indigo/theme.css';  // Tema de PrimeReact
import 'primereact/resources/primereact.min.css';                  // Estilos principales
import 'primeicons/primeicons.css';                                // Iconos
import 'primeflex/primeflex.css';                                  // Utilidades de diseño


import logo from './assets/monkey512x512.png'; // Asegúrate de que la ruta sea correcta



import { Menubar } from 'primereact/menubar';




function App() {
    const PageFrame = ({ url }) => (
        <div style={{ margin: '20px auto', maxWidth: '90%' }}>
          <iframe
            src={url}
            title="Cobertura"
            width="100%"
            height="500px"
            style={{ border: 'none' }}
          />
        </div>
      );

      const Ofertas = () => (
        <div style={{ margin: '20px auto', maxWidth: '90%' }}>
          <iframe
            src="https://www.monkeyphone.net"
            title="Ofertas MonkeyPhone"
            width="100%"
            height="1200px"  // Aumenta según lo que necesites
            style={{ border: 'none' }}
          />
        </div>
      );
      
      



  const items = [
    {
      label: 'Recarga y Consulta Saldo',
      icon: 'pi pi-home',
     url:'/Consulta'
    },

    {
      label: 'Ofertas',
      icon: 'pi pi-tags',
      url: '/Ofertas'
    }

,




    {
      label: 'Servicios',
      icon: 'pi pi-briefcase',
      items: [
        {
          label: 'Inicio de Session',
          icon: 'pi pi-fw pi-cog',
          url:'/Login'
        }
       
      ]
    },
    
    {
      label: 'Compra de Esim',
      icon: 'pi pi-calculator',
      command: () => { window.location.href = '/Esim'; }
    }
    ,
    {
      label: 'Compra de Esim Internacional',
      icon: 'pi pi-calculator',
      command: () => { window.location.href = '/Ofertasinternacional'; }
    }
    ,  
   
    {
        label: 'Cobertura',
        icon: 'pi pi-map-marker',
        command: () => { window.location.href = '/Cobertura'; }
      }
      , 

    {
      label: 'Contacto',
      icon: 'pi pi-telegram',
      command: () => { window.location.href = '/Mensajeria'; }
    }
  ];

  const start = (


    <img
  alt="Logo"
  src={logo}
  className="logo-responsive mr-2"
/>

);

  return (
    <div className="App">
 

      <Router>
      <Menubar model={items} start={start}  style={{ backgroundColor: '#f5f5f5',  borderBottom: '10px solid #2f0f13',   marginBottom: '20px'  }} />
      <Routes>
        <Route path="/" element={<Consulta />} />
        <Route path="/Consulta" element={<Consulta />} />
        <Route path="/Ofertaesim" element={<Ofertaesim />} />
        <Route path="/Ofertasinternacional" element={<AiraloOffers />} />
        <Route path="/Esim" element={<Esim />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/Mensajeria" element={<Mensajeria />} />
        <Route path="/Cobertura" element={<PageFrame url="https://recargas.monkeyfon.com/chango/cobertura_appx.php" />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/NotificacionCorreo" element={<NotificacionCorreo />} />
 
        <Route path="/Ofertas" element={<CarruselOfertas />} />

      </Routes>
    </Router>


    <Footer />
    </div>
  );
}

export default App;
