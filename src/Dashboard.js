import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/browser';
import './Dashboard.css';

const Dashboard = () => {
  const [username, setUsername] = useState(null);
  const [id_vendedor, setIdvendedor] = useState(null);
  const [saldo, setSaldo] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [imei, setimei] = useState('');
  const [activeView, setActiveView] = useState(null);
  const [scannerStarted, setScannerStarted] = useState(false);
  const videoRef = useRef(null);
  const codeReader = useRef(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem('nombre');
    const storedIdvendedor = localStorage.getItem('id_vendedor');
    if (storedUsername) {
      setUsername(storedUsername);
      setIdvendedor(storedIdvendedor);
    }
  }, []);

  const handleSaldoClick = async (event) => {
    event.preventDefault();
    setActiveView('saldo');
    try {
      const data = { id_vendedor, app: '1' };
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post(`${apiUrl}/prod/saldo`, data);
      setSaldo(response.data.saldo);
    } catch (error) {
      console.error('Error al consultar saldo:', error);
    }
  };

  const handleReportesClick = async (event) => {
    event.preventDefault();
    setActiveView('reportes');
    try {
      const data = { idvendedor: id_vendedor, app: '1', id: '140' };
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post(`${apiUrl}/prod/`, data);
      setOptions(response.data);
    } catch (error) {
      console.error('Error al consultar reportes:', error);
    }
  };

  const handleActivacionClick = () => {
    setActiveView('activacion');
  };

  const handleActivacionSubmit = (e) => {
    e.preventDefault();
    alert(`Activando línea con IMEI: ${imei}`);
  };

  const startScanner = async () => {
    if (scannerStarted || !videoRef.current) return;
    setScannerStarted(true);

    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoInputDevices = devices.filter(device => device.kind === 'videoinput');

      const constraints = {
        video: {
          deviceId: videoInputDevices.length > 0 ? videoInputDevices[0].deviceId : undefined,
          facingMode: 'environment',
          focusMode: 'continuous',
          zoom: { ideal: 2.0 } // intenta establecer zoom digital
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;
      videoRef.current.play();

      codeReader.current = new BrowserMultiFormatReader();

      await codeReader.current.decodeFromVideoDevice(null, videoRef.current, (result, err) => {
        if (result) {
          const detectedIMEI = result.getText();
          if (/^\d{3,20}$/.test(detectedIMEI)) {
            setimei(detectedIMEI);
            alert(`IMEI detectado: ${detectedIMEI}`);
            codeReader.current.reset();
            setScannerStarted(false);
          }
        } else if (err && !(err instanceof NotFoundException)) {
          console.error('Error de escaneo:', err);
        }
      });
    } catch (e) {
      console.error('Error iniciando el escáner:', e);
      setScannerStarted(false);
    }
  };

  return (
    <div className="content-container">
      <div className="absolute-container2">
        {username ? (
          <>
            <h1>Bienvenido {username}!</h1>
            <button className="orange-button" onClick={handleSaldoClick}>Saldo Vendedor</button>
            <button className="orange-button" onClick={handleReportesClick}>Reportes</button>
            <button className="orange-button" onClick={handleActivacionClick}>Activación</button>
          </>
        ) : (
          <h1>No se encontró ningún usuario.</h1>
        )}

        {activeView === 'saldo' && saldo && (
          <div align="center">
            <h1>Consulta de Saldo Vendedor:</h1>
            <h1>$ {saldo}</h1>
          </div>
        )}

        {activeView === 'reportes' && (
          <div align="center">
            <select
              id="options"
              className="responsive-select"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="">--Transacciones--</option>
              {options.map((item) => (
                <option key={item.folioventa} value={item.folioventa}>
                  Id: {item.folioventa} Fecha: {item.fecha} Estatus: {item.Estatus} Oferta: {item.oferta} Número: {item.msisdn} Trans: {item.trans}
                </option>
              ))}
            </select>
          </div>
        )}

        {activeView === 'activacion' && (
          <form onSubmit={handleActivacionSubmit} className="activation-form">
            <h2>Activación</h2>
            <div>
              <input
                placeholder="Dame tu IMEI, marca *#06#"
                type="text"
                id="imei"
                value={imei}
                onChange={(e) => setimei(e.target.value)}
                required
              />
              <button type="button" onClick={startScanner} className="orange-button small-button">Escanear Código de Barras</button>
            </div>
            <div style={{ position: 'relative', width: '100%', maxWidth: 400 }}>
              <video ref={videoRef} style={{ width: '100%', objectFit: 'cover' }} />
              <div style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                width: '100%',
                height: '2px',
                backgroundColor: 'red',
                transform: 'translateY(-1px)',
                zIndex: 1
              }} />
            </div>

            <form
              autoComplete="off"
              encType="multipart/form-data"
              action="https://recargas.monkeyfon.com/chango/validaiccz.php"
              method="POST"
              noValidate
            >
              <input type="file" accept="image/*" className="file-hiden" name="icc" id="icc" />
              <button type="submit" className="my_btn w-100 btn_disable">Validar</button>
            </form>

            <button type="submit" className="orange-button responsive-button">Activar</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
