const express = require('express');
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const postsRoutes = require('./routes/postsRoutes');
const Db = require('./db/db');
const { isLoggedIn } = require('./middlewares/authMiddleware');
const app = express();
const path = require('path');


app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images'))); // configure le serveur pour renvoyer des fichiers statiques pour une route donnée

try {
    Db.authenticate();
    console.log('Connecté à la base de données MySql!');
    Db.sync();
    Db.query("SHOW TABLES;").then(([results, metadata]) => {
        console.log(results);
    })
} catch (error) {
    console.error('Impossible de se connecter, erreur suivante :', error);
}
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // autorisation toute origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // autorise headers
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // autorisation  method
    next();
});
app.use('/api/auth', userRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/posts', isLoggedIn, postsRoutes);




module.exports = app;