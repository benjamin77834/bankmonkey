import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import GaugeChart from 'react-gauge-chart';
import 'react-toastify/dist/ReactToastify.css';

function Consulta() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const [isLoadingConsulta, setIsLoadingConsulta] = useState(false);
  const [isLoadingCompra, setIsLoadingCompra] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [msisdn, setMsisdn] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  // Al cargar, recuperar el número del localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setFormData(prev => ({ ...prev, name: parsed.msisdn }));
    }
  }, []);

  // Manejo del input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Selección de oferta
  const handleChange2 = (event) => {
    setSelectedOption(event.target.value);
  };

  // Enviar compra
  const handleSubmit3 = async (event) => {
    event.preventDefault();
    if (selectedOption && msisdn) {
      const data = {
        msisdn,
        id_oferta: selectedOption,
        movil: msisdn,
        app: '1',
      };

      const apiUrl = process.env.REACT_APP_API_URL;

      try {
        setIsLoadingCompra(true);
        toast.success('¡Estamos preparando tu compra!');

        const response = await axios.post(`${apiUrl}/prod/genera_pago`, data);
        const api = response.data;

        if (api.payment_request_id) {
          window.location.href = 'https://pago.clip.mx/' + api.payment_request_id;
        }
      } catch (error) {
        toast.error('Error al generar pago.');
        console.error('Error:', error);
      } finally {
        setIsLoadingCompra(false);
      }
    } else {
      toast.warn('Debes seleccionar una oferta y consultar primero.');
    }
  };

  // Enviar consulta
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoadingConsulta(true);
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const data = {
        msisdn: formData.name,
        name: formData.name,
        app: '1',
        serv: 'profile',
      };

      toast.success('¡Consulta en proceso! Si recargaste, puede tardar unos minutos.');
      localStorage.setItem('formData', JSON.stringify(data));

      const response = await axios.post(`${apiUrl}/prod/cambaceo_ofertas`, data);
      const data2 = response.data;

      const flattenedOptions = data2.info.flatMap(info => info);
      setApiData(data2);
      setOptions(flattenedOptions);
      setMsisdn(data2.msisdn);
    } catch (error) {
      toast.error('Error al realizar la consulta.');
      console.error('Error consulta:', error);
    } finally {
      setIsLoadingConsulta(false);
    }
  };

  return (
    <div className="content-container">
      <div className="absolute-container2">
        {/* FORMULARIO DE CONSULTA */}
        <form onSubmit={handleSubmit} className="styled-select">
          <h3>1. Consulta y Recarga</h3>
          <input
            className="responsive-input"
            type="number"
            name="name"
            placeholder="Tu Número"
            value={formData.name}
            onChange={handleChange}
          />
          <button className="responsive-button" disabled={isLoadingConsulta}>
            {isLoadingConsulta ? 'Consultando...' : 'Consulta'}
          </button>
        </form>

        {/* RESULTADO DE CONSULTA */}
        {isLoadingConsulta && <p>Cargando datos...</p>}
        {apiData && (
          <div align="center">
            <p><strong>Estatus de Línea:</strong> {apiData.estatus}</p>
            <p><strong>Vencimiento:</strong> {apiData.fecha_vencimiento}</p>

            {/* GRAFICAS */}
            {apiData?.datos && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '12px',
                flexWrap: 'nowrap',
                marginTop: '30px',
              }}>
                {/* GB */}
                <div style={{ textAlign: 'center', width: '27%' }}>
                  <GaugeChart
                    id="gauge-gb"
                    nrOfLevels={5}
                    percent={Math.min(apiData.datos / 50, 1)}
                    colors={['#000000', '#c34609']}
                    hideText={true}
                    style={{ width: '100%', height: '80px' }}
                  />
                  <div style={{ marginTop: '10px', fontSize: '20px', color: '#000000' }}>
                    {apiData.datos} Gb
                  </div>
                </div>

                {/* SMS */}
                <div style={{ textAlign: 'center', width: '27%' }}>
                  <GaugeChart
                    id="gauge-sms"
                    nrOfLevels={5}
                    percent={Math.min(apiData.sms / 2000, 1)}
                    colors={['#000000', '#c34609']}
                    hideText={true}
                    style={{ width: '100%', height: '80px' }}
                  />
                  <div style={{ marginTop: '10px', fontSize: '20px', color: '#000000' }}>
                    {apiData.sms} SMS
                  </div>
                </div>

                {/* MINUTOS */}
                <div style={{ textAlign: 'center', width: '27%' }}>
                  <GaugeChart
                    id="gauge-min"
                    nrOfLevels={5}
                    percent={Math.min(apiData.min / 5000, 1)}
                    colors={['#000000', '#c34609']}
                    hideText={true}
                    style={{ width: '100%', height: '80px' }}
                  />
                  <div style={{ marginTop: '10px', fontSize: '20px', color: '#000000' }}>
                    {apiData.min} Min
                  </div>
                </div>
              </div>
            )}

            {/* COMPRA */}
            <h3>2. Compra oferta:</h3>
            <form onSubmit={handleSubmit3}>
              <select
                id="options"
                size="8"
                className="responsive-select"
                value={selectedOption}
                onChange={handleChange2}
              >
                <option value="">-- Escoge Oferta --</option>
                {options.map((item) => (
                  <option key={item.idoferta_app} value={item.idoferta_app}>
                    $ {item.precio_minorista} {item.descripcion_oferta_comercial}
                  </option>
                ))}
              </select>
              <button className="responsive-button" disabled={isLoadingCompra}>
                {isLoadingCompra ? 'Enviando...' : 'Compra'}
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Toast */}
      <ToastContainer />
    </div>
  );
}

export default Consulta;
