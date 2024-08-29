// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Endpoint pour traiter les soumissions de formulaire
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Traitement du formulaire (par exemple, envoi d'email)
    console.log(`Nom: ${name}, Email: ${email}, Message: ${message}`);

    res.status(200).send({ success: true, message: 'Formulaire reçu avec succès' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Le serveur tourne sur le port ${PORT}`);
});
