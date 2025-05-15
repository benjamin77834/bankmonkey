import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import GaugeChart from 'react-gauge-chart';
import { useNavigate } from 'react-router-dom';

function Esim() {
    // const navigate = useNavigate();
    // const location = useLocation();  // Obtenemos la ubicación actual
     // Definir el estado para los campos del formulario
     const [formData, setFormData] = useState({
       name: '',
       email: '',
     });
     const navigate = useNavigate();
     const [isLoading, setIsLoading] = useState(false);
     const [apiData, setApiData] = useState(''  );
     //console.log(apiData);
     const [error, setError] = useState(null);
     const [msisdn, setAdditionalData] = useState('');
     const [options, setOptions] = useState([]);
     const [selectedOption, setSelectedOption] = useState('');
     const [mostrarCampo, setMostrarCampo] = useState(false);
    const [comentario, setComentario] = useState('');    
    const [mail, setMail] = useState('');    
    const [msisdnported, setMsisdnported] = useState('');    
    //const [nip, setNip] = useState('');
  //  const [msisdnported, setComentario] = useState('');
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
       console.log(selectedOption);
       console.log(mail);
       if (selectedOption && mail ) {
         // Redirect and pass selectedOption as state
        // navigate('/DestinationPage', { state: { selectedOption,msisdn } });
   
   
         const data = {
           msisdn: msisdn,
           id_oferta: selectedOption,
           movil:msisdnported,
           mail:mail,
           nip:comentario,

           app:"1"
         };
         localStorage.setItem('formData', JSON.stringify(data));
         console.log('Guardado:', JSON.parse(localStorage.getItem('formData'))); 
         console.log(data);
         //console.log(apiUrl);
         //const apiUrl = process.env.REACT_APP_API_URL;
    
         const fetchData = async () => {
           try {
             toast.success('¡Estamos Preparando tu Compra! ');
    
             // Redirigir al otro formulario
             navigate('/Ofertaesim');

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
         const data = {
           device: formData.name,
           app: "1"
   
         };
         toast.success('¡Consulta tu disposito y escogelo ');
   
         // Realizar la solicitud POST
         const response = await axios.post(`${apiUrl}/prod/esimconsulta`, data);
         //console.log(response)
    
   
         setApiData(response.data);
         
   
         const data2 = response.data;
         console.log("hi")
        // console.log(data2)
        // const flattenedOptions = data2.info.flatMap(info => info);
         const flattenedOptions = data2;
         const msisdn=data2.msisdn
         console.log(flattenedOptions);
         console.log(msisdn);
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


   
         <div className="content-container">
         <div className="absolute-container2"> 
       
   
       
         <form onSubmit={handleSubmit} className="styled-select" >
          
          <h33>1. Consulta tu Dispositvo </h33> 
             <input
          className="responsive-input"
               type="text"
               name="name"
               
                placeholder="¿Telefono tienes?"
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
   
               <div align="center">

   
   


   

     
               
               <h33>2. Escoge tu Dispositivo : </h33>
   
               <form onSubmit={handleSubmit3}  >
    
   <select id="options" size="3"  width="90%"
   className="responsive-select"
      value={selectedOption} 
      onChange={handleChange2}>
   
      <option value="">--Escoge dispositivo--</option>
      {options.map((item) => (
        <option key={item.modelo} value={item.modelo}>
          {item.modelo} {item.fabricante} 
        </option>
      ))}
    </select>





           <h33><p>3. Necesitamos tu Correo para enviarte Esim: </p></h33>
             <input
                className="responsive-select"
           type="text"
           placeholder="Ingresa tu mail"
           value={mail}
           onChange={(e) => setMail(e.target.value)}

               /> 



      <label> 
      <h1> ¿Quieres portar tu linea? ,da Clic: </h1>
        <input
         className="responsive-select"
          type="checkbox"
          checked={mostrarCampo}
          onChange={(e) => setMostrarCampo(e.target.checked)}
        />
     
      </label>

      {mostrarCampo && (
        <div style={{ marginTop: '5px' }}>
          <label>
            <h33><p>NIP: </p></h33>
            <input
              type="number"
              className="responsive-select2"
              value={comentario}
               placeholder="Ingresa tu Nip , puedes mandar sms al 051 con la palabra NIP"
              onChange={(e) => setComentario(e.target.value)}
              style={{ marginLeft: '10px' }}
            />
                </label>
  

        <label>
        <h33><p> Numero a Portar: </p></h33>
          
            <input
              type="number"
              className="responsive-select2"
              value={msisdnported}
               placeholder="Numero a Portar:"
              onChange={(e) => setMsisdnported(e.target.value)}
              style={{ marginRight: '10px' }}
            />
          </label>
  
          </div>


     
      )}

<button  disabled={isLoading} align="center" className="responsive-button" >
             {isLoading ? 'Enviando...' : 'Compra'}
           </button>




       </form>
   
   </div>
           )}
         </div>
       {/* ToastContainer para mostrar las alertas */}
       <ToastContainer />
   </div>
   
   
     
   
   

   
   
     );
   }
   
   export default Esim;