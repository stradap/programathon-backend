'use strict';

var app = require('../../server/server');

module.exports = function(Usuario) {
  Usuario.login = function(email, password, nombreComercial, pais, cb) {
    var pyme = app.models.pyme;
    var us = false;
    var pm = false;
    // eslint-disable-next-line
    Usuario.find({where: {usuario: email, clave: password }}, function(err, user) {
      if (user.length > 0) {
        us = true;
      } else {
        us = false;
      }
    });
    // eslint-disable-next-line max-len
    pyme.find({where: {nombrecomercio: email}}, function(err, py) {
      if (py.length > 0) {
        pm = true;
      } else {
        pm = false;
      }
    });
    if (us && pm) {
      cb(null, 'user logged');
    } else {
      cb(null, 'user password or username wrong');
    }
  };
  Usuario.remoteMethod(
    'login',
    {
      http: {path: '/login', verb: 'post'},
      accepts: [
          {arg: 'email', type: 'string', required: true},
          {arg: 'password', type: 'string', required: true}],
      returns: {arg: 'status', type: 'string'},
    }
  );
};
