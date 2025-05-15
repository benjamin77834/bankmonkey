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
import Esim from './Esim';
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



  const items = [
    {
      label: 'Recarga y Consulta Saldo',
      icon: 'pi pi-home',
     url:'/Consulta'
    },
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
        height="100"
        className="mr-2"
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
        <Route path="/Esim" element={<Esim />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/Mensajeria" element={<Mensajeria />} />
        <Route path="/Cobertura" element={<PageFrame url="https://recargas.monkeyfon.com/chango/cobertura_appx.php" />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />


      </Routes>
    </Router>


    <Footer />
    </div>
  );
}

export default App;
