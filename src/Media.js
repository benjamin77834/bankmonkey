import { useEffect, useState } from 'react';

function MediaPlay({ fileKey, type = 'video' }) {
  const [url, setUrl] = useState(null);
  //console.log(filekey);
  useEffect(() => {
    if (!fileKey) return;

    const fetchUrl = async () => {
      try {
        const response = await fetch('https://l0sqt7a9v0.execute-api.us-east-1.amazonaws.com/prod/preurl', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ key: fileKey })
        });

        const data = await response.json();
  //      console.log(data.body.url)
        setUrl(data.body.url);
//        console.log(url)


  
  //      console.log(data);
//        setUrl(data.url);
  //      console.log(data.url)
      } catch (error) {
        console.error('Error al obtener la URL firmada:', error);
      }
    };

    fetchUrl();
  }, [fileKey]);

  if (!url) return <p>Cargando...</p>;

  return type === 'video' ? (
    <video src={url} controls width="600" height="360" />
  ) : (
    <audio src={url} controls />
  );
}

export default MediaPlay;


