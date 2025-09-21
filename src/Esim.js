import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './Esim.css';

function Esim() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);
  const [msisdn, setMsisdn] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [mostrarCampo, setMostrarCampo] = useState(false);
  const [comentario, setComentario] = useState('');
  const [mail, setMail] = useState('');
  const [msisdnported, setMsisdnported] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleChange2 = (e) => setSelectedOption(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      toast.warn('Por favor ingresa tu dispositivo', { autoClose: 2000 });
      return;
    }
    setIsLoading(true);
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post(`${apiUrl}/prod/esimconsulta`, { device: formData.name, app: '1' });
      setApiData(response.data);
      setOptions(response.data);
      setMsisdn(response.data.msisdn || '');
      toast.success('Dispositivo consultado correctamente', { autoClose: 2000 });
    } catch (err) {
      toast.error('Error al consultar dispositivo', { autoClose: 3000 });
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit3 = (e) => {
    e.preventDefault();
    if (!selectedOption || !mail) {
      toast.warn('Selecciona un dispositivo y proporciona tu correo', { autoClose: 2000 });
      return;
    }
    const data = {
      msisdn,
      id_oferta: selectedOption,
      movil: msisdnported,
      mail,
      nip: comentario,
      app: '1',
    };
    localStorage.setItem('formData', JSON.stringify(data));
    toast.success('¡Estamos preparando tu compra!', { autoClose: 2000 });
    navigate('/Ofertaesim');
  };

  return (
    <div className="content-container">
      <div className="absolute-container2">
        {/* Paso 1: Consulta */}
        <form onSubmit={handleSubmit} className="responsive-form">
          <h33>1. Consulta tu Dispositivo</h33>
          <input
            className="responsive-input"
            type="text"
            name="name"
            placeholder="Ingresa tu teléfono"
            value={formData.name}
            onChange={handleChange}
          />
          <button className="orange-button" disabled={isLoading}>
            {isLoading ? 'Consultando...' : 'Consulta'}
          </button>
        </form>

        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

        {/* Paso 2 y 3: Selección y correo */}
        {apiData && (
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <h33>2. Escoge tu Dispositivo</h33>
            <select
              className="responsive-select"
              value={selectedOption}
              onChange={handleChange2}
            >
              <option value="">--Selecciona dispositivo--</option>
              {options.map((item) => (
                <option key={item.modelo} value={item.modelo}>
                  {item.modelo} {item.fabricante}
                </option>
              ))}
            </select>

            <h33>3. Ingresa tu Correo</h33>
            <input
              className="responsive-input"
              type="email"
              placeholder="Correo electrónico"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
            />

            {/* Portabilidad */}
            <div style={{ margin: '15px 0' }}>
              <label>
                <input
                  type="checkbox"
                  checked={mostrarCampo}
                  onChange={(e) => setMostrarCampo(e.target.checked)}
                />{' '}
                ¿Quieres portar tu línea?
              </label>
            </div>

            {mostrarCampo && (
              <div>
                <input
                  type="number"
                  placeholder="NIP"
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  className="responsive-input"
                  style={{ marginBottom: '10px' }}
                />
                <input
                  type="number"
                  placeholder="Número a portar"
                  value={msisdnported}
                  onChange={(e) => setMsisdnported(e.target.value)}
                  className="responsive-input"
                />
              </div>
            )}

            <button className="orange-button" onClick={handleSubmit3} disabled={isLoading} style={{ marginTop: '20px' }}>
              {isLoading ? 'Procesando...' : 'Compra'}
            </button>
          </div>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Esim;
