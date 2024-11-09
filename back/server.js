// server.js
import 'dotenv/config'; // Pour charger les variables d'environnement
import express from 'express';
import cors from 'cors';
import router from './api/routes.js';

const app = express();
const PORT = 5000;

// Configuration CORS
app.use(cors());

// Utiliser les routes API
app.use(router);

// Servir les fichiers statiques
app.use(express.static('public'));

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur API lancé sur http://localhost:${PORT}`);
});
