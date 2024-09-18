import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
//import { withAuthenticator } from '@aws-amplify/ui-react';
import './App.css';
import Footer from './Footer';

//import React, { useEffect } from 'react';  // Asegúrate de incluir useEffect
import { get, post } from '@aws-amplify/api-rest';  // Importar los métodos que usas

import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import HomeIcon from './assets/monito.png'; // Asegúrate de la ruta correcta
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Contact from './Contact';
import Recarga from './Recarga';
import DestinationPage from './DestinationPage'; // Página de destino
import newLogo from './assets/monito.png'; // Cambia la ruta según donde esté tu archivo

//import postData from './postdata';
Amplify.configure(awsconfig);





function App() {

  // Definir el estado para los campos del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);
  // Manejar el cambio en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });



  };



  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Obtener la URL del API desde las variables de entorno
      const apiUrl = process.env.REACT_APP_API_URL;
      console.log("urld:",apiUrl)
      const data = {
        msisdn: formData.name,
        app: "1",
        "serv": "profile"
      };

      // Realizar la solicitud POST
      const response = await axios.post(`${apiUrl}/prod/profile2`, data);
      console.log(response)
 
      toast.success('¡Consulta lista!, si has recargado puede tardar unos minutos ');

      setApiData(response.data);
       
    } catch (error) {
      toast.error('Error al enviar el formulario.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App" align="center">
            
       <header className="App-header">
       <img src={newLogo} alt="Nuevo Logo" className="App_logo" width="100px" align="left" />

       <Router>
      <div>
        <nav>

        <ul className="footer-links">
           
            <li>
              <Link to="/recarga"
              
    
              >Aqui Recargas!</Link>
            </li>
          </ul>
        </nav>

        <Routes>

    
          <Route path="/recarga" element={<Recarga />} />
          <Route path="/DestinationPage" element={<DestinationPage />} />

        
        </Routes>
      </div>
    </Router>



      </header>

      <div className="content-container">
      <div className="content"> 
      
      <form onSubmit={handleSubmit}>
       
        
          <input
            type="text"
            name="name"
            size="12"
             placeholder="Tu Numero"
            value={formData.name}
            onChange={handleChange}
          />
        
        <button className="orange-button" disabled={isLoading} align="left">
          {isLoading ? 'Enviando...' : 'Enter'}
        </button>
      
        </form>
        </div>
        </div>

  

      <div className="absolute-container" align="left">
        {isLoading && <p>Cargando datos...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {apiData && (
          <div align="left">
            <h1>Consulta de Saldo:</h1>

            <p><strong>Estatus de Linea:</strong> {apiData.estatus}</p>
            <p><strong>Datos:</strong> {apiData.datos} GB</p>
            <p><strong>Mins:</strong> {apiData.llamadas}</p>
            <p><strong>Sms:</strong> {apiData.sms}</p>

            <p><strong>Vencimiento:</strong> {apiData.fecha_vencimiento}</p>
      
          </div>
        )}
      </div>


        {/* ToastContainer para mostrar las alertas */}
        <ToastContainer />




<Footer />

    </div>




  );
}

export default App;
