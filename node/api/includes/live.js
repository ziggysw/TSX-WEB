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
    return res.send(body);
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

    var tmp = { "pvp": "PvP", "sell": "Vente", "buy": "Achat", "money": "Richesse", "age": "Ancienneté", "parrain": "Parrainage","vital": "Vitalité", "success": "Succès", "freekill": "Free-kill", "general": "Général", "artisan": "Artisana" };
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

};
