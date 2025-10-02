import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import GaugeChart from "react-gauge-chart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Consulta.css";

export default function Consulta() {
  const [formData, setFormData] = useState({ name: "" });
  const [isLoadingConsulta, setIsLoadingConsulta] = useState(false);
  const [isLoadingCompra, setIsLoadingCompra] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [msisdn, setMsisdn] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedOfferId, setSelectedOfferId] = useState(null);

  const offersRef = useRef(null);

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
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

  const doConsulta = async (numero) => {
    if (!/^\d{10}$/.test(numero)) {
      toast.warn("Número inválido. Debe tener 10 dígitos.", { autoClose: 2000 });
      return;
    }

    setIsLoadingConsulta(true);
    try {
      toast.dismiss();
      toast.info("¡Consulta en proceso!", { autoClose: 1500 });

      const data = { msisdn: numero, name: "", app: "1", serv: "profile" };
      localStorage.setItem("formData", JSON.stringify(data));

      const response = await axios.post(`${apiUrl}/prod/cambaceo_ofertas`, data);
      const data2 = response.data;

      const flattenedOptions = (data2.info || []).flatMap((info) => info || []);
      setApiData(data2);
      setOptions(flattenedOptions);
      setMsisdn(data2.msisdn);

      if (!flattenedOptions.length) {
        toast.info("No se encontraron ofertas para este número.", { autoClose: 2000 });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al realizar la consulta.", { autoClose: 3000 });
      console.error(error);
    } finally {
      setIsLoadingConsulta(false);
    }
  };

  const handleCompra = async (id_oferta) => {
    if (!msisdn) {
      toast.warn("Primero consulta un número.", { autoClose: 2000 });
      return;
    }

    setIsLoadingCompra(true);
    try {
      toast.dismiss();
      toast.info("Preparando tu compra...", { autoClose: 1500 });

      const data = { msisdn, id_oferta, movil: msisdn, app: "1" };
      const response = await axios.post(`${apiUrl}/prod/genera_pago`, data);
      const api = response.data;

      if (api.payment_request_id) {
        window.location.href = `https://pago.clip.mx/${api.payment_request_id}`;
      } else {
        toast.error("No se pudo generar el pago. Intenta más tarde.", { autoClose: 3000 });
      }
    } catch (error) {
      toast.error("Error al generar pago.", { autoClose: 3000 });
      console.error(error);
    } finally {
      setIsLoadingCompra(false);
    }
  };

  const scrollOffers = (offset) => {
    if (offersRef.current) {
      offersRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="content-container">
      <div className="absolute-container2">
        {/* FORMULARIO */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            doConsulta(formData.name);
          }}
          className="form-inline"
        >
          <input
            type="number"
            name="name"
            placeholder="Tu Número"
            value={formData.name}
            onChange={handleChange}
            className="responsive-input"
            required
          />
          <button className="responsive-button" disabled={isLoadingConsulta}>
            {isLoadingConsulta ? "Consultando..." : "Consulta"}
          </button>
        </form>

        {/* RESULTADOS */}
        {apiData && (
          <>
            <div className="api-info">
              <p><strong>Estatus de Línea:</strong> {apiData.estatus}</p>
              <p><strong>Vence:</strong> {apiData.fecha_vencimiento}</p>
            </div>

            {/* GAUGES / BARRAS */}
            <div className="gauges-mobile-wrapper">
              {/* Desktop - Gauges */}
              <div className="gauges-desktop">
                {apiData.datos && (
                  <div className="gauge-container">
                    <div className="gauge-item">
                      <GaugeChart id="gauge-gb" nrOfLevels={5} percent={Math.min(apiData.datos / 50, 1)} colors={["#000","#c34609"]} hideText={true}/>
                      <div>{apiData.datos} Gb</div>
                    </div>
                    <div className="gauge-item">
                      <GaugeChart id="gauge-sms" nrOfLevels={5} percent={Math.min(apiData.sms / 2000, 1)} colors={["#000","#c34609"]} hideText={true}/>
                      <div>{apiData.sms} SMS</div>
                    </div>
                    <div className="gauge-item">
                      <GaugeChart id="gauge-min" nrOfLevels={5} percent={Math.min(apiData.min / 5000, 1)} colors={["#000","#c34609"]} hideText={true}/>
                      <div>{apiData.min} Min</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile - Barras en una sola línea */}
              {apiData.datos && (
                <div className="bars-mobile-wrapper">
                  <div className="bars-mobile">
                    <div className="bar-item">
                      <div className="bar-label">GB</div>
                      <div className="bar-wrapper"><div className="bar-fill" style={{width: `${(apiData.datos/50)*100}%`}}></div></div>
                      <div className="bar-value">{apiData.datos} Gb</div>
                    </div>
                    <div className="bar-item">
                      <div className="bar-label">SMS</div>
                      <div className="bar-wrapper"><div className="bar-fill" style={{width: `${(apiData.sms/2000)*100}%`}}></div></div>
                      <div className="bar-value">{apiData.sms} SMS</div>
                    </div>
                    <div className="bar-item">
                      <div className="bar-label">Min</div>
                      <div className="bar-wrapper"><div className="bar-fill" style={{width: `${(apiData.min/5000)*100}%`}}></div></div>
                      <div className="bar-value">{apiData.min} Min</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* OFERTAS */}
            <h3 className="offers-title">Compra tus Ofertas Disponibles:</h3>
            <div className="offers-scroll-wrapper">
              <button className="scroll-btn left" onClick={() => scrollOffers(-160)}>&lt;</button>
              <div className="offers-wrapper" ref={offersRef}>
                {options.map((item) => (
                  <div key={item.idoferta_app} className={`offer-card ${selectedOfferId===item.idoferta_app?"border-selected":"border-normal"}`} onClick={() => setSelectedOfferId(item.idoferta_app)}>
                    <p className="offer-text">{item.descripcion_oferta_comercial}</p>
                    <p className="offer-price">$ {item.precio_minorista}</p>
                    <button onClick={() => handleCompra(item.idoferta_app)} disabled={isLoadingCompra}>
                      {isLoadingCompra ? "Procesando..." : "Comprar"}
                    </button>
                  </div>
                ))}
              </div>
              <button className="scroll-btn right" onClick={() => scrollOffers(160)}>&gt;</button>
            </div>
          </>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false}/>
    </div>
  );
}

