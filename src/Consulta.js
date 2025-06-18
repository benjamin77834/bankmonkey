import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import GaugeChart from 'react-gauge-chart';
import 'react-toastify/dist/ReactToastify.css';

function Consulta() {
  const [formData, setFormData] = useState({ name: '' });
  const [isLoadingConsulta, setIsLoadingConsulta] = useState(false);
  const [isLoadingCompra, setIsLoadingCompra] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [msisdn, setMsisdn] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setFormData({ name: parsed.msisdn });
      doConsulta(parsed.msisdn);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChange2 = (e) => setSelectedOption(e.target.value);

  const doConsulta = async (numero) => {
    if (!/^\d{10}$/.test(numero)) {
      toast.warn("Número inválido. Debe tener 10 dígitos.");
      return;
    }

    setIsLoadingConsulta(true);
    try {
      toast.success('¡Consulta en proceso!');

      const data = {
        msisdn: numero,
        name: "",
        app: '1',
        serv: 'profile',
      };

      localStorage.setItem('formData', JSON.stringify(data));

      const response = await axios.post(`${apiUrl}/prod/cambaceo_ofertas`, data);
      const data2 = response.data;

      const flattenedOptions = (data2.info || []).flatMap(info => info);

      setApiData(data2);
      setOptions(flattenedOptions);
      setMsisdn(data2.msisdn);
    } catch (error) {
      toast.error('Checa tu número al realizar la consulta.');
      console.error(error);
    } finally {
      setIsLoadingConsulta(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    doConsulta(formData.name);
  };

  const handleSubmit3 = async (e) => {
    e.preventDefault();
    if (!selectedOption || !msisdn) {
      toast.warn('Debes seleccionar una oferta y consultar primero.');
      return;
    }

    setIsLoadingCompra(true);
    try {
      toast.success('¡Estamos preparando tu compra!');
      const data = {
        msisdn,
        id_oferta: selectedOption,
        movil: msisdn,
        app: '1',
      };

      const response = await axios.post(`${apiUrl}/prod/genera_pago`, data);
      const api = response.data;

      if (api.payment_request_id) {
        window.location.href = `https://pago.clip.mx/${api.payment_request_id}`;
      }
    } catch (error) {
      toast.error('Error al generar pago.');
      console.error(error);
    } finally {
      setIsLoadingCompra(false);
    }
  };

  return (
    <div className="content-container">
      <div className="absolute-container2">
        {/* FORMULARIO */}
        <form onSubmit={handleSubmit} className="styled-select form-inline">
  <label htmlFor="name" style={{ flexBasis: '100%', marginBottom: '6px' }}></label>
  <input
    id="name"
    className="responsive-input"
    type="number"
    name="name"
    placeholder="Tu Número"
    value={formData.name}
    onChange={handleChange}
    required
  />
  <button className="responsive-button" disabled={isLoadingConsulta}>
    {isLoadingConsulta ? 'Consultando...' : 'Consulta'}
  </button>
</form>


        {/* RESULTADOS */}
        {apiData && (
          <div align="center">
            <p><strong>Estatus de Línea:</strong> {apiData.estatus}</p>
            <p><strong>Vencimiento:</strong> {apiData.fecha_vencimiento}</p>

            {/* GRÁFICAS */}
            {apiData.datos && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '12px',
                flexWrap: 'nowrap',
                marginTop: '30px',
              }}>
                <div style={{ textAlign: 'center', width: '27%' }}>
                  <GaugeChart
                    id="gauge-gb"
                    nrOfLevels={5}
                    percent={Math.min(apiData.datos / 50, 1)}
                    colors={['#000000', '#c34609']}
                    hideText={true}
                    style={{ width: '100%', height: '70px' }}
                  />
                  <div style={{ marginTop: '10px', fontSize: '20px' }}>{apiData.datos} Gb</div>
                </div>

                <div style={{ textAlign: 'center', width: '27%' }}>
                  <GaugeChart
                    id="gauge-sms"
                    nrOfLevels={5}
                    percent={Math.min(apiData.sms / 2000, 1)}
                    colors={['#000000', '#c34609']}
                    hideText={true}
                    style={{ width: '100%', height: '70px' }}
                  />
                  <div style={{ marginTop: '10px', fontSize: '20px' }}>{apiData.sms} SMS</div>
                </div>

                <div style={{ textAlign: 'center', width: '27%' }}>
                  <GaugeChart
                    id="gauge-min"
                    nrOfLevels={5}
                    percent={Math.min(apiData.min / 5000, 1)}
                    colors={['#000000', '#c34609']}
                    hideText={true}
                    style={{ width: '100%', height: '70px' }}
                  />
                  <div style={{ marginTop: '10px', fontSize: '20px' }}>{apiData.min} Min</div>
                </div>
              </div>
            )}

            {/* COMPRA */}
            <h3>Compra oferta:</h3>
            <form onSubmit={handleSubmit3}>
              <select
                id="options"
                size="7"
                className="responsive-select"
                value={selectedOption}
                onChange={handleChange2}
                required
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
      <ToastContainer />
    </div>
  );
}

export default Consulta;
