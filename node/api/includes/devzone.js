"use strict";
exports = module.exports = function(server){
  var ERR = require('node-restify-errors');
  var moment = require('moment');
  var dz = require('./user.devzone.js');
  /**
   * @api {get} /devzone/user GetUser
   * @apiName GetUser
   * @apiGroup DevZone
   * @apiHeader {String} auth Votre cookie de connexion.
   */
  server.get('/devzone/user', function (req, res, next) {
    dz.user(server, req.headers.auth,function(user){
      return res.send({
        username:    user.username,
        uid:         user.uid,
        gid:         user.gid,
        accesslevel: user.accesslevel,
        accessname:  user.accessname
      });
    });
    next();
  });
  
};
