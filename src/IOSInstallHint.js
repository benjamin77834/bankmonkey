import { useState, useEffect } from 'react';

export default function IOSInstallHint() {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const ua = window.navigator.userAgent;
    if (/iPhone|iPad|iPod/.test(ua) && !window.MSStream) {
      setIsIOS(true);
    }
  }, []);

  if (!isIOS) return null;

  return (
    <div style={{ position: 'fixed', bottom: '20px', left: '20px', right: '20px', padding: '15px', background: '#fff3cd', border: '1px solid #ffeeba', borderRadius: '8px', zIndex: 1000 }}>
      <p>Para instalar la app en tu iPhone:</p>
      <ol>
        <li>Toca el botón <strong>Compartir</strong> en Safari</li>
        <li>Selecciona <strong>Agregar a pantalla de inicio</strong></li>
      </ol>
    </div>
  );
}
