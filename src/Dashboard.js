import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
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
  const [scanning, setScanning] = useState(false);
  const scannerRef = useRef(null);
  const imeiInputRef = useRef(null);

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
    if (scannerStarted) return;
    setScannerStarted(true);
    setScanning(true);

    const config = { fps: 10, qrbox: { width: 250, height: 250 } };
    const html5QrCode = new Html5Qrcode("reader");
    scannerRef.current = html5QrCode;

    html5QrCode.start(
      { facingMode: "environment" },
      config,
      (decodedText) => {
        if (/^\d{14,20}$/.test(decodedText)) {
          setimei(decodedText);
          if (imeiInputRef.current) {
            imeiInputRef.current.value = decodedText;
          }
          alert(`IMEI detectado: ${decodedText}`);
          stopScanner();
        }
      },
      (errorMessage) => {
        console.warn(`Scan error: ${errorMessage}`);
      }
    ).catch(err => {
      console.error("Error al iniciar el escáner:", err);
      setScannerStarted(false);
      setScanning(false);
    });
  };

  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.stop().then(() => {
        scannerRef.current.clear();
        setScannerStarted(false);
        setScanning(false);
      }).catch(err => {
        console.error("Error al detener el escáner:", err);
      });
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
                ref={imeiInputRef}
                onChange={(e) => setimei(e.target.value)}
                required
              />
              <div style={{ marginTop: '10px' }}>
                {!scannerStarted ? (
                  <button type="button" onClick={startScanner} className="orange-button small-button">
                    Escanear Código de Barras
                  </button>
                ) : (
                  <button type="button" onClick={stopScanner} className="orange-button small-button red">
                    Detener Escáner
                  </button>
                )}
              </div>
            </div>
            {scanning && <div style={{ color: 'green', marginTop: '10px' }}>🔍 Escaneando, por favor acerque el código...</div>}
            <div id="reader" style={{ width: '100%', maxWidth: 400, marginTop: '10px' }}></div>
            <button type="submit" className="orange-button responsive-button">Activar</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
