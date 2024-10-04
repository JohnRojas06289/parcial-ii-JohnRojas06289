const { generateToken } = require('../utils/tokenUtils');
const tokenModel = require('../models/tokenModel');

const users = {
  "admin@admin.com": {
    password: "admin"
  }
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (users[email] && users[email].password === password) {
    const token = generateToken();
    tokenModel.storeToken(token, email);
    return res.json({ token });
  }

  return res.status(401).send('Credenciales incorrectas');
};
