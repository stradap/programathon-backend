'use strict';

var app = require('../../server/server');
var valid;
module.exports = function(Usuario) {
  var callback = function(a, b, c) {
    console.log(a);

    console.log(b);

    console.log(c);
    c(null, 'user logged');
  };
  Usuario.login = function(email, password, pais, nombreComercial, cb) {
    var pyme = app.models.Pyme;
    var estado = app.models.Estado;
    var estados = [];
    var id;
    // eslint-disable-next-line
    Usuario.find({where: {usuario: email, clave: password }}, function(err, user) {
      if (user.length > 0) {
        id = user[0].id;
      }
    });
    // eslint-disable-next-line
    estado.find({where: {paisid: pais}}, function(err, state) {
      if (state.length > 0) {
        estados = state;
      }
    });
    // eslint-disable-next-line max-len
    var data = pyme.find({where: {nombrecomercio: nombreComercial, usuarioid: id}}, function(err, py) {
      if (py.length == 0) return cb(null, 'user eror');
      if (!err) {
        estados.forEach(function(value) {
          if (value.id === py[0].estadoid) {
            return cb(null, 'user logged');
          }
        });
      }
    });
  };
  Usuario.remoteMethod(
    'login',
    {
      http: {path: '/login', verb: 'post'},
      accepts: [
          {arg: 'email', type: 'string', required: true},
          {arg: 'password', type: 'string', required: true},
          {arg: 'pais', type: 'number', required: true},
          {arg: 'nombreComercial', type: 'string', required: true}],
      returns: {arg: 'status', type: 'string'},
    }
  );
};
