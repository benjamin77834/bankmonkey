
//import { Amplify } from 'aws-amplify';
//import awsconfig from './aws-exports';

//import { Amplify } from 'aws-amplify';
//import awsconfig from './aws-exports';
//import { withAuthenticator } from '@aws-amplify/ui-react';
import './App.css';
import Footer from './Footer';

//import React, { useEffect } from 'react';  // Asegúrate de incluir useEffect
//<<<<<<< HEAD
//import { get, post } from '@aws-amplify/api-rest';  // Importar los métodos que usas
//=======
import { get, post } from '@aws-amplify/api-rest';  // Importar los métodos que usas
//>>>>>>> 408a3686154c69d4c38a1aae5d77b43f210d1327

import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import HomeIcon from './assets/monito.png'; // Asegúrate de la ruta correcta
import Contact from './Contact';
//import Recarga from './Recarga';
import Login from './Login';

import ProtectedRoute from './ProtectedRoute';

//import newLogo from './assets/monito.png'; // Cambia la ruta según donde esté tu archivo
//import postData from './postdata';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
//import DestinationPage from './DestinationPage'; // Página de destino
//import { useLocation } from 'react-router-dom';
//Amplify.configure(awsconfig);

import Consulta from './Consulta';
import AppLogo from './logo';
import Dashboard from './Dashboard';

function App() {
 // const navigate = useNavigate();
 // const location = useLocation();  // Obtenemos la ubicación actual
  // Definir el estado para los campos del formulario
  const [username, setUsername] = useState('null');
  const [iframeUrl, setIframeUrl] = useState('');


const PageFrame = ({ url }) => {
    return (
      <div>
        <iframe 
          src={url} 
          title="Contenido Externo" 
          width="500px" 
          height="400px"
          style={{ border: 'none' }} 
        />
      </div>
    );
  };
  

 // const location2 = useLocation();  // Obtenemos la ubicación actual
// <img src={newLogo} alt="Nuevo Logo" className="App_logo" width="100px" align="left" />
      
  return (
    <div className="App" align="center">
            
       <header className="App-header">
       <AppLogo />  {/* Incluimos el logo en el header */}
       <Router>
      <div>
        <nav>
       
        <ul className="footer-links">
      <p>
        <Link to="/login" style={{ marginLeft: '2px', color: 'white' }}>Inicia sesión</Link> | 
                                                                                                                                                         
        <Link to="/Consulta" style={{ marginLeft: '2px', color: 'white' }} >Consulta de Saldo</Link>|
      
          
          <Link to="/Cobertura"  style={{ marginLeft: '2px', color: 'white' }} onClick={() => setIframeUrl('https://recargas.monkeyfon.com/chango/cobertura_appx.php')}>Cobertura</Link>
        </p>
       </ul>
        </nav>

        <Routes>
   
        <Route path="/" element={<Consulta />} /> {/* <- Esto es lo nuevo */}
        <Route
          path="/Consulta"
          element={
            <ProtectedRoute>
              <Consulta />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      <Route path="/Cobertura" element={<PageFrame url={iframeUrl} />} />


        </Routes>
      </div>
    </Router>



      </header>



</div>








  );


}

export default App;