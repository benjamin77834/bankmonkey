// App.js
import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import logo from './assets/monkey512x512.png';
import { Menubar } from 'primereact/menubar';

// ==================== PWA Component Android ====================
function InstallPWAButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBtn(true);
    });
  }, []);

  const handleInstall = () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => setShowBtn(false));
  };

  if (!showBtn) return null;

  return (
    <button
      onClick={handleInstall}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '10px 20px',
        background: '#2f0f13',
        color: '#fff',
        borderRadius: '8px',
        zIndex: 1000
      }}
    >
      Instalar App
    </button>
  );
}

// ==================== PWA Component iOS ====================
function IOSInstallHint() {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const ua = window.navigator.userAgent;
    if (/iPhone|iPad|iPod/.test(ua) && !window.MSStream) {
      setIsIOS(true);
    }
  }, []);

  if (!isIOS) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      right: '20px',
      padding: '15px',
      background: '#fff3cd',
      border: '1px solid #ffeeba',
      borderRadius: '8px',
      zIndex: 1000
    }}>
      <p>Para instalar la app en tu iPhone:</p>
      <ol>
        <li>Toca el botón <strong>Compartir</strong> en Safari</li>
        <li>Selecciona <strong>Agregar a pantalla de inicio</strong></li>
      </ol>
    </div>
  );
}

// ==================== Main App ====================
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
        height="1200px"
        style={{ border: 'none' }}
      />
    </div>
  );

  // Hook de navegación de React Router
  const NavigationWrapper = () => {
    const navigate = useNavigate();

    const items = [
      { label: 'Recarga y Consulta Saldo', icon: 'pi pi-home', command: () => navigate('/Consulta') },
      { label: 'Ofertas', icon: 'pi pi-tags', command: () => navigate('/Ofertas') },
      { label: 'Servicios', icon: 'pi pi-briefcase', items: [
          { label: 'Inicio de Sesión', icon: 'pi pi-fw pi-cog', command: () => navigate('/Login') }
        ]
      },
      { label: 'Compra de Esim Monkey', icon: 'pi pi-calculator', command: () => navigate('/Esim') },
      { label: 'Cobertura', icon: 'pi pi-map-marker', command: () => navigate('/Cobertura') },
      { label: 'Contacto', icon: 'pi pi-telegram', command: () => navigate('/Mensajeria') }
    ];

    const start = <img alt="Logo" src={logo} className="logo-responsive mr-2" />;

    return <Menubar model={items} start={start} style={{ backgroundColor: '#f5f5f5', borderBottom: '10px solid #2f0f13', marginBottom: '20px' }} />;
  };

  // ==================== Service Worker Registration ====================
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then(reg => console.log('ServiceWorker registrado', reg))
          .catch(err => console.log('Error ServiceWorker', err));
      });
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <NavigationWrapper />
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

        {/* PWA Components */}
        <InstallPWAButton />
        <IOSInstallHint />

      </Router>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
