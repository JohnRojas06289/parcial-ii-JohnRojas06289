const tokens = {};

exports.storeToken = (token, email) => {
  tokens[token] = { email, expires: Date.now() + 3600000 };
};

exports.isValidToken = (token) => {
  const tokenData = tokens[token];
  if (!tokenData) return false;

  if (tokenData.expires < Date.now()) {
    delete tokens[token];
    return false;
  }

  return true;
};

exports.removeExpiredTokens = () => {
  const now = Date.now();
  for (const token in tokens) {
    if (tokens[token].expires < now) {
      delete tokens[token];
    }
  }
};