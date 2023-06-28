const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const microservices = require('./microservices'); // Importer le routeur microservices

const app = express();

// Utiliser body-parser pour analyser les données JSON
app.use(bodyParser.json());

// Autoriser toutes les requêtes provenant de http://localhost:3000
app.use(cors({ origin: 'http://127.0.0.1:3000' }));

// Utiliser le routeur microservices
app.use('/api', microservices);

// Démarrer le serveur
app.listen(5000, () => {
  console.log('Serveur Express en écoute sur le port 5000');
});
