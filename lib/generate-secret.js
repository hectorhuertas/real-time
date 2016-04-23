const crypto = require('crypto');

function generateSecret() {
  return crypto.randomBytes(10).toString('hex');
}

module.exports = generateSecret;
