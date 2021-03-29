'use strict';

module.exports = (req, res, next) => {
  if (req.query.name) {
    console.log('__query parameter__: ', req.query);
    next();
  } else {
    next('error');
  }
};