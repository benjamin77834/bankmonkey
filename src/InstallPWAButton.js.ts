import { useEffect, useState } from 'react';

export default function InstallPWAButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBtn(true);
    });
  }, []);

  const handleInstall = () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => setShowBtn(false));
  };

  if (!showBtn) return null;

  return (
    <button
      onClick={handleInstall}
      style={{ position: 'fixed', bottom: '20px', right: '20px', padding: '10px 20px', background: '#2f0f13', color: '#fff', borderRadius: '8px', zIndex: 1000 }}
    >
      Instalar App
    </button>
  );
}
