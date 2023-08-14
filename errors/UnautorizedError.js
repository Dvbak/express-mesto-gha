const { HTTP_STATUS_UNAUTORIZED } = require('http2').constants;

class UnautorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_UNAUTORIZED;
  }
}

module.exports = UnautorizedError;
