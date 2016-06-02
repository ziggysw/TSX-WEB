"use strict";
exports = module.exports = function(server){
  var ERR = require('node-restify-errors');
  var request = require('request');
  var priceList = require('../market.json');
  var fs = require('fs');
  var crypto = require('crypto');
  var Steam = require('steam');
  var SteamWebLogOn = require('steam-weblogon');
  var getSteamAPIKey = require('steam-web-api-key');
  var SteamTradeOffers = require('steam-tradeoffers');
  var SteamTotp = require('steam-totp');
  var http = require('sync-request');
  var logOnOptions = {account_name: server.getSteamLink.username, password: server.getSteamLink.password};

  var steamClient = new Steam.SteamClient();
  var steamUser = new Steam.SteamUser(steamClient);
  var steamFriends = new Steam.SteamFriends(steamClient);
  var steamWebLogOn = new SteamWebLogOn(steamClient, steamUser);
  var offers = new SteamTradeOffers();

  steamClient.connect();
  steamClient.on('connected', function() {
    logOnOptions.two_factor_code = SteamTotp.generateAuthCode(server.getSteamLink.auth);
    steamUser.logOn(logOnOptions);
  });
  steamClient.on('logOnResponse', function(logonResp) {
    if (logonResp.eresult === Steam.EResult.OK) {
      console.log('Steam: Logged in!');
      steamFriends.setPersonaState(Steam.EPersonaState.Online);
      steamWebLogOn.webLogOn(function(sessionID, newCookie) {
        getSteamAPIKey({ sessionID: sessionID, webCookie: newCookie }, function(err, APIKey) {
          offers.setup({ sessionID: sessionID, webCookie: newCookie, APIKey: APIKey });
          handleOffers();
        });
      });
    }
  });
  steamUser.on('tradeOffers', function(number) {
    if (number > 0) { handleOffers(); }
  });

  function handleOffers() {
    offers.getOffers({get_received_offers: 1, active_only: 1, time_historical_cutoff: Math.round(Date.now() / 1000), get_descriptions: 1}, function(error, body) {
      console.log(body);
    });
  }

  function steamIDToProfile(steamID) {
    var parts = steamID.split(":");
    var iServer = Number(parts[1]);
    var iAuthID = Number(parts[2]);
    var converted = "76561197960265728"
    var lastIndex = converted.length - 1

    var toAdd = iAuthID * 2 + iServer;
    var toAddString = new String(toAdd)
    var addLastIndex = toAddString.length - 1;

    for(var i=0;i<=addLastIndex;i++) {
        var num = Number(toAddString.charAt(addLastIndex - i));
        var j=lastIndex - i;

        do {
            var num2 = Number(converted.charAt(j));
            var sum = num + num2;

            converted = converted.substr(0,j) + (sum % 10).toString() + converted.substr(j+1);

            num = Math.floor(sum / 10);
            j--;
        } while(num);
    }
    return converted;
  }

  /**
   * @api {get} /trade/inventory/:steam
   * @apiName GetSteamInvetory
   * @apiParam {Intger} job
   * @apiGroup Steam
   */
server.put('/steam/trade', function (req, res, next) {
  server.conn.query(server.getAuthSMAdmin, [req.headers.auth], function(err, row) {
    if( err ) return res.send(new ERR.InternalServerError(err));
    if( row.length == 0 ) return res.send(new ERR.NotAuthorizedError("NotAuthorized"));
    var SteamID = row[0].steamid.replace("STEAM_0", "STEAM_1");

    var partner = req.params['partner'].trim();
    var tokken  = req.params['tokken'].trim();

    server.conn.query("UPDATE `ts-x`.`phpbb3_users` SET `partner`=?, `tokken`=? WHERE `steamid`=?", [partner, tokken, SteamID.replace("STEAM_1", "STEAM_0")], function(err, row) {
      if( err ) return res.send(new ERR.InternalServerError(err));
      return res.send("OK");
    });
  });
});
/**
 * @api {get} /trade/inventory/:steam
 * @apiName GetSteamInvetory
 * @apiParam {Intger} job
 * @apiGroup Steam
 */
server.post('/steam/trade', function (req, res, next) {
  server.conn.query(server.getAuthSMAdmin, [req.headers.auth], function(err, row) {
    if( err ) return res.send(new ERR.InternalServerError(err));
    if( row.length == 0 ) return res.send(new ERR.NotAuthorizedError("NotAuthorized"));
    var SteamID = row[0].steamid;

    server.conn.query("SELECT `partner`, `tokken` FROM `ts-x`.`phpbb3_users` WHERE `steamid`=?", [SteamID], function(err, row) {
      if( err ) return res.send(new ERR.InternalServerError(err));

      offers.makeOffer ({ partnerAccountId: row[0].partner, accessToken: row[0].tokken,
          itemsFromThem: [{appid: 730, contextid: 2, amount: 1, assetid: req.params['itemid']}], itemsFromMe: [], message: "hello"}, function(err, response) {
        if (err) return res.send(new ERR.InternalServerError(err));
        res.send({id: response.tradeofferid});
        return next();
      });
    });
  });
});

  /**
   * @api {get} /trade/inventory/:steam
   * @apiName GetSteamInvetory
   * @apiParam {Intger} job
   * @apiGroup Steam
   */
server.get('/steam/inventory/:steam', function (req, res, next) {
  var cache = server.cache.get( req._url.pathname);
  if( cache != undefined ) return res.send(cache);


  request("http://steamcommunity.com/profiles/" + steamIDToProfile(req.params['steam']) + "/inventory/json/730/2", function (error, response, body) {
    if( error ) return res.send(new ERR.NotFoundError("SteamError"));

    try {
      body = JSON.parse(body);
      if( !body.success ) return res.send(new ERR.NotFoundError("InventoryError"));

      var items = body.rgDescriptions;
      var obj = new Array();

      Object.keys(items).forEach(function (i) {
        var item = items[i];
        if( parseInt(item.tradable) == 1 ) {
          var data = {
            name: item.name,
            classid: item.classid,
            instanceid: item.instanceid,
            image: item.icon_url_large ? item.icon_url_large : item.icon_url,
            hashname: item.market_hash_name,
            price: null
          };

          var isBox = false;

          Object.keys(item.tags).forEach(function (j) {
            var tag = item.tags[j];
            if( tag.internal_name === "CSGO_Type_WeaponCase" )
              isBox = true;
          });

          if( !isBox ) {
            var total = 0;
            var count = 0;
            var price = priceList[item.market_hash_name];
            Object.keys(price).forEach(function (j) {
              total += (price[j].price * price[j].count);
              count += price[j].count;
            });

            data.price = Math.floor(total/count)/100;

            if( data.price >= 0.15 )
              obj.push(data);
          }
        }
      });

      server.cache.set( req._url.pathname, obj);
      res.send(obj);
    }
    catch( e ) {
      console.log(e);
    }
    next();
  });
  next();

});
};
