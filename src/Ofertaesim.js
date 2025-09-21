import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

function Ofertaesim() {
  const [data, setData] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("formData");
    if (saved) {
      setData(JSON.parse(saved));
      fetchOfertas();
    }
  }, []);

  const fetchOfertas = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post(`${apiUrl}/prod/select`, { app: "1", esim: "1" });
      setOptions(response.data);
    } catch (error) {
      console.error("Error al obtener ofertas:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedOption || !data?.mail) return;

    setIsLoading(true);
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const payload = {
        be_id: "",
        data: {
          id_vendedor: "",
          phone: data.id_oferta,
          mail: data.mail,
          idoferta_app: selectedOption,
          portIn: {
            nip: data.nip,
            msisdnPorted: data.movil,
            nombreOperadoraOrigen: "",
            fecha_portacion: ""
          }
        }
      };
      const response = await axios.post(`${apiUrl}/prod/activacion_esim`, payload);
      const paymentId = response.data.body.payment_request_id;
      if (paymentId) window.location.href = `https://pago.clip.mx/${paymentId}`;
      toast.success('¡Estamos preparando tu compra!');
    } catch (error) {
      console.error('Error al enviar la compra:', error);
      toast.error('Error al enviar la compra');
    } finally {
      setIsLoading(false);
    }
  };

  if (!data) return <p>No hay datos disponibles</p>;

  return (
    <div className="content-container">
      <div className="absolute-container2 oferta-card">
        <h33>Tus Datos para Enviar eSIM:</h33>

        <div className="user-data">
          <p>Numero a portar: {data.movil}</p>
          <p>Email: {data.mail}</p>
          <p>Dispositivo: {data.id_oferta}</p>
          <p>NIP: {data.nip}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <select
            className="responsive-select"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="">-- Escoge Oferta --</option>
            {options.map((item) => (
              <option key={item.idoferta_app} value={item.idoferta_app}>
                💰 ${item.precio_minorista} - {item.descripcion_oferta_comercial}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="responsive-button"
            disabled={isLoading}
          >
            {isLoading ? 'Enviando...' : 'Compra'}
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Ofertaesim;
