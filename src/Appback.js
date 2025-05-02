//import { Amplify } from 'aws-amplify';
//import awsconfig from './aws-exports';
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
import Contact from './Contact';
//import Recarga from './Recarga';

import Login from './Login';
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute';

import newLogo from './assets/monito.png'; // Cambia la ruta según donde esté tu archivo
//import postData from './postdata';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
//import DestinationPage from './DestinationPage'; // Página de destino
import { useLocation } from 'react-router-dom';

Amplify.configure(awsconfig);



function App() {
 // const navigate = useNavigate();
 // const location = useLocation();  // Obtenemos la ubicación actual
  // Definir el estado para los campos del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);
  const [msisdn, setAdditionalData] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  // Manejar el cambio en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });



  };



  const handleChange2 = (event) => {
    setSelectedOption(event.target.value);

  };


  const handleSubmit3 = (event) => {
    event.preventDefault();
//    console.log(msisdn);
  //  console.log(selectedOption);
    if (selectedOption && msisdn ) {
      // Redirect and pass selectedOption as state
     // navigate('/DestinationPage', { state: { selectedOption,msisdn } });


      const data = {
        msisdn: msisdn,
        id_oferta: selectedOption,
        movil:msisdn,
        app:"1"
      };
      //console.log(data);
      //console.log(apiUrl);
      const apiUrl = process.env.REACT_APP_API_URL;
 
      const fetchData = async () => {
        try {
          toast.success('¡Estamos Preparando tu Compra! ');

      const response = await axios.post(`${apiUrl}/prod/genera_pago`, data);
      //console.log("dess",response);
      const api=response.data
      //console.log(api.payment_request_id);
      if (api.payment_request_id) {
       window.location.href = 'https://pago.clip.mx/'+api.payment_request_id;
      }
      //const pay2=data2.payment_request_id;
      //console.log(data2);
      
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      
      
      };

      fetchData();

    }
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Obtener la URL del API desde las variables de entorno
      const apiUrl = process.env.REACT_APP_API_URL;
     // console.log("urld:",apiUrl)
     // console.log("select",selectedOption);
      const data = {
        msisdn: formData.name,
        app: "1",
        "serv": "profile"
      };
      toast.success('¡Consulta realizandose !, si has recargado puede tardar unos minutos ');

      // Realizar la solicitud POST
      const response = await axios.post(`${apiUrl}/prod/cambaceo_ofertas`, data);
    //  console.log(response)
 

      setApiData(response.data);
 

//      const data2 = response.data;

    //  console.log(data2);

      const flattenedOptions = data2.info.flatMap(info => info);
      const msisdn=data2.msisdn
      //const datos=data2.datos
      //console.log(flattenedOptions);
      //console.log(datos);
      setAdditionalData(msisdn);      
      setOptions(flattenedOptions);   

    } catch (error) {
      toast.error('Error al enviar el formulario.');
    } finally {
      setIsLoading(false);
    }
  };

 // const location2 = useLocation();  // Obtenemos la ubicación actual

  return (
    <div className="App" align="center">
            
       <header className="App-header">
       <img src={newLogo} alt="Nuevo Logo" className="App_logo" width="100px" align="left" />
       <p>  Consulta Saldo y Compra</p>
       <Router>
      <div>
        <nav>
       
        <ul className="footer-links">
        <p>
        Miembro? <Link to="/login">Inicia sesión</Link>
      </p>
          </ul>
        </nav>

        <Routes>

        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
       
        
        </Routes>
      </div>
    </Router>



      </header>




      <div className="content-container">
      <div className="absolute-container2"> 
    

    
      <form onSubmit={handleSubmit} className="styled-select" >
       
       <h33>1. Consulta tu Saldo y Compra</h33> 
          <input
       className="responsive-input"
            type="number"
            name="name"
            
             placeholder="Tu Numero"
            value={formData.name}
            onChange={handleChange}
          />
        
        <button className="orange-button" disabled={isLoading} align="left" className="responsive-button" >
          {isLoading ? 'Enviando...' : 'Consulta'}
        </button>
      
        </form>
        
      

  


        {isLoading && <p>Cargando datos...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {apiData && (

            <div align="Center">
            <h33>Consulta de Saldo:</h33>



            
          <p>Estatus de Linea: {apiData.estatus}</p>
            <p>Datos: {apiData.datos} GB</p>
            <p>Mins: {apiData.min}</p>
            <p>Sms: {apiData.sms}</p>

            <p>Vencimiento: {apiData.fecha_vencimiento}</p>
     
             <p>----------------------------------------</p> 
            
            <h33>2. Compra tu  oferta :</h33>

            <form onSubmit={handleSubmit3}  >
 
<select id="options" size="10"  
className="responsive-select"
   value={selectedOption} 
   onChange={handleChange2}>

   <option value="">--Escoge Oferta--</option>
   {options.map((item) => (
     <option key={item.idoferta_app} value={item.idoferta_app}   >
       $ {item.precio_minorista} {item.descripcion_oferta_comercial} 
     </option>
   ))}
 </select>
 <button className="orange-button" disabled={isLoading} align="left" className="responsive-button" >
          {isLoading ? 'Enviando...' : 'Compra'}
        </button>
 
    </form>

</div>
        )}
      </div>




        {/* ToastContainer para mostrar las alertas */}
        <ToastContainer />





    </div>

    </div>


  );
}

export default App;