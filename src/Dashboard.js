import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';

import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
//import { Html5Qrcode } from 'html5-qrcode';
import './Dashboard.css';

const Dashboard = () => {
  const [username, setUsername] = useState(null);
  const [id_vendedor, setIdvendedor] = useState(null);
  const [saldo, setSaldo] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [imei, setimei] = useState('');
  const [activeView, setActiveView] = useState(null);
  const [scannerVisible, setScannerVisible] = useState(false);
  const scannerRef = useRef(null);

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

  const startScanner = () => {
    setScannerVisible(true);
  };

  useEffect(() => {
    if (scannerVisible) {
      const scannerElement = document.getElementById("scanner");
      if (!scannerElement) {
        console.error("El elemento con id='scanner' no existe.");
        return;
      }

      const html5QrCode = new Html5Qrcode("scanner");
      scannerRef.current = html5QrCode;

      html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: 250,
          formatsToSupport: [Html5QrcodeSupportedFormats.CODE_128] // <-- Solo código de barras
        },
        (decodedText) => {
          setimei(decodedText);
          html5QrCode.stop().then(() => {
            setScannerVisible(false);
          }).catch((err) => console.error("Error al detener el escáner:", err));
        },
        (errorMessage) => {
          // Error de lectura
        }
      ).catch((err) => {
        console.error("Error al iniciar escáner:", err);
      });
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
        scannerRef.current = null;
      }
    };
  }, [scannerVisible]);

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
              <button type="button" onClick={startScanner} className="orange-button small-button">Escanear IMEI</button>
            </div>

            {scannerVisible && (
  <div style={{ position: 'relative', width: "300px", margin: "auto", paddingTop: "10px" }}>
    <div id="scanner"></div>
    <div className="scan-line"></div>
  </div>
)}


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
