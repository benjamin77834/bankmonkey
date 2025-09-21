import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AiraloOffers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");

  useEffect(() => {
    fetch("https://l0sqt7a9v0.execute-api.us-east-1.amazonaws.com/prod/airalo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: "EU" })
    })
    .then(res => res.json())
    .then(data => {
      const paquetes = typeof data.body === "string" ? JSON.parse(data.body) : data.body;
      setOffers(Array.isArray(paquetes) ? paquetes : []);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      toast.error("❌ Error al cargar ofertas");
      setLoading(false);
    });
  }, []);

  const handleBuy = (pkg) => {
    if (!customerEmail) {
      toast.error("Por favor ingresa tu email antes de continuar.");
      return;
    }

    fetch("https://l0sqt7a9v0.execute-api.us-east-1.amazonaws.com/prod/genera_pago_airalo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...pkg, email: customerEmail })
    })
    .then(res => res.json())
    .then(data => {
      if (data.body?.checkout_url) {
        window.location.href = data.body.checkout_url;
      } else toast.error("No se pudo generar el link de pago.");
    })
    .catch(() => toast.error("Error al procesar la compra"));
  };

  if (loading) return <p style={{ textAlign: "center", marginTop: 20 }}>Cargando ofertas...</p>;

  return (
    <div style={{ padding: 20, maxWidth: 1200, margin: "0 auto" }}>
      
      {/* 💎 Banner deluxe de eSIM internacional */}
      <div style={{
        background: "linear-gradient(135deg, #6a11cb, #2575fc)",
        color: "#fff",
        textAlign: "center",
        borderRadius: 20,
        padding: "25px 20px",
        marginBottom: 40,
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        transition: "transform 0.3s ease",
      }}>
        <h2 style={{ margin: 0, fontSize: "2rem", fontWeight: 700 }}>
          🌐 eSIM Internacional Global
        </h2>
        <p style={{ fontSize: "1.1rem", marginTop: 10, lineHeight: 1.5 }}>
          Conéctate en múltiples países sin complicaciones. Ideal para viajeros, nómadas digitales y quienes buscan libertad de conexión.
        </p>
      </div>

      {/* 🌟 Grid de ofertas con hover deluxe */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 20,
      }}>
        {offers.length === 0 ? (
          <p style={{ gridColumn: "1/-1", textAlign: "center" }}>No hay ofertas disponibles</p>
        ) : (
          offers.map((pkg, idx) => (
            <div
              key={idx}
              style={{
                border: "1px solid #ddd",
                borderRadius: 16,
                padding: 20,
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                backgroundColor: "#fff",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onClick={() => setSelectedOffer(pkg)}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px) scale(1.03)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0) scale(1)"}
            >
              <h3 style={{ fontWeight: 700, marginBottom: 10 }}>📡 {pkg.title || "Sin nombre"}</h3>
              <p>📶 {pkg.data_amount || pkg.datos_amount || "N/A"} Data</p>
              <p>⏱ {pkg.validity || pkg.vality || "N/A"}</p>
              <p>💲 {pkg.price} MXN</p>
            </div>
          ))
        )}
      </div>

      {/* Modal de compra deluxe */}
      {selectedOffer && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.6)",
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
              borderRadius: 16,
              padding: 30,
              width: "400px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ marginBottom: 16 }}>Comprar {selectedOffer.title || "Oferta"}</h3>
            <p>📶 {selectedOffer.data_amount || selectedOffer.datos_amount || "N/A"} de datos</p>
            <p>⏱ Validez: {selectedOffer.validity || selectedOffer.vality || "N/A"}</p>
            <p>💲 {selectedOffer.price || ""} MXN </p>

            <input
              type="email"
              placeholder="Tu correo electrónico"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                margin: "15px 0",
                borderRadius: 10,
                border: "1px solid #ccc",
                fontSize: "1rem"
              }}
              required
            />

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
              <button 
                onClick={() => setSelectedOffer(null)}
                style={{ padding: "10px 15px", cursor: "pointer", borderRadius: 10, border: "1px solid #ccc" }}
              >
                Cancelar
              </button>
              <button 
                onClick={() => handleBuy(selectedOffer)}
                style={{ padding: "10px 15px", backgroundColor: "#6a11cb", color: "#fff", borderRadius: 10, border: "none", cursor: "pointer" }}
              >
                Comprar ahora
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-center" />
    </div>
  );
}

export default AiraloOffers;


