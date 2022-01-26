const express = require('express');
const userRoutes = require('./routes/user');
const Db = require('./db/db');
const app = express();

app.use(express.json());

try {
    Db.authenticate();
    console.log('Connecté à la base de données MySQL!');
    Db.query("SHOW TABLES;").then(([results, metadata]) => {
        console.log(results);
    })
} catch (error) {
    console.error('Impossible de se connecter, erreur suivante :', error);
}
app.use('/api/auth', userRoutes);



module.exports = app;