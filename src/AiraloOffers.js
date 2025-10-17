import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AiraloOffers() {
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [expandedOfferId, setExpandedOfferId] = useState(null);

  useEffect(() => {
    fetch("https://tu-lambda-url.amazonaws.com/dev/airalo") // 🔧 Cambia por tu endpoint real
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data)) {
          const formatted = data.map((pkg) => ({
            id: pkg.id,
            title: getFormattedTitle(pkg),
            datos_amount: pkg.datos_amount,
            vality: pkg.vality,
            coverage: pkg.coverage || [],
            price_mxn: pkg.price_mxn,
            price_usd: pkg.price_usd,
            comision_mxn: pkg.comision_mxn,
            comision_usd: pkg.comision_usd
          }));
          setOffers(formatted);
        } else {
          toast.error("Error al obtener ofertas");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error de conexión con la API");
      });
  }, []);

  const getFormattedTitle = (pkg) => {
    if (pkg.title && pkg.title.trim() !== "") return pkg.title;
    const id = pkg.id?.toLowerCase() || "";
    if (id.includes("discover")) return "Discover Global";
    if (id.includes("eurolink")) return "Eurolink Europa";
    if (id.includes("global")) return "Global";
    return "Plan Internacional";
  };

  const handleBuy = (offer) => {
    setSelectedOffer(offer);
  };

  const toggleCoverage = (id) => {
    setExpandedOfferId(expandedOfferId === id ? null : id);
  };

  const closeModal = () => {
    setSelectedOffer(null);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4 text-center">Ofertas Airalo</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {offers.map((pkg) => (
          <div key={pkg.id} className="border rounded-2xl p-4 shadow bg-white">
            <h2 className="text-xl font-semibold mb-2">{pkg.title}</h2>
            <p>📶 Datos: {pkg.datos_amount}</p>
            <p>🕒 Validez: {pkg.vality}</p>

            <p>
              💲 {pkg.price_usd?.toLocaleString("es-MX", { style: "currency", currency: "MXN" }) || "N/D"}
              {pkg.price_usd ? ` (${pkg.price_usd.toLocaleString("en-US", { style: "currency", currency: "USD" })})` : ""}
            </p>

            {pkg.comision_mxn && (
              <p>
                🧾 Comisión: {pkg.comision_mxn.toLocaleString("es-MX", { style: "currency", currency: "MXN" })}
                {pkg.comision_usd ? ` (${pkg.comision_usd.toLocaleString("en-US", { style: "currency", currency: "USD" })})` : ""}
              </p>
            )}

            <button
              onClick={() => toggleCoverage(pkg.id)}
              className="mt-2 text-blue-600 underline text-sm"
            >
              {expandedOfferId === pkg.id ? "Ocultar cobertura" : "Ver cobertura"}
            </button>

            {expandedOfferId === pkg.id && (
              <ul className="mt-2 list-disc ml-5 text-sm text-gray-700">
                {pkg.coverage.map((country, index) => (
                  <li key={index}>{country}</li>
                ))}
              </ul>
            )}

            <button
              onClick={() => handleBuy(pkg)}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
            >
              Comprar
            </button>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedOffer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full relative">
            <h2 className="text-xl font-bold mb-2">{selectedOffer.title}</h2>
            <p>📶 Datos: {selectedOffer.datos_amount}</p>
            <p>🕒 Validez: {selectedOffer.vality}</p>

            <p>
              💲 {selectedOffer.price_mxn?.toLocaleString("es-MX", { style: "currency", currency: "MXN" })}
              {selectedOffer.price_usd ? ` (${selectedOffer.price_usd.toLocaleString("en-US", { style: "currency", currency: "USD" })})` : ""}
            </p>

            {selectedOffer.comision_mxn && (
              <p>
                🧾 Comisión: {selectedOffer.comision_mxn.toLocaleString("es-MX", { style: "currency", currency: "MXN" })}
                {selectedOffer.comision_usd ? ` (${selectedOffer.comision_usd.toLocaleString("en-US", { style: "currency", currency: "USD" })})` : ""}
              </p>
            )}

            <h3 className="mt-4 font-semibold">Cobertura:</h3>
            <ul className="list-disc ml-5 text-sm text-gray-700">
              {selectedOffer.coverage.map((country, index) => (
                <li key={index}>{country}</li>
              ))}
            </ul>

            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-xl mr-2 hover:bg-gray-400"
              >
                Cerrar
              </button>
              <button
                onClick={() => toast.success("Compra realizada exitosamente")}
                className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
              >
                Confirmar compra
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AiraloOffers;
