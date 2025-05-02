import React from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';
import newLogo from './assets/monito.png'; // Cambia la ruta según donde esté tu archivo

//import postData from './postdata';
//Amplify.configure(awsconfig);
import { useNavigate } from 'react-router-dom';

const DestinationPage = () => {
  const location = useLocation();
  const { selectedOption,msisdn } = location.state || {}; // Get selectedOption from state
//console.log(msisdn);

const apiUrl = process.env.REACT_APP_API_URL;
//console.log("urld:",apiUrl)
const data = {
  msisdn: msisdn,
  id_oferta: selectedOption,
  movil:msisdn,
  app:"1"
};
//console.log(data);
//console.log(apiUrl);

const fetchData = async () => {
  try {
const response = await axios.post(`${apiUrl}/prod/genera_pago`, data);
console.log("dess",response);
const api=response.data
console.log(api.payment_request_id);
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

  return (
    <div>
      <h3 >Te vamos enviar a Clip para tu pago</h3>
     
      <p>Has seleccionado: {msisdn}</p>

     </div>




  );
};

export default DestinationPage;
