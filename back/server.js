import express from "express";
import router from "./api/routes.js"; // Assurez-vous d'importer correctement le fichier de routes
import cors from "cors";

const app = express();
app.use(cors());

// Middleware pour parser le JSON
app.use(express.json());

// Routes
app.use("/api", router);

app.use(express.static("public"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur API lancé sur http://localhost:${PORT}`);
});
