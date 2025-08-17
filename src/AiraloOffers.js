import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AiraloOffers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [customerEmail, setCustomerEmail] = useState(""); // 🔹 Nuevo estado

  // 🔹 Cargar paquetes desde tu Lambda vía POST
  useEffect(() => {
    fetch("https://l0sqt7a9v0.execute-api.us-east-1.amazonaws.com/prod/airalo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: "EU" // Ajusta según lo que tu Lambda necesite
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const paquetes = typeof data.body === "string" ? JSON.parse(data.body) : data.body;
        if (Array.isArray(paquetes)) {
          setOffers(paquetes);
        } else {
          console.error("No es un array:", paquetes);
          setOffers([]);
        } 
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        toast.error("❌ Error al cargar ofertas");
      });
  }, []);

  // 🔹 Comprar paquete
  const handleBuy = (pkg) => {
    if (!customerEmail) {
      toast.error("Por favor ingresa tu email antes de continuar.");
      return;
    }

    fetch("https://l0sqt7a9v0.execute-api.us-east-1.amazonaws.com/prod/genera_pago_airalo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...pkg,
        email: customerEmail, // 🔹 Se agrega email al payload
      }),
    })
      .then((res) => res.json())
      .then((data) => {
      
      


        if (data.body && data.body.checkout_url) {
      
          window.location.href = data.body.checkout_url;
        } else {
          toast.error("No se pudo generar el link de pago.");
        }
      })
      .catch(() => toast.error("Error al procesar la compra"));
  };
 // console.log(data)
  if (loading) return <p style={{ textAlign: "center", marginTop: 20 }}>Cargando ofertas...</p>;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16, padding: 20 }}>
      {offers.length === 0 ? (
        <p>No hay ofertas disponibles</p>
      ) : (
        offers.map((pkg, idx) => (
          <div
            key={idx}
            style={{
              border: "1px solid #ccc",
              borderRadius: 12,
              padding: 16,
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}
            onClick={() => setSelectedOffer(pkg)}
          >
               
            <h3 style={{ fontWeight: "bold", marginBottom: 8 }}>🌐 {pkg.title || "Sin nombre"}</h3>
            <p>📶 {pkg.data_amount || pkg.datos_amount || "N/A"} Data</p>
            <p>⏱ {pkg.validity || pkg.vality || "N/A"} </p>
            <p>💲 {pkg.price} MXN</p>
            <p>Costomonk {pkg.comision} USD</p>
            <p>package_id {pkg.package_id} USD</p>
          </div>
        ))
      )}

      {/* Modal de compra */}
      {selectedOffer && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setSelectedOffer(null)}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 24,
              width: "400px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>id {selectedOffer.id || "Package"}</h3>
            <h3>Comprar {selectedOffer.title || "Oferta"}</h3>
            <p>📶 {selectedOffer.data_amount || selectedOffer.datos_amount || "N/A"} de datos</p>
            <p>⏱ Validez: {selectedOffer.validity || selectedOffer.vality || "N/A"}</p>
            <p>💲 {selectedOffer.price || ""} MXN </p>

            {/* 🔹 Campo Email obligatorio */}
            <input
              type="email"
              placeholder="Tu correo electrónico"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              style={{ width: "100%", padding: "8px", margin: "12px 0", borderRadius: 8, border: "1px solid #ccc" }}
              required
            />

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
              <button onClick={() => setSelectedOffer(null)}>Cancelar</button>
              <button onClick={() => handleBuy(selectedOffer)}>Comprar ahora</button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-center" />
    </div>
  );
}

export default AiraloOffers;
