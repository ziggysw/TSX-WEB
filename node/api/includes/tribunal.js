"use strict";
var sys = require('sys')
var exec = require('child_process').exec;

exports = module.exports = function(server){
  var moment = require('moment');


/**
 * @api {put} /tribunal/:SteamID/:type GetTribunalInformation
 * @apiName GetTribunalInformation
 * @apiGroup Tribunal
 * @apiPermission user
 * @apiHeader {String} auth Votre cookie de connexion.
 * @apiParam {String} SteamID
 * @apiParam {String} type
 */
server.get('/tribunal/:SteamID/:type', function (req, res, next) {
  var cache = server.cache.get( req._url.pathname);
  if( cache != undefined ) return res.send(cache);

	try {
    if( req.params['id'] == 0 ) throw "InvalidParam";
      server.conn.query(server.getAuthAdminID, [req.headers.auth], function(err, row) {
        if( err ) throw err;
        if( row[0] == null ) throw "NotAuthorized";

        var steamID = row[0].steamid.replace("STEAM_0", "STEAM_1");
        var tSteamID = req.params['SteamID'];
        var dStart = moment().startOf('month').toDate();
        var dEnd = moment().startOf('month').add(1, 'months').toDate();
        var type = req.params['type'];
        var sqlTYPE = "";
        switch(type) {
          case "money": case "steal": case "kill":
          case "chat": case "item": case "jail":
            sqlTYPE = "`type`='"+type+"'"; break;
          case "connect":
            sqlTYPE = "`type` IN ('connect', 'disconnect', 'afk', 'noafk')"; break;
          case "buy":
            sqlTYPE = "`type` IN ('buy', 'loto')";  break;
          default: throw "InvalidType";
        }

        var sql = " SELECT `line` FROM `rp_bigdata` ";
        sql += "    WHERE `date`>? AND `date`<? AND "+sqlTYPE+" AND (`steamid`=? OR `target`=?) ORDER BY `date` DESC;";

        server.conn.query(sql, [dStart, dEnd, tSteamID, tSteamID], function( err, row ) {
          if( err ) throw err;

          var obj = new Array();
          for(var i=0; i<row.length; i++) {
            obj.push(row[i].line);
          }
          server.cache.set(req._url.pathname, obj);
          return res.send(obj);
        });
      });
    } catch ( err ) {
      return res.send(err);
    }
  next();
});

};
