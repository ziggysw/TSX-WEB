"use strict";
exports = module.exports = function(server){
  var ERR = require('node-restify-errors');
  var moment = require('moment');

/**
 * @api {get} /connect/auth GetAuth
 * @apiName GetAuth
 * @apiGroup Connection
 * @apiHeader {String} auth Votre cookie de connexion.
 */
/*

*/
server.get('/connect/auth', function (req, res, next) {
  server.conn.query(server.getAuthSteamID, [req.headers.auth], function(err, row) {
    if( row.length == 0 ) throw "NotAuthorized";
    var uid = row[0].user_id;
    return res.send(req.headers.auth);
  });
  next();
});

/**
 * @api {get} /connect/check GetCheckConnect
 * @apiName GetCheckConnect
 * @apiGroup Connection
 * @apiHeader {String} auth Votre cookie de connexion.
 */
/*

*/
server.get('/connect/check', function (req, res, next) {
  server.conn.query(server.getAuthSteamID, [req.headers.auth], function(err, row) {
    if( row.length == 0 ) throw "NotAuthorized";
    var uid = row[0].user_id;
    return res.send("ok");
  });
  next();
});
};
