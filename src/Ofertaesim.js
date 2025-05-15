import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';





function Ofertaesim() {
  const [data, setData] = useState(null);
  const [ofertas, setOfertas] = useState([]);
  const [seleccionado, setSeleccionado] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("formData");
    if (saved) {
      try {
        setData(JSON.parse(saved));




      } catch (e) {
        console.error("Error parsing formData:", e);
      }

      const handleChange = (e) => {
        setSeleccionado(e.target.value);
      };
      const fetchOfertas = async () => {
        try {
          const datao = {
            "be_id": "",
            app: "1",
            esim: "1",
            "be_id2": "140",
          };
          const apiUrl = process.env.REACT_APP_API_URL;
  
          const response = await axios.post(`${apiUrl}/prod/select`, datao);
          console.log(response);
         // setOfertas(response.data.oferta); // ajusta esta línea según tu estructura
         const data2 = response.data;
         const flattenedOptions = data2;
         console.log("hi")
       //  console.log(data2)          
         setOptions(flattenedOptions);   
 

       //  setApiData(response.data);
        } catch (error) {
          console.error("Error al obtener ofertas:", error);
        }
      };
  
      fetchOfertas();
    //}, [apiUrl]); // se ejecuta una vez al montar el componente
  
      
     // setApiData(response.data);
      

     // const data2 = response.data;


    }
  }, []);

////////////////
const handleChange2 = (event) => {
  setSelectedOption(event.target.value);

};
const handleSubmit = (event) => {
  event.preventDefault();
//    console.log(msisdn);
//  console.log(selectedOption);


//<p>numero a portar: {data.movil}</p>
 // <p>Email: {data.mail}</p>
  //<p>Comentario: {data.comentario}</p>
  //<p>Comentario: {data.id_oferta}</p>
  //<p>nip: {data.nip}</p>
  if (selectedOption && data.mail  ) {
    // Redirect and pass selectedOption as state
   // navigate('/DestinationPage', { state: { selectedOption,msisdn } });



  const datax = {
    be_id: "",
    data: {
      id_vendedor: "",
      phone:data.id_oferta,
      mail: data.mail,
      idoferta_app:selectedOption,
      portIn: {
        nip: data.nip,
        msisdnPorted: data.movil,
        nombreOperadoraOrigen: "",
        fecha_portacion: ""
      }
    }
  };



  console.log(datax);
  //console.log(apiUrl);
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchData = async () => {
    try {
      toast.success('¡Estamos Preparando tu Compra! ');

    const response = await axios.post(`${apiUrl}/prod/activacion_esim`, datax);
    //console.log("Respuesta del servidor:", response.data);
    const rio = response.data.body.payment_request_id;
  //  console.log(rio);
    //console.log("Folio recibido:", apirede);
  if (rio) {
   window.location.href = 'https://pago.clip.mx/'+rio;
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



//////////////



  
  if (!data) return <p>No hay datos disponibles</p>;







const handleChange = (e) => {
  setSeleccionado(e.target.value);
};




  return (
    <div className="content-container">
    <div className="absolute-container2"> 
  
    
    <h33>Tus Datos para enviar  Esim:</h33>
    
    <h7><p>Numero a portar: {data.movil}</p></h7> 
   <h7> <p>Email: {data.mail}</p></h7> 
   <h7> <p>Dispositivo: {data.id_oferta}</p></h7> 
   <h7> <p>Nip: {data.nip}</p></h7> 

   <form onSubmit={handleSubmit} className="styled-select">
<select
  id="options"
  className="responsive-select"
  value={selectedOption}
  onChange={handleChange2}
>
  <option value="">--Escoge Oferta--</option>
  {options.map((item) => (
    <option key={item.idoferta_app} value={item.idoferta_app}>
      💰 ${item.precio_minorista} - {item.descripcion_oferta_comercial}
    </option>
  ))}
</select>


    <button  disabled={isLoading} align="center" className="responsive-button" >
             {isLoading ? 'Enviando...' : 'Compra'}
           </button>
    
       </form>



</div>
{/* ToastContainer para mostrar las alertas */}
<ToastContainer />
</div>



  )
};

export default Ofertaesim;





