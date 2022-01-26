const jwt = require('jsonwebtoken');

exports.isLoggedIn = (req, res, next) => {
    try {
        if (req.method !== 'OPTIONS') {
            const token = req.headers.authorization.split(' ')[1]; // on extrait le token de authorization et supprime le premier element
            const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET); // on decodee le token
            req.token = decodedToken; // on stocke le token dans la req
        }
        next();

    } catch (error) {
        res.status(401).json({ error: error | 'Requete non autorisée' });
    }
}