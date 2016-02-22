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

  function validateTokken(req, tokken, callback) {
    var pattern = /^STEAM_[01]:[01]:[0-9]{1,18}$/g;

    if( pattern.test(tokken) ) {
      server.conn.query(server.getAuthAdminID, [req.headers.auth], function(err, row) {
        if( err ) throw err;
        if( row[0] == null ) throw "NotAuthorized";

        var dStart = moment().startOf('month').toDate();
        var dEnd = moment().startOf('month').add(1, 'months').toDate();

        callback(tokken.replace("STEAM_0", "STEAM_1").trim(), dStart, dEnd);
      });
    }
    else if( !isNaN(parseInt(tokken)) && parseInt(tokken) > 0 ) {
      server.conn.query("SELECT * FROM `ts-x`.`site_report` WHERE `id`=?", [parseInt(tokken)], function(err, row) {
        if( err ) throw err;
        if( row[0] == null ) throw "NotAuthorized";

        var dStart = moment.unix(row[0].timestamp).subtract(1, 'hour').toDate();
        var dEnd = moment.unix(row[0].timestamp).add(1, 'hour').toDate();

        delete row[0].own_ip;
        delete row[0].own_steamid;
        delete row[0].report_date;

        callback(row[0].report_steamid.replace("STEAM_0", "STEAM_1").trim(), dStart, dEnd, row[0]);
      });
    }
    else {
      throw "InvalidParam";
    }
  }

  /**
   * @api {get} /tribunal/:id GetTribunal
   * @apiName GetTribunal
   * @apiGroup Tribunal
   * @apiPermission user
   * @apiHeader {String} auth Votre cookie de connexion.
   * @apiParam {String} id
   */
  server.get('/tribunal/:id', function (req, res, next) {
  	try {
      validateTokken(req, req.params['id'], function(tSteamID, dStart, dEnd, more) {
        return res.send({steamid: tSteamID, dStart, dEnd, data: more});
      });
    } catch ( err ) {
      return res.send(err);
    }
    next();
  });

  /**
   * @api {put} /tribunal/:id/:type/:vote VoteTribunal
   * @apiName VoteTribunal
   * @apiGroup Tribunal
   * @apiPermission user
   * @apiHeader {String} auth Votre cookie de connexion.
   * @apiParam {String} id
   * @apiParam {String} vote
   */
  server.put('/tribunal/:id/:vote', function (req, res, next) {
    try {
      validateTokken(req, req.params['id'], function(tSteamID, dStart, dEnd) {

        server.conn.query(server.getAuthSteamID, [req.headers.auth], function(err, row) {
          if( err ) throw err;
          if( row[0] == null ) throw "NotAuthorized";

          var SteamID = row[0].steamid.replace("STEAM_0", "STEAM_1");

          server.conn.query("DELETE `ts-x`.`site_report_votes` WHERE `reportid`=? AND `steamid`=?", [req.params['id'], SteamID], function(err, row) {
            server.conn.query("INSERT INTO `ts-x`.`site_report_votes`(`reportid`, `steamid`, `vote`) VALUES (?, ?, ?);", [req.params['id'], SteamID, req.params['vote']], function(err, row) {
              return res.send({redirect: "/tribunal", message: "Votre vote a bien été pris en compte, merci!"});
            });
          });
        });
      });
    } catch ( err ) {
      return res.send(err);
    }
    next();
  });
/**
 * @api {get} /tribunal/:id/:type GetTribunalInformation
 * @apiName GetTribunalInformation
 * @apiGroup Tribunal
 * @apiPermission user
 * @apiHeader {String} auth Votre cookie de connexion.
 * @apiParam {String} id
 * @apiParam {String} type
 */
server.get('/tribunal/:id/:type', function (req, res, next) {
	try {
    validateTokken(req, req.params['id'], function(tSteamID, dStart, dEnd) {
      var cache = server.cache.get( req._url.pathname);
      if( cache != undefined ) return res.send(cache);

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
