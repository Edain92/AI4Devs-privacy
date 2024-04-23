const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Objeto para almacenar los mensajes
const messages = {
  anonymized: {},
  deanonymized: {}
};

app.post('/anonymize', (req, res) => {
  try {
    const message = req.body.message;
    // Lógica para anonimizar el mensaje
    const anonymizedMessage = anonymizeMessage(message);
    // Almacenar el mensaje anonimizado en el objeto messages
    messages.anonymized[anonymizedMessage] = message;
    res.json({ anonymizedMessage });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/deanonymize', (req, res) => {
  try {
    const message = req.body.message;
    // Lógica para re-identificar el mensaje
    const deanonymizedMessage = deanonymizeMessage(message);
    // Almacenar el mensaje deanomizado en el objeto messages
    messages.deanonymized[deanonymizedMessage] = message;
    res.json({ deanonymizedMessage });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

function anonymizeMessage(message) {
  // Identificar y reemplazar correos electrónicos
  const emailPattern = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
  message = message.replace(emailPattern, 'data-token-email');

  // Identificar y reemplazar números de teléfono
  // Este patrón es para números de teléfono internacionales y puede necesitar ajustes
  const phonePattern = /(\+?\d{1,4}[\s-]?\(?\d{1,3}\)?[\s-]?\d{1,4}[\s-]?\d{1,4}[\s-]?\d{1,4})/g;
  message = message.replace(phonePattern, 'data-token-phone');

  // Identificar y reemplazar fechas
  // Este patrón es para formatos de fecha comunes y puede necesitar ajustes
  const datePattern = /(\b\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4}\b)/g;
  message = message.replace(datePattern, 'data-token-date');

  return message;
}

function deanonymizeMessage(message) {
  // Lógica para re-identificar el mensaje
  return message; // Por ahora, simplemente devolvemos el mismo mensaje
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
