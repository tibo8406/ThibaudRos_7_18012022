const express = require('express');
const userRoutes = require('./routes/user');
const employeeRoutes = require('./routes/employee');
const Db = require('./db/db');
const employeeSchema = require('./models/User');
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
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // origine qui à le droit d'écceder = tout le monde *
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // autorise certain entete
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // autorise certaine method
    next();
});
app.use('/api/auth', userRoutes);
app.use('/api/employees', employeeRoutes);



module.exports = app;