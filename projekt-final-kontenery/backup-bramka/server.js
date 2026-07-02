const express = require('express');
const app = express();
// Port będzie pobierany ze zmiennej środowiskowej systemu kontenera
const port = process.env.PORT_BRAMKI || 3000; 

app.get('/', (req, res) => {
  res.send('<h1>Bramka Płatnicza PayGate: Status zabezpieczeń OK!</h1>');
});

app.listen(port, () => {
  console.log(`Bramka płatnicza działa na porcie ${port}`);
});
