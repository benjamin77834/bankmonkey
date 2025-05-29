import Tesseract from 'tesseract.js';

const handleOCR = async (image) => {
  const { data: { text } } = await Tesseract.recognize(image, 'eng');
  const match = text.match(/\d{14,20}/); // Busca patrón de IMEI
  if (match) {
    const detectedIMEI = match[0];
    setimei(detectedIMEI);
    alert(`IMEI detectado con OCR: ${detectedIMEI}`);
  } else {
    alert("No se detectó ningún IMEI en el texto.");
  }
};

