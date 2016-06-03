"use strict";
exports = module.exports = function(server){
  var ERR = require('node-restify-errors');
  var fs = require('fs');
  var request = require('request');
  var priceList = require('../market.json');
  var SteamUser = require('steam-user');
  var SteamC = require('steamid');
  var TradeOfferManager = require('steam-tradeoffer-manager');
  var SteamTotp = require('steam-totp');
  var logOnOptions = {accountName: server.getSteamLink.username, password: server.getSteamLink.password, twoFactorCode: SteamTotp.generateAuthCode(server.getSteamLink.auth)};
  var client = new SteamUser();
  var manager = new TradeOfferManager({steam: client, domain: "ts-x.eu", language: "fr"});

  if (fs.existsSync('polldata.json')) {
    manager.pollData = JSON.parse(fs.readFileSync('polldata.json'));
  }
  manager.on('pollData', function(pollData) {
  	fs.writeFile('polldata.json', JSON.stringify(pollData));
  });
  client.logOn(logOnOptions);
  client.on('loggedOn', function() {
	   console.log("Logged into Steam");
     client.setPersona(SteamUser.EPersonaState.Online);
  });
  client.on('webSession', function(sessionID, cookies) {
  	manager.setCookies(cookies);
  });
  manager.on('sentOfferChanged', function(offer, oldState) {
    console.log("Offer #" + offer.id + " changed: " + TradeOfferManager.getStateName(oldState) + " -> " + TradeOfferManager.getStateName(offer.state));
    if (offer.state == TradeOfferManager.ETradeOfferState.Accepted) {
      offer.getReceivedItems(function(err, items) {
        Object.keys(items).forEach(function (i) {
          var item = items[i];
          var price = priceList[item.market_hash_name];
          var count = 0;
          var total = 0;
          Object.keys(price).forEach(function (j) {
            total += (price[j].price * price[j].count);
            count += price[j].count;
          });

          var euro = (Math.floor(total/count)/100 * 0.9);
          var money = euro * 10000;
          var SteamID = offer.partner.getSteam2RenderedID();
          var now = new Date();
          var year = now.getFullYear() - 2000;
          var month = now.getMonth() + 1;

          server.conn.query("INSERT INTO `rp_csgo`.`rp_users2` (`steamid`,`bank`) VALUES (?,?);", [SteamID, money]);
          server.conn.query("INSERT INTO `ts-x`.`site_donations` (`id`, `steamid`, `timestamp`, `month`, `year`, `code`, `amount`) VALUES (NULL, ?, ?, ?, ?, ?, ?)", [SteamID, Math.round(now.getTime()/1000), month, year, item.classid+"_"+item.instanceid, euro]);
        });
      });
    }
  });

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

      var offer = manager.createOffer(SteamID);
      offer.addTheirItem({appid: 730, contextid: 2, assetid: parseInt(req.params['itemid'])});
      offer.send("hello", row[0].tokken, function(err, status) {
        if( err) return res.send(new ERR.InternalServerError(err));
        res.send({id: offer.id});
        return next();
      });
    });
  });
});

  /**
   * @api {get} /steam/trade
   * @apiName GetSteamInvetory
   * @apiGroup Steam
   */
server.get('/steam/trade', function (req, res, next) {
  server.conn.query(server.getAuthSMAdmin, [req.headers.auth], function(err, row) {
    if( err ) return res.send(new ERR.InternalServerError(err));
    if( row.length == 0 ) return res.send(new ERR.NotAuthorizedError("NotAuthorized"));
    var SteamID = row[0].steamid;

    var cache = server.cache.get( req._url.pathname+"/"+SteamID );
    if( cache != undefined ) return res.send(cache);

    request("http://steamcommunity.com/profiles/" + (new SteamC(SteamID)).getSteamID64() + "/inventory/json/730/2", function (error, response, body) {
      if( error ) return res.send(new ERR.NotFoundError("SteamError"));

      try {
        body = JSON.parse(body);
        if( !body.success ) return res.send(new ERR.NotFoundError("InventoryError"));

        var invs = body.rgInventory;
        var items = body.rgDescriptions;
        var invID = new Array();
        var obj = new Array();

        Object.keys(invs).forEach(function (i) {
          var inv = invs[i];
          invID[inv.classid+"_"+inv.instanceid] = inv.id;
        });

        Object.keys(items).forEach(function (i) {
          var item = items[i];
          if( parseInt(item.tradable) == 1 ) {
            var data = {
              id: invID[item.classid+"_"+item.instanceid],
              name: item.name,
              classid: item.classid,
              instanceid: item.instanceid,
              image: item.icon_url_large ? item.icon_url_large : item.icon_url,
              hashname: item.market_hash_name,
              price: null,
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

              if( data.price >= 0.0015 )
                obj.push(data);
            }
          }
        });

        server.cache.set( req._url.pathname+"/"+SteamID, obj);
        res.send(obj);
      }
      catch( e ) {
        console.log(e);
      }
      next();
  });
  next();
  });
});
};
