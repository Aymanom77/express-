const express = require('express');
const app = express();
const port = 3000;

// Middleware personnalisé pour vérifier l'heure de la demande
const checkHours = (req, res, next) => {
    const date = new Date();
    const dayOfWeek = date.getDay(); // Dimanche = 0, Lundi = 1, ..., Samedi = 6
    const hourOfDay = date.getHours();

    if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 17) {
        next(); // Poursuivre la requête si c'est pendant les heures ouvrables
    } else {
        res.send('Désolé, l\'application est disponible uniquement pendant les heures ouvrables.');
    }
};

// Utilisation du middleware pour toutes les routes
app.use(checkHours);

// Servir les fichiers statiques depuis le dossier public
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/services', (req, res) => {
    res.sendFile(__dirname + '/public/services.html');
});

app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/public/contact.html');
});

// Serveur écoutant sur le port 3000
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
