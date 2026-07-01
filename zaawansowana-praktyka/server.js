const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('<h1>Serwis Analityczny Działa i jest bezpieczny!</h1>');
});

app.listen(port, () => {
  console.log(`Aplikacja uruchomiona na porcie ${port}`);
});
