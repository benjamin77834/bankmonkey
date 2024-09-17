import axios from 'axios';

const apiUrl2 = process.env.REACT_APP_API_URL;
const postData = async () => {
  try {
    // Define los datos que deseas enviar en la solicitud POST
    const data = {
      msisdn: "5635013278",
      app: "1"
    };

    // Realiza la solicitud POST usando Axios
   // const response = await axios.post(`${apiUrl}`, data);
   const response = await axios.post(`${apiUrl2}/prod/profile_monkey`, data, {
    headers: {
      'Content-Type': 'application/json',  // Configura el tipo de contenido si es necesario
    
    },
  });
    //console.log("data de la solicitud:",data);

    console.log("Resultado de la solicitud:", response.data);
  } catch (error) {
    console.error("Error al hacer el POST:", error);
  }
};

export default postData;
