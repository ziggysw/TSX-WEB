"use strict";
exports = module.exports = function(server) {
  var request = require('request');
  var ERR = require('node-restify-errors');
  var moment = require('moment');
  var TwitchClient = require("node-twitchtv");
  var client = new TwitchClient({ client_id: "egfk3bhshu398at0nyjh34ehhzoxk19", scope: "user_read, channel_read_"});

/**
 * @api {get} /live/stream GetLiveStream
 * @apiName GetLiveStream
 * @apiGroup Live
 */
server.get('/live/stream', function (req, res, next) {
   return next();
   try {
      var cache = server.cache.get( req._url.pathname);
      if( cache != undefined ) return res.send(cache);
      var broadcaster = ["moyna54", "kossolax", "hipiman", "messorem_tsx"];
      var obj = new Array();
      var done = 0;

      for(var i = 0; i<=broadcaster.length; i++ ) {
        client.streams({ channel: broadcaster[i] }, cb1);
      }

      function cb1(err, response) {
        if( response.stream ) {
          obj.push( {name: response.stream.channel.status, username: response.stream.channel.display_name, url: response.stream.channel.url, viewer: response.stream.viewers} )
        }
        done++;
        cb2();
      }
      function cb2() {
        if( done == broadcaster.length ) {
          server.cache.set( req._url.pathname, obj);
          return res.send(obj);
        }
      }
  } catch ( err ) {
    return res.send(obj);
  }
  next();
});
/**
 * @api {get} /live/positions GetLivePosition
 * @apiName GetLivePosition
 * @apiGroup Live
 */
server.get('/live/positions', function (req, res, next) {
  var cache = server.cache.get( req._url.pathname);
  if( cache != undefined ) return res.send(cache);

  var wednesday = moment().startOf('week').add(3, 'days').add(18, 'hours').add(30, 'minutes');
  var friday = moment().startOf('week').add(5, 'days').add(21, 'hours').add(30, 'minutes');
  var now = moment();
  var limitation = moment().add(35, 'minutes');
  var matched = false;

  if( (now < wednesday && limitation > wednesday) || ( now < friday && limitation > friday ) ) {
    var data = new Array();
    server.cache.set( req._url.pathname, data);
    return res.send(data);
  }

  request("http://178.32.42.113:27015/njs/location", function (error, response, body) {
    if( error ) return res.send(new ERR.NotFoundError("ServerNotFound"));

    body = JSON.parse(body);
    server.cache.set( req._url.pathname, body, 0.1);
    res.send(body);
    return next();
  });
	next();
});
/**
 * @api {get} /live/connected/:steamid GetLiveConnexion
 * @apiName GetLiveConnexion
 * @apiParam {String} steamid Un identifiant unique correspondant au steamid.
 * @apiGroup Live
 */
server.get('/live/connected/:id', function (req, res, next) {
  var cache = server.cache.get( req._url.pathname);
  if( cache != undefined ) return res.send(cache);

  var steamid = req.params['id'].trim();
  var pattern = /^STEAM_1:[01]:[0-9]{1,18}$/g;
  if( !pattern.test(steamid) ) { return res.send(new ERR.BadRequestError("InvalidParam")); }


  request("http://178.32.42.113:27015/njs/connected/"+steamid, function (error, response, body) {
    if( error ) return res.send(new ERR.NotFoundError("ServerNotFound"));
    server.cache.set( req._url.pathname, body, 1);
    return res.send(body);
  });
	next();
});
/**
 * @api {get} /live/stats GetServerStats
 * @apiName GetServerStats
 * @apiGroup Live
 */
server.get('/live/stats', function (req, res, next) {
  var cache = server.cache.get( req._url.pathname);
  if( cache != undefined ) return res.send(cache);

  function cb(obj) {
    if( Object.keys(obj).length == 4 ) {
      server.cache.set( req._url.pathname, obj);
      return res.send(obj);
    }
  }

  var obj = new Object();
  request("http://178.32.42.113:27015/njs/time", function (error, response, body) {
    if( error ) return res.send(new ERR.NotFoundError("ServerNotFound"));
    try {
      obj.time = JSON.parse(body);
    } catch ( r ) {
      obj.time = new Object();
      obj.time.m = obj.time.h = obj.time.t = 0;
    }
    cb(obj);
  });

  server.conn.query("SELECT `type`, R.`steamid`, `name` FROM `rp_rank` R INNER JOIN `rp_users` U ON U.`steamid`=R.`steamid` WHERE `rank`=1", function(err, rows) {
    obj.stats = new Object();

    var tmp = { "pvp": "PvP", "sell": "Vente", "buy": "Achat", "money": "Richesse", "age": "Ancienneté", "parrain": "Parrainage","vital": "Vitalité", "success": "Succès", "freekill": "Free-kill", "general": "Général", "artisan": "Artisanat", "quest": "Quêtes" };
    for(var i=0; i<rows.length; i++)
      obj.stats[rows[i].type] = {steamid: rows[i].steamid, name: rows[i].name, type: tmp[rows[i].type]};
    cb(obj);
  });

  var sql = "SELECT G.`id` as `bunker`, G.`name` as `bunkerNom`, U.`steamid` as `villa`, U.`name` AS `villaNom` ";
  sql += "FROM `rp_servers` S INNER JOIN `rp_groups` G ON G.`id`=S.`bunkerCap` INNER JOIN `rp_users` U ON U.`steamid`=S.`villaOwner` WHERE S.`id`=1";

  server.conn.query(sql , function(err, rows) {
    obj.pvp = new Object();
    obj.pvp.villa = {id: rows[0].villa, nom: rows[0].villaNom, type: "La villa" };
    obj.pvp.bunker = {id: rows[0].bunker, nom: rows[0].bunkerNom, type: "Le bunker"};

    cb(obj);
  });

  server.conn.query("SELECT 100000+COUNT(`id`)*420 as cagnotte FROM `rp_loto`;" , function(err, rows) {
    obj.cagnotte = new Array();
    obj.cagnotte.push(rows[0].cagnotte/100.0*70.0);
    obj.cagnotte.push(rows[0].cagnotte/100.0*20.0);
    obj.cagnotte.push(rows[0].cagnotte/100.0*10.0);
    cb(obj);
  });

	next();
});
/**
 * @api {get} /live/stats/:ip/:port GetServerInformations
 * @apiName GetServerInformations
 * @apiParam {String} IP
 * @apiParam {Integer} port
 * @apiGroup Live
 */
server.get('/live/stats/:ip/:port', function(req, res, next) {
  try {
    server.conn.query("SELECT CONCAT(`current`, '/', `maxplayers`) as p FROM `ts-x`.`adm_serv` WHERE `ip`=? AND `port`=?;", [req.params["ip"],req.params["port"]], function(err, row) {
      if( err || row.length == 0) return res.send(new ERR.NotFoundError("ServerNotFound"));
      return res.send(row[0].p);
    });
  } catch ( err ) {
      return res.send(err);
  }
next();

});
/**
 * @api {get} /live/sondage/:steamid HasVoted
 * @apiName HasVoted
 * @apiParam {Steamid} steamid
 * @apiGroup Live
 */
server.get('/live/sondage/:steamid', function(req, res, next) {
  try {
    var steamid = req.params["steamid"].replace("STEAM_1", "STEAM_0");
    if( steamid == "notset" ) return res.send("2");

    server.conn.query("SELECT * FROM `ts-x`.`site_sondage` WHERE `steamid`=? LIMIT 1;", [steamid], function(err, row) {
      if( err ) return res.send("2");
      if( row.length == 0) return res.send("0");
      return res.send("1");
    });
  } catch ( err ) {
      return res.send("2");
  }
next();

});


/**
 * @api {get} /live/update GetLastUpdate
 * @apiName GetLastUpdate
 * @apiGroup Live
 */
server.get('/live/update', function (req, res, next) {
  var cache = server.cache.get( req._url.pathname);
  if( cache != undefined ) return res.send(cache);

  var data = new Array();
  var done=0;
  var subRequest=0;
  var subRequestDone=0;
  function output() {
    subRequestDone++;
    if( done == 2 && subRequestDone == subRequest) {
      data.sort(function(a,b){  return new Date(b.date) - new Date(a.date); });
      server.cache.set( req._url.pathname, data, 300);
      return res.send(data);
    }
  }
  function getFileName(str) {
    return str.split('\\').pop().split('/').pop();
  }

  function traitement(error, response, body) {
    body = JSON.parse(body);
    body.forEach(function (i) {
      request({url: i.url+"?access_token=e13c5d9ec7c00ea93d3e94fa5130886cc95df92f", headers: {'User-Agent': 'kossolax'}}, function (error, response, body) {
        body = JSON.parse(body);

        var file = "";
        var change=0;
        body.files.forEach(function (j) {
          change += j.changes;
          file += getFileName(j.filename)+", ";
        });
        file = file.substring(0, file.length - 2);

        var obj = { author: i.author.login, date: i.commit.author.date, message: i.commit.message, files: file, changes: change };
        data.push(obj);
        output();
      });
    });
    done++;
    subRequest += body.length;
  }

  request({url: "https://api.github.com/repos/TS-X/TSX-RP/commits?access_token=e13c5d9ec7c00ea93d3e94fa5130886cc95df92f", headers: {'User-Agent': 'kossolax'}}, traitement);
  request({url: "https://api.github.com/repos/kossolax/tsx.eu/commits?access_token=e13c5d9ec7c00ea93d3e94fa5130886cc95df92f", headers: {'User-Agent': 'kossolax'}}, traitement);

  next();
});


};
