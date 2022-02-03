const Employee = require('../models/userModel');

exports.showAllEmployees = (req, res, next) => {
    Employee.findAll()
        .then(employees => res.status(200).json(employees))
        .catch(error => res.status(400).json({ error }));
};

exports.findOneEmployee = (req, res, next) => {
    Employee.findOne({ where: { id: req.params.id } })
        .then((thisEmployee) => {
            if (thisEmployee !== null) {
                res.status(200).json(thisEmployee);
            } else {
                res.status(401).json({ error: "User non trouvé" });
            }

        });
}