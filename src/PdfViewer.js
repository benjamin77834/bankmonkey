import { useEffect, useState } from 'react';

function PdfViewer({ fileKey }) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (!fileKey) return;

    const fetchUrl = async () => {
      try {
        const response = await fetch('https://l0sqt7a9v0.execute-api.us-east-1.amazonaws.com/prod/preurl', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key: fileKey })
        });

        const data = await response.json();
        setUrl(data.body.url);
      } catch (error) {
        console.error('Error al obtener la URL del PDF:', error);
      }
    };

    fetchUrl();
  }, [fileKey]);

  if (!url) return <p>Cargando PDF...</p>;

  return (
    <iframe
      src={url}
      width="100%"
      height="800px"
      style={{ border: '1px solid #ccc', borderRadius: '8px' }}
      title="PDF Viewer"
    />
  );
}

export default PdfViewer;
