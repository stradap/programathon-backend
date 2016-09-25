'use strict';

module.exports = function(Usuario) {
  Usuario.login = function(email, password, cb) {
    cb(null, 'Greetings... ' + email);
  };
  Usuario.remoteMethod(
    'login',
    {
      http: {path: '/login', verb: 'post'},
      accepts: [
          {arg: 'email', type: 'string'},
          {arg: 'password', type: 'string'}],
      returns: {arg: 'status', type: 'string'},
    }
  );
};
