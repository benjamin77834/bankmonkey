import React from "react";

export default function NotificacionCorreo({ clienteEmail }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all hover:scale-[1.01]">
        
        {/* Header */}
        <div className="flex justify-center bg-gray-900 p-6">
          <img
            src="https://recargas.monkeyfon.com/chango/img/MONKEY%20LOGO.png"
            alt="MonkeyPhone Logo"
            className="w-36"
          />
        </div>

        {/* Content */}
        <div className="p-8 text-center">
          <div className="flex justify-center mb-4">
     
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            ¡Tu correo está en camino!
          </h1>
          <p className="text-gray-600 mb-4">
            Hemos enviado los detalles de tu <b>eSIM</b> a tu correo
          </p>
          <p className="text-lg font-semibold text-gray-900 bg-gray-100 px-4 py-2 rounded-lg inline-block">
            {clienteEmail}
          </p>
          <p className="text-sm text-gray-500 mt-6">
            Revisa tu bandeja de entrada (y también tu carpeta de spam).
          </p>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 text-center p-5 text-xs text-gray-500">
          MonkeyPhone · Conectando el mundo contigo 🌍  
          <br />
          <a
            href="mailto:soporte@monkeyphone.net"
            className="underline hover:text-gray-700"
          >
            soporte@monkeyphone.net
          </a>
        </div>
      </div>
    </div>
  );
}

