'use strict';

var app = require('../../server/server');

module.exports = function(Usuario) {
  Usuario.login = function(email, password, nombreComercial, pais, cb) {
    var pyme = app.models.pyme;
    var estado = app.models.estado;
    var estados = [];
    var us = false;
    var pm = false;
    var ps = false;
    var es = false;
    var usuarioid = 0;
    // usuario
    // eslint-disable-next-line
    Usuario.find({where: {usuario: email, clave: password }}, function(err, user) {
      if (user.length > 0) {
        us = true;
        usuarioid = user.id;
      } else {
        us = false;
      }
    });

    // eslint-disable-next-line
    estado.find({where: {paisid: pais}}, function(err, state) {
      if (py.length > 0) {
        estados = state;
      } else {
        pm = false;
      }
    });
    // pyme
    // eslint-disable-next-line max-len
    pyme.find({where: {nombrecomercio: nombreComercial, usuarioid: usuarioid}}, function(err, py) {
      estados.forEach(function(value, index) {
        if (value == py.estadoid) ps = true;
      });
      if (py.length > 0) {
        pm = true;
      } else {
        pm = false;
      }
    });
    // eslint-disable-next-line max-len

    if (us && pm && ps) {
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
