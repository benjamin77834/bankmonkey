//import { Amplify } from 'aws-amplify';
//import awsconfig from './aws-exports';
//import { withAuthenticator } from '@aws-amplify/ui-react';
//import './App.css';
import Footer from './Footer';
import './Recarga.css';
import './DestinationPage';
//import React, { useEffect } from 'react';  // Asegúrate de incluir useEffect
//mport { get, post } from '@aws-amplify/api-rest';  // Importar los métodos que usas

import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import HomeIcon from './assets/monito.png'; // Asegúrate de la ruta correcta
import newLogo from './assets/monito.png'; // Cambia la ruta según donde esté tu archivo

//import postData from './postdata';
//Amplify.configure(awsconfig);
import { useNavigate } from 'react-router-dom';




function Recarga() {

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





const [options, setOptions] = useState([]);
const [selectedOption, setSelectedOption] = useState('');
const [msisdn, setAdditionalData] = useState('');
console.log(msisdn);
console.log(selectedOption);
const navigate = useNavigate();



const handleSubmit3 = (event) => {
    event.preventDefault();
    if (selectedOption && msisdn ) {
      // Redirect and pass selectedOption as state
      navigate('/DestinationPage', { state: { selectedOption,msisdn } });
    }
  };

const handleChange2 = (event) => {
    setSelectedOption(event.target.value);
  };

const handleAdditionalDataChange = (event) => {
    setAdditionalData(event.target.value);
  };

  const handleSubmit2 = async (event) => {
    event.preventDefault();
   // console.log('Selected option:', selectedOption);
    // Aquí puedes enviar los datos del formulario a tu backend usando axios.post
  };


  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Selected option:', selectedOption);
    try {
      // Obtener la URL del API desde las variables de entorno
      const apiUrl = process.env.REACT_APP_API_URL;
     // console.log("urld:",apiUrl)
      const data = {
        msisdn: formData.name,
        app: "1",
        "serv": "profile"
      };

      // Realizar la solicitud POST
      toast.success('¡Consultando tus ofertas!');

      const response = await axios.post(`${apiUrl}/prod/cambaceo_ofertas`, data);

      const data2 = response.data;

      //console.log(data2)
      const flattenedOptions = data2.info.flatMap(info => info);
      const msisdn=data2.msisdn
      //console.log(flattenedOptions);
      //console.log(msisdn);
      setAdditionalData(msisdn);
      toast.success('¡ya puedes escoger tus ofertas!');

      //data = await response.json();
      //console.log(data)
   
      // Extraer y aplanar los items
     // const flattenedOptions = data.body.flatMap(info => info.idoferta_app);
     // console.log(flattenedOptions);
      //setOptions(flattenedOptions);


    //  setApiData(response.data);
    setOptions(flattenedOptions);   

   // console.log(flattenedOptions);
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


       <ul className="footer-links">
      
       <li><a href="/">Consulta de Saldo</a></li>
       </ul>
      </header>

      <div className="content-container">
      <div className="absolute-container2"> 
      
      <form onSubmit={handleSubmit} className="form" align="left">
   
          <input
            type="text"
            name="name"
            size="20"
            placeholder="Tu Numero"
            value={formData.name}
            onChange={handleChange}
          />
        
        <button className="orange-button" disabled={isLoading} align="center">
          {isLoading ? 'Enviando...' : 'Enter'}
        </button>
      
        </form>
        
       
        <form onSubmit={handleSubmit3} className="form" align="left">

            
      <label htmlFor="options">Selección Oferta:</label>

      <input
            id="msisdn"
            type="hidden"
            value={formData.name}
            onChange={handleAdditionalDataChange}
          /> 

      <select id="options"  
      className="custom-select"
        value={selectedOption} 
        onChange={handleChange2}>

        <option value="">--Escoge Oferta--</option>
        {options.map((item) => (
          <option key={item.idoferta_app} value={item.idoferta_app}   >
            $ {item.precio_minorista} {item.nombre_comercial} {item.descripcion_oferta_comercial} 
          </option>
        ))}
      </select>
      <button className="orange-button" type="submit">Compra Oferta</button>
    </form>
    </div>
    </div>

        

    
    


        {/* ToastContainer para mostrar las alertas */}
       



<Footer />

    </div>




  );
}

export default Recarga;