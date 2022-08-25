const boom = require('@hapi/boom');

function validatorHandler(schema, property) {
  return function (req, res, next) {
    //el req[property] se usa de forma dinamica porque dependiendo el tipo de
    // request puede ser req.body o req.params o req.query
    //abortEarly: false, se usa para que no se detenga en el primer error que encuentre
    const { error } = schema.validate(req[property], { abortEarly: false });
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  };
}

module.exports = validatorHandler;
