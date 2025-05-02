import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
function Consulta() {
    // const navigate = useNavigate();
    // const location = useLocation();  // Obtenemos la ubicación actual
     // Definir el estado para los campos del formulario
     const [formData, setFormData] = useState({
       name: '',
       email: '',
     });
     const [isLoading, setIsLoading] = useState(false);
     const [apiData, setApiData] = useState(''  );
     //console.log(apiData);
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
         console.log(data);
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
         //console.log("urld:",apiUrl)
         //console.log("select",selectedOption);
         const data = {
           msisdn: formData.name,
           app: "1",
           "serv": "profile"
         };
         toast.success('¡Consulta realizandose !, si has recargado puede tardar unos minutos ');
   
         // Realizar la solicitud POST
         const response = await axios.post(`${apiUrl}/prod/cambaceo_ofertas`, data);
         //console.log(response)
    
   
         setApiData(response.data);
         
   
         const data2 = response.data;
   
         //console.log(data2)
         const flattenedOptions = data2.info.flatMap(info => info);
         const msisdn=data2.msisdn
         console.log(flattenedOptions);
         //console.log(msisdn);
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
          
          <h33>1. Consulta</h33> 
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
   
               <div align="left">

   
   

             <h7><p>Estatus de Linea: {apiData.estatus}</p></h7>
             <h7><p>Datos: {apiData.datos} GB</p></h7>
             <h7> <p>Mins: {apiData.min} Sms: {apiData.sms}</p></h7>
   
             <h7> <p>Vencimiento: {apiData.fecha_vencimiento}</p></h7> 
     
               
               <h33>2. Compra oferta :</h33>
   
               <form onSubmit={handleSubmit3}  >
    
   <select id="options" size="10"  width="100%"
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
   
   
     
   
   

   
   
     );
   }
   
   export default Consulta;