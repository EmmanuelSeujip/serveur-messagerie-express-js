import express from 'express';
import apiRouter from './apiRouter.js';

var app = express();

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('Hello World!');
});
// Permet de lire le JSON envoyé dans le corps de la requête
app.use(express.json());

// Permet de lire les données envoyées via des formulaires (si besoin)
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});