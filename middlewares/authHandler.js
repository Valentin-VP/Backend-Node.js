const boom = require('@hapi/boom');

const { config } = require('../config/config');

function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];
  if (apiKey === config.apiKey) {
    return next();
  } else {
    next(boom.unauthorized('Invalid API Key'));
  }
}

function checkAdminRole(req, res, next) {
  console.log(req.user);
  const { user } = req;
  if (user.role === 'admin') {
    next();
  } else {
    next(boom.unauthorized());
  }
}

function checkRoles(...roles) {
  return (req, res, next) => {
    console.log(req.user);
    console.log(roles);
    const { user } = req;
    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.unauthorized());
    }
  };
}

module.exports = { checkApiKey, checkAdminRole, checkRoles };
