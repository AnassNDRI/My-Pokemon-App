const express = require("express");
const path = require("path");
const app = express();

// Servir les fichiers statiques de l'application Angular depuis le dossier 'frontend/dist/mm-consulting'
app.use(express.static(path.join(__dirname, "dist/ng-pokemon-app")));

// Rediriger toutes les requêtes vers le fichier index.html de l'application Angular
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist/ng-pokemon-app/index.html"));
});

// Démarrer l'application sur le port défini par Heroku ou sur le port 8080 en local
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
