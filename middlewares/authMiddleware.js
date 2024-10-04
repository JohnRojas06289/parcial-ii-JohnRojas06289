const tokenModel = require('../models/tokenModel');

exports.authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send('Token requerido');
  }

  if (!tokenModel.isValidToken(token)) {
    return res.status(403).send('Token inválido o expirado');
  }

  next();
};
