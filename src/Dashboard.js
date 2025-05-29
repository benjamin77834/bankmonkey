import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import Tesseract from 'tesseract.js';
import './Dashboard.css';

const Dashboard = () => {
  const [username, setUsername] = useState(null);
  const [id_vendedor, setIdvendedor] = useState(null);
  const [saldo, setSaldo] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [imei, setimei] = useState('');
  const [icc, seticc] = useState('');
  const [activeView, setActiveView] = useState(null);
  const [scannerStarted, setScannerStarted] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [zoom, setZoom] = useState(1);
  const scannerRef = useRef(null);
  const imeiInputRef = useRef(null);
  const iccInputRef = useRef(null);
  const ocrIntervalRef = useRef(null);
  const videoTrackRef = useRef(null);
  const [portabilidad, setPortabilidad] = useState(false);
  const [nip, setNip] = useState('');
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

  const handleTransactionChange = (e) => {
    const selectedId = e.target.value;
    setSelectedOption(selectedId);
    const transaction = options.find(item => item.folioventa === selectedId);
    setSelectedTransaction(transaction);
  };

  const handleActivacionClick = () => {
    setActiveView('activacion');
  };

  const handleActivacionSubmit = (e) => {
    e.preventDefault();
    alert(`Activando línea con IMEI: ${imei} y ICC: ${icc}`);
  };

  const applyZoom = (factor) => {
    if (videoTrackRef.current) {
      const capabilities = videoTrackRef.current.getCapabilities();
      if (capabilities.zoom) {
        const newZoom = Math.min(capabilities.zoom.max, Math.max(capabilities.zoom.min, factor));
        videoTrackRef.current.applyConstraints({ advanced: [{ zoom: newZoom }] });
        setZoom(newZoom);
      }
    }
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
      async (decodedText) => {
        if (/^\d{14,20}$/.test(decodedText)) {
          if (!imei) {
            setimei(decodedText);
            if (imeiInputRef.current) imeiInputRef.current.value = decodedText;
            alert(`IMEI detectado: ${decodedText}`);
          } else {
            seticc(decodedText);
            if (iccInputRef.current) iccInputRef.current.value = decodedText;
            alert(`ICC detectado: ${decodedText}`);
            stopScanner();
          }
        }
      },
      (errorMessage) => {
        console.warn(`Scan error: ${errorMessage}`);
      }
    ).then(() => {
      const video = document.querySelector("video");
      if (video && video.srcObject) {
        const [track] = video.srcObject.getVideoTracks();
        videoTrackRef.current = track;
        const capabilities = track.getCapabilities();
        if (capabilities.zoom) {
          const defaultZoom = capabilities.zoom.max * 0.9;
          track.applyConstraints({ advanced: [{ zoom: defaultZoom }] });
          setZoom(defaultZoom);
        }
      }
    }).catch(err => {
      console.error("Error al iniciar el escáner:", err);
      setScannerStarted(false);
      setScanning(false);
    });

    ocrIntervalRef.current = setInterval(handleOCR, 5000);
  };

  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.stop().then(() => {
        scannerRef.current.clear();
        setScannerStarted(false);
        setScanning(false);
        clearInterval(ocrIntervalRef.current);
      }).catch(err => {
        console.error("Error al detener el escáner:", err);
      });
    }
  };

  const handleOCR = async () => {
    const videoElement = document.querySelector('video');
    if (!videoElement) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/png');
    const { data: { text } } = await Tesseract.recognize(dataUrl, 'eng');

    const match = text.match(/\d{14,20}/);
    if (match) {
      const detected = match[0];
      if (!imei) {
        setimei(detected);
        if (imeiInputRef.current) imeiInputRef.current.value = detected;
        alert(`IMEI detectado con OCR: ${detected}`);
      } else {
        seticc(detected);
        if (iccInputRef.current) iccInputRef.current.value = detected;
        alert(`ICC detectado con OCR: ${detected}`);
        stopScanner();
      }
    }
  };

  const enviarARekognition = async () => {
    const video = document.querySelector("video");
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/jpeg");

    try {
      const response = await fetch('https://<TU-ENDPOINT-LAMBDA>', {
        method: 'POST',
        body: JSON.stringify({ image: dataUrl }),
        headers: { 'Content-Type': 'application/json' }
      });

      const result = await response.json();
      const numbers = result.texts.filter(text => /^\d{14,20}$/.test(text));
      if (numbers.length > 0) {
        if (!imei) {
          setimei(numbers[0]);
          if (imeiInputRef.current) imeiInputRef.current.value = numbers[0];
          alert(`IMEI detectado con Rekognition: ${numbers[0]}`);
        } else {
          seticc(numbers[0]);
          if (iccInputRef.current) iccInputRef.current.value = numbers[0];
          alert(`ICC detectado con Rekognition: ${numbers[0]}`);
          stopScanner();
        }
      } else {
        alert('No se detectó un número válido.');
      }
    } catch (error) {
      console.error('Error enviando imagen a Rekognition:', error);
      alert('Error al procesar la imagen.');
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
              onChange={handleTransactionChange}
            >
              <option value="">--Transacciones--</option>
              {options.map((item) => (
                <option key={item.folioventa} value={item.folioventa}>
                  Id: {item.folioventa} Fecha: {item.fecha} Estatus: {item.Estatus} Oferta: {item.oferta} Número: {item.msisdn} Trans: {item.trans}
                </option>
              ))}
            </select>
            {selectedTransaction && (
              <div className="transaction-details">
                <p><strong>ICCID:</strong> {selectedTransaction.iccid}</p>
                <p><strong>SKU:</strong> {selectedTransaction.sku}</p>
              </div>
            )}
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
              <div style={{ marginTop: '10px' }}></div>
              <input
                placeholder="Escanea tu ICCID"
                type="text"
                id="icc"
                value={icc}
                ref={iccInputRef}
                onChange={(e) => seticc(e.target.value)}
                required
              />
              <div style={{ marginTop: '10px' }}>
                {!scannerStarted ? (
                  <button type="button" onClick={startScanner} className="orange-button small-button">
                    Escanear Código de Barras
                  </button>
                ) : (
                  <>
                    <button type="button" onClick={stopScanner} className="orange-button small-button red">
                      Detener Escáner
                    </button>
                    <button type="button" onClick={() => applyZoom(zoom + 1)} className="orange-button small-button" style={{ marginLeft: '10px' }}>
                      🔍 Zoom +
                    </button>
                    <button type="button" onClick={() => applyZoom(zoom - 1)} className="orange-button small-button" style={{ marginLeft: '10px' }}>
                      🔎 Zoom -
                    </button>
                  </>
                )}
                <button type="button" onClick={handleOCR} className="orange-button small-button" style={{ marginLeft: '10px' }}>
                  Leer por texto (OCR)
                </button>
                <button type="button" onClick={enviarARekognition} className="orange-button small-button" style={{ marginLeft: '10px' }}>
                  Leer con Rekognition
                </button>
              </div>
            </div>
            {scanning && <div style={{ color: 'green', marginTop: '10px' }}>🔍 Escaneando, por favor acerque el código...</div>}
            <div id="reader" style={{ width: '100%', maxWidth: 400, marginTop: '10px' }}></div>
            <button type="submit" className="orange-button responsive-button">Activar</button>

            <div style={{ marginTop: '10px' }}></div>
            <label>
              <input type="checkbox" checked={portabilidad} onChange={(e) => setPortabilidad(e.target.checked)} /> Portabilidad
            </label>
            {portabilidad && (
              <div style={{ marginTop: '10px' }}>
                <input placeholder="NIP de portabilidad" type="text" value={nip} onChange={(e) => setNip(e.target.value)} required />
              </div>
            )}
            
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;


