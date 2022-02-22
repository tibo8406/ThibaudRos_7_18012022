const multer = require('multer');
const path = require('path');
const moment = require('moment');


const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const employeeObject = JSON.parse(req.body.employee);
        const extension = MIME_TYPES[file.mimetype];
        const date = moment(); // utilisation de moment pour nommer le fichier avec la date
        callback(null, date.format(`YYYY-MM-DD_HH-mm-ss_PP_[${employeeObject.id}.${extension}]`)) //composition du nom de fichier
    }
});

module.exports = multer({ storage }).single('image');