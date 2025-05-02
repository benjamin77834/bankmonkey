import './App.css';

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import React, { useState, useEffect, useRef  } from 'react';
//import Quagga from 'quagga';  // Importamos QuaggaJS
<<<<<<< HEAD
//import { Html5QrcodeScanner } from "html5-qrcode";
import './Dashboard.css';
=======
import { Html5QrcodeScanner } from "html5-qrcode";

//console.log(nombre);
>>>>>>> 408a3686154c69d4c38a1aae5d77b43f210d1327

const Dashboard = () => {
  const [username, setUsername] = useState(null); // Estado para almacenar el valor de localStorage
  const [id_vendedor,setIdvendedor] = useState(null); // Estado para almacenar el valor de localStorage
  const [saldo,setSaldo] = useState(null); // Estado para almacenar el valor de localStorage
  const [options, setOptions] = useState([]);
  const [showForm, setShowForm] = useState(false); // Estado para mostrar/ocultar el formulario
  const [msisdn, setMsisdn] = useState(''); // Estado para almacenar el número de teléfono
  const [showForm2, setShowForm2] = useState(false); // Estado para mostrar/ocultar el formulario
  const [imei, setimei] = useState(''); // Estado para almacenar el número de teléfono

  const [codigoBarras, setCodigoBarras] = useState('');
  const [scannerActive, setScannerActive] = useState(false);
  const scannerRef = useRef(null);
  //console.log(options);

<<<<<<< HEAD

=======
>>>>>>> 408a3686154c69d4c38a1aae5d77b43f210d1327
  const [selectedOption, setSelectedOption] = useState('');
 // const [selectedOption, setSelectedOption] = useState('');
  useEffect(() => {
    const storedUsername = localStorage.getItem('nombre');
    const storedIdvendedor= localStorage.getItem('id_vendedor');

    if (storedUsername) {
      setUsername(storedUsername); // Guardar el valor en el estado
      setIdvendedor(storedIdvendedor);
    }
  }, []);
  const [text, setText] = useState("Texto original");

  const handleActivation = async (event) => {
    event.preventDefault();


  }


<<<<<<< HEAD



//  const startScanner = () => {
 //   const html5QrCodeScanner = new Html5QrcodeScanner(
   //   "reader", { fps: 10, qrbox: 250 });

//    html5QrCodeScanner.render((decodedText, decodedResult) => {
  //    setCodigoBarras(decodedText); // El código escaneado
    //  html5QrCodeScanner.clear();   // Detenemos el escáner tras leer el código
     // setScannerActive(false);
    //});
  //};

  const toggleScanner = () => {
    if (!scannerActive) {
   //   startScanner();
=======
  const startScanner = () => {
    const html5QrCodeScanner = new Html5QrcodeScanner(
      "reader", { fps: 10, qrbox: 250 });

    html5QrCodeScanner.render((decodedText, decodedResult) => {
      setCodigoBarras(decodedText); // El código escaneado
      html5QrCodeScanner.clear();   // Detenemos el escáner tras leer el código
      setScannerActive(false);
    });
  };

  const toggleScanner = () => {
    if (!scannerActive) {
      startScanner();
>>>>>>> 408a3686154c69d4c38a1aae5d77b43f210d1327
      setScannerActive(true);
    }
  };

  
  const handleChange2 = async (event) => {
  
    event.preventDefault();
    //    console.log(msisdn);
      //  console.log(selectedOption);
       
         


          try {
          //    toast.success('¡Estamos Preparando tu Saldo! ');
          const data = {
            id_vendedor: id_vendedor,
            app:"1"
          };
          console.log(data);
          const apiUrl = process.env.REACT_APP_API_URL;
          const response = await axios.post(`${apiUrl}/prod/saldo`, data);
          //console.log("dess",response);
          const api=response.data
          console.log(api.saldo);
          //console.log(api.payment_request_id);
          setSaldo(api.saldo);
          
   
         //console.log(data2)
          
          } catch (error) {
            console.error('Error fetching data:', error);
          }
  };


  const toggleForm2 = () => {
    setShowForm2(!showForm2); // Cambia la visibilidad del formulario
  };

  const toggleForm = () => {
    setShowForm(!showForm); // Cambia la visibilidad del formulario
    setShowForm2(showForm2); // Cambia la visibilidad del formulario

  };
  const handleChangeui = async (event) => {
    setShowForm2(!showForm2);
    setShowForm(showForm);
    event.preventDefault();
    //    console.log(msisdn);
      //  console.log(selectedOption);
         // alert("hola"); 
          try {
          //    toast.success('¡Estamos Preparando tu Saldo! ');
          const data = {
            idvendedor: id_vendedor,
            app:"1",
            "id":"140"
          };
        //  console.log(data);
          const apiUrl = process.env.REACT_APP_API_URL;
          const response = await axios.post(`${apiUrl}/prod/`, data);

          const data2 = response.data;
          //console.log(data2);

          //const flattenedOptions = data2.body.flatMap(body => body);

          setOptions(data2);    
   
         // console.log(flattenedOptions);
          console.log(options);
          
          } catch (error) {
            console.error('Error fetching data:', error);
          }
     
  };




    return (

     
   
      <div className="content-container">
      <div className="absolute-container2"> 
    
      <div>
        {username ? (
       
       
       <><h1>Bienvenido {username}!</h1> 
       
       
          <button className="orange-button"  onClick={handleChange2}> Saldo Vendedor </button>

<button className="orange-button"  onClick={handleChangeui}> Reportes </button>  


<<<<<<< HEAD
=======
       <button className="orange-button"   onClick={toggleForm}> Activación</button>
>>>>>>> 408a3686154c69d4c38a1aae5d77b43f210d1327
       
       </>



      ) : (
        <h1>No se encontró ningún usuario.</h1>
      )};
      </div>


      {saldo &&(
   
   <div align="center">
   
 <h1><p>Consulta de Saldo Vendedor:</p></h1>  
 <h1><p>$ {saldo}</p></h1>  

</div>

 )}


{showForm2 && (
   

   <div align="center">




      <select id="options"   
   className="responsive-select"
      value={selectedOption} >
   
      <option value="">--Transacciones--</option>
      {options.map((item) => (
        <option key={item.folioventa} value={item.folioventa}   >
          Id: {item.folioventa} Fecha: {item.fecha} Estatus: {item.Estatus} Oferta: {item.oferta} numero: {item.msisdn} Trans: {item.trans} 
        </option>
      ))}
    </select>


</div>

)}


{showForm && (
          <form onSubmit={handleActivation} className="activation-form">
            <h2>Activación</h2>
            <div>
              <label htmlFor="msisdn"></label>
              <input  placeholder="Dame Tu Imei, Marca *#06#"
                type="text"
                id="imei"
                value={imei}
                onChange={(e) => setimei(e.target.value)} // Actualiza el estado del MSISDN
                required
              />

<<<<<<< HEAD

<form autocomplete="off" id="data-icc" name="data-icc" enctype="multipart/form-data" action="https://recargas.monkeyfon.com/chango/validaiccz.php" method="POST" novalidate>

                                                              
 <input type="file" accept="image/*" class="file-hiden" name="icc" id="icc"/>
 <button id="validarICCbtn" name="validarICCbtn" class="my_btn w-100 btn_disable">Validar</button>


</form>
</div>



      
=======
</div>


            <div>
      <button onClick={toggleScanner}>
        {scannerActive ? "Detener Escáner" : "Iniciar Escáner"}
      </button>

      {/* Contenedor para el escáner */}
      <div id="reader" style={{ width: "100%", height: "200px" }}></div>

      {/* Mostrar el código escaneado */}
      <div>
        <label htmlFor="codigoBarras">Código de Barras:</label>
        <input type="text" id="codigoBarras" value={codigoBarras} onChange={(e) => setMsisdn(e.target.value)} placeholder="Dame ICC" />
      </div>
    </div>

>>>>>>> 408a3686154c69d4c38a1aae5d77b43f210d1327
            <button type="submit" className="orange-button responsive-button">
              Activar
            </button>
          </form>
        )}




 </div>




  {/* ToastContainer para mostrar las alertas */}
    {/*   <ToastContainer />*/}
 </div>






    );
  };
  
  export default Dashboard;
  