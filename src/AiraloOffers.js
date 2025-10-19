import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AiraloOffers() {
  const [offers, setOffers] = useState([]);
  const [loadingOffers, setLoadingOffers] = useState(true);
  const [devices, setDevices] = useState([]);
  const [loadingDevices, setLoadingDevices] = useState(true);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [searchDevice, setSearchDevice] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [customerEmail, setCustomerEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showCoverage, setShowCoverage] = useState({});

  // 🔹 Función auxiliar: título corregido
  const getFormattedTitle = (pkg) => {
    if (pkg.title && pkg.title.trim() !== "") return pkg.title;
    const id = pkg.package_id?.toLowerCase() || "";
    if (id.includes("discover")) return "Discover Global";
    if (id.includes("eurolink")) return "Eurolink Europa";
    if (id.includes("global")) return "Plan Global";
    return "Plan Internacional";
  };

  // 🔹 Formato de moneda seguro
  const formatCurrency = (value, locale, currency) => {
    if (typeof value !== "number" || isNaN(value)) return "N/D";
    try {
      return value.toLocaleString(locale, { style: "currency", currency });
    } catch {
      return `${value} ${currency}`;
    }
  };

  // Cargar dispositivos
  useEffect(() => {
    fetch(
      "https://l0sqt7a9v0.execute-api.us-east-1.amazonaws.com/prod/getdisp",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        let list = [];
        if (Array.isArray(result.body?.data)) {
          list = result.body.data.map(
            (d) => d.name || d.device_name || d.title || d.toString()
          );
        }
        setDevices(list);
        setLoadingDevices(false);
      })
      .catch((err) => {
        console.error("❌ Error al cargar dispositivos:", err);
        toast.error("❌ Error al cargar dispositivos");
        setLoadingDevices(false);
      });
  }, []);

  // Cargar ofertas
  useEffect(() => {
    fetch(
      "https://l0sqt7a9v0.execute-api.us-east-1.amazonaws.com/prod/airalo",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: "EU" }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const paquetes =
          typeof data.body === "string" ? JSON.parse(data.body) : data.body;
        const formatted = Array.isArray(paquetes)
          ? paquetes.map((pkg) => ({
              ...pkg,
              title: getFormattedTitle(pkg),
              price_mxn: Number(pkg.price_mxn) || 0,
            }))
          : [];
        setOffers(formatted);
        setLoadingOffers(false);
      })
      .catch((err) => {
        console.error("❌ Error al cargar ofertas:", err);
        toast.error("❌ Error al cargar ofertas");
        setLoadingOffers(false);
      });
  }, []);

  const handleBuy = (pkg) => {
    if (!customerEmail) {
      toast.error("Por favor ingresa tu email antes de continuar.");
      return;
    }

    const payload = {
      ...pkg,
      email: customerEmail,
      promoCode: promoCode || null,
    };

    fetch(
      "https://l0sqt7a9v0.execute-api.us-east-1.amazonaws.com/prod/genera_pago_airalo",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.body?.checkout_url) {
          window.location.href = data.body.checkout_url;
        } else toast.error("No se pudo generar el link de pago.");
      })
      .catch(() => toast.error("Error al procesar la compra"));
  };

  const filteredDevices = devices
    .filter((d) => d.toLowerCase().includes(searchDevice.toLowerCase()))
    .slice(0, 10);

  const handleKeyDown = (e) => {
    if (!filteredDevices.length) return;

    if (e.key === "ArrowDown") {
      setHighlightIndex((prev) => (prev + 1) % filteredDevices.length);
    } else if (e.key === "ArrowUp") {
      setHighlightIndex(
        (prev) => (prev - 1 + filteredDevices.length) % filteredDevices.length
      );
    } else if (e.key === "Enter") {
      if (highlightIndex >= 0) {
        setSelectedDevice(filteredDevices[highlightIndex]);
        setSearchDevice("");
        setHighlightIndex(-1);
      }
    }
  };

  if (loadingDevices || loadingOffers)
    return <p style={{ textAlign: "center", marginTop: 20 }}>Cargando...</p>;

  return (
    <div style={{ padding: 20, maxWidth: 1200, margin: "0 auto" }}>
      <ToastContainer />

      {/* Título eSIM Global */}
      <h1
        style={{
          textAlign: "center",
          fontSize: "3rem",
          fontWeight: "900",
          color: "#3c3c3c",
          marginBottom: "15px",
        }}
      >
        🌐 eSIM Internacional Global
      </h1>

      {/* Descripción */}
      <p
        style={{
          textAlign: "center",
          fontSize: "1.25rem",
          color: "#555",
          maxWidth: "800px",
          margin: "0 auto 30px auto",
          lineHeight: "1.6",
        }}
      >
        Conéctate en múltiples países sin complicaciones. Ideal para viajeros
        frecuentes, nómadas digitales y cualquier persona que quiera datos
        móviles al instante sin cambiar de tarjeta SIM.
      </p>

      {/* Buscador de móviles */}
      <div style={{ margin: "20px 0", position: "relative" }}>
        <input
          type="text"
          placeholder="🔍 Escribe el nombre de tu móvil..."
          value={searchDevice}
          onChange={(e) => {
            setSearchDevice(e.target.value);
            setHighlightIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          style={{
            width: "100%",
            padding: "18px 22px",
            fontSize: 18,
            borderRadius: 15,
            border: "2px solid #ccc",
            outline: "none",
            fontWeight: "bold",
            color: "#333",
          }}
        />

        {searchDevice && filteredDevices.length > 0 && (
          <div
            style={{
              position: "absolute",
              top: 60,
              left: 0,
              width: "100%",
              maxHeight: 250,
              overflowY: "auto",
              background: "#fff",
              border: "1px solid #ccc",
              borderRadius: 12,
              zIndex: 999,
            }}
          >
            {filteredDevices.map((d, idx) => (
              <div
                key={idx}
                style={{
                  padding: "12px 18px",
                  cursor: "pointer",
                  backgroundColor:
                    highlightIndex === idx ? "#f0f0f0" : "#fff",
                  borderBottom: "1px solid #eee",
                  fontWeight: highlightIndex === idx ? "bold" : "normal",
                }}
                onMouseEnter={() => setHighlightIndex(idx)}
                onClick={() => {
                  setSelectedDevice(d);
                  setSearchDevice("");
                  setHighlightIndex(-1);
                }}
              >
                {d}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Listado de ofertas */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
        }}
      >
        {offers.map((pkg, idx) => (
          <div
            key={idx}
            style={{
              border: "1px solid #ddd",
              borderRadius: 16,
              padding: 20,
              cursor: "pointer",
              backgroundColor: "#fff",
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
              transition: "transform 0.2s",
            }}
            onClick={() => setSelectedOffer(pkg)}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h3 style={{ color: "#333", fontWeight: "700" }}>{pkg.title}</h3>
            <p>📶 {pkg.datos_amount || "N/A"} de datos</p>
            <p>⏱ {pkg.vality || "N/A"}</p>
            <p>💲 {formatCurrency(pkg.price_mxn, "es-MX", "MXN")}</p>
            <p> {pkg.descripcion}</p>
            {/* Botón de cobertura elegante */}
            {pkg.coverage && pkg.coverage.length > 0 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowCoverage((prev) => ({
                      ...prev,
                      [pkg.package_id]: !prev[pkg.package_id],
                    }));
                  }}
                  style={{
                    marginTop: 10,
                    padding: "8px 14px",
                    borderRadius: 20,
                    background: showCoverage[pkg.package_id]
                      ? "linear-gradient(135deg, #6a11cb, #e52e71)"
                      : "linear-gradient(135deg, #e0c3fc, #8ec5fc)",
                    color: showCoverage[pkg.package_id] ? "#fff" : "#333",
                    border: "none",
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 14px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
                  }}
                >
                  {showCoverage[pkg.package_id]
                    ? "Ocultar cobertura"
                    : "Ver cobertura"}
                </button>
                {showCoverage[pkg.package_id] && (
                  <ul
                    style={{
                      marginTop: 10,
                      paddingLeft: 20,
                      maxHeight: 150,
                      overflowY: "auto",
                    }}
                  >
                    {pkg.coverage.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* Modal de compra */}
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
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ color: "#333", fontWeight: "700" }}>
              Comprar {selectedOffer.title}
            </h3>
            <p>
              💲 {formatCurrency(selectedOffer.price_mxn, "es-MX", "MXN")}
              {selectedOffer.price_usd
                ? ` (${formatCurrency(selectedOffer.price_usd, "en-US", "USD")})`
                : ""}
            </p>

            {/* Cobertura elegante en modal */}
            {selectedOffer.coverage && selectedOffer.coverage.length > 0 && (
              <>
                <button
                  onClick={() =>
                    setShowCoverage((prev) => ({
                      ...prev,
                      [selectedOffer.package_id]: !prev[selectedOffer.package_id],
                    }))
                  }
                  style={{
                    marginTop: 10,
                    padding: "8px 14px",
                    borderRadius: 20,
                    background: showCoverage[selectedOffer.package_id]
                      ? "linear-gradient(135deg, #6a11cb, #e52e71)"
                      : "linear-gradient(135deg, #e0c3fc, #8ec5fc)",
                    color: showCoverage[selectedOffer.package_id] ? "#fff" : "#333",
                    border: "none",
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 14px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
                  }}
                >
                  {showCoverage[selectedOffer.package_id]
                    ? "Ocultar cobertura"
                    : "Ver cobertura"}
                </button>
                {showCoverage[selectedOffer.package_id] && (
                  <ul
                    style={{
                      marginTop: 10,
                      paddingLeft: 20,
                      maxHeight: 150,
                      overflowY: "auto",
                    }}
                  >
                    {selectedOffer.coverage.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                )}
              </>
            )}

            <input
              type="email"
              placeholder="Tu correo electrónico"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              style={{
                width: "100%",
                padding: 10,
                margin: "10px 0",
                borderRadius: 10,
              }}
              required
            />

            <input
              type="text"
              placeholder="Código promocional (opcional)"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              style={{
                width: "100%",
                padding: 10,
                margin: "10px 0",
                borderRadius: 10,
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <button onClick={() => setSelectedOffer(null)}>Cancelar</button>
              <button
                onClick={() => handleBuy(selectedOffer)}
                style={{ backgroundColor: "#6a11cb", color: "#fff" }}
              >
                Comprar ahora
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AiraloOffers;
