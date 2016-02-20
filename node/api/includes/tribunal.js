"use strict";
var sys = require('sys')
var exec = require('child_process').exec;

exports = module.exports = function(server){
  var moment = require('moment');
  function lzw_encode(s) {
    var dict = {};
    var data = (s + "").split("");
    var out = [];
    var currChar;
    var phrase = data[0];
    var code = 256;
    for (var i=1; i<data.length; i++) {
        currChar=data[i];
        if (dict[phrase + currChar] != null) {
            phrase += currChar;
        }
        else {
            out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
            dict[phrase + currChar] = code;
            code++;
            phrase=currChar;
        }
    }
    out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
    for (var i=0; i<out.length; i++) {
        out[i] = String.fromCharCode(out[i]);
    }
    return out.join("");
  }

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
          return res.send(data);
        });
      });
    } catch ( err ) {
      return res.send(err);
    }
  next();
});

};
