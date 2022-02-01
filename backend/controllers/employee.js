const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Employee = require('../models/User');

exports.showAllEmployees = (req, res, next) => {
    Employee.findAll()
        .then(employees => res.status(200).json(employees))
        .catch(error => res.status(400).json({ error }));
};