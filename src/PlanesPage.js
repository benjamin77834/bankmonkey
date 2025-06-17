import React, { useEffect, useState } from "react";
import axios from "axios";

import React, { useEffect, useState } from "react";
import axios from "axios";

function PlanesPage() {
  const [planes, setPlanes] = useState([]);

  useEffect(() => {
    // Cargar datos desde la API
   // axios.get("https://api.ejemplo.com/planes")
   const data = { idvendedor: id_vendedor, app: '1', id: '140' };
   const apiUrl = process.env.REACT_APP_API_URL;
   const res = await axios.post(`${apiUrl}/prod/ofertasapp`, data);
      .then((res) => setPlanes(res.data))
      .catch((err) => console.error("Error al cargar datos de planes:", err));
  }, []);

  return (
    <div className="container mx-auto px-4 py-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {planes.map((plan, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{plan.nombre}</h2>
          <p className="text-gray-600 mb-1">{plan.descripcion}</p>
          <p className="text-green-600 font-semibold">{plan.precio}</p>
        </div>
      ))}
    </div>
  );
}

export default PlanesPage;

