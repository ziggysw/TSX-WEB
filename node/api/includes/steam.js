"use strict";
exports = module.exports = function(server){
  var ERR = require('node-restify-errors');
  var fs = require('fs');
  var request = require('request');
  var priceList = require('/var/www/ts-x/node/api/market.json');
  var priceListOld = require('/var/www/ts-x/node/api/old.json');

  var SteamUser = require('steam-user');
  var SteamC = require('steamid');
  var TradeOfferManager = require('steam-tradeoffer-manager');
  var SteamTotp = require('steam-totp');
  var logOnOptions = {accountName: server.getSteamLink.username, password: server.getSteamLink.password, twoFactorCode: SteamTotp.generateAuthCode(server.getSteamLink.auth)};
  var client = new SteamUser();
  var manager = new TradeOfferManager({steam: client, domain: "ts-x.eu", language: "fr"});

  var priceListDATA = new Array();
  Object.keys(priceListOld.prices).forEach(function (j) {
    priceListDATA[priceListOld.prices[j].market_hash_name] = priceListOld.prices[j].price;
  });

  if (fs.existsSync('polldata.json')) {
    manager.pollData = JSON.parse(fs.readFileSync('polldata.json'));
    console.log
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
    console.log(`Offer #${offer.id} changed: ${TradeOfferManager.ETradeOfferState[oldState]} -> ${TradeOfferManager.ETradeOfferState[offer.state]}`);
    if (offer.state == TradeOfferManager.ETradeOfferState.Accepted) {
      offer.getReceivedItems(function(err, items) {
        Object.keys(items).forEach(function (i) {
          var item = items[i];
          var euro = ( getPrice(item.market_hash_name) * 0.95);
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
  function getPrice(name) {
    return priceListDATA[name];
    /*
    var total = 0;
    var count = 0;
    var price = priceList[name];
    console.log(price);
      Object.keys(price).forEach(function (j) {
        total += (price[j].price * price[j].count);
        count += price[j].count;
    });
    return Math.floor(total/count)/100;*/
  }

  /**
   * @api {get} /trade/inventory/:steam
   * @apiName GetSteamInvetory
   * @apiParam {Intger} job
   * @apiGroup Steam
   */
server.put('/steam/trade', function (req, res, next) {
  server.conn.query(server.getAuthSteamID, [req.headers.auth], function(err, row) {
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
  server.conn.query(server.getAuthSteamID, [req.headers.auth], function(err, row) {
    if( err ) return res.send(new ERR.InternalServerError(err));
    if( row.length == 0 ) return res.send(new ERR.NotAuthorizedError("NotAuthorized"));
    var SteamID = row[0].steamid;

    request("http://steamcommunity.com/profiles/" + (new SteamC(SteamID)).getSteamID64() + "/inventory/json/730/2", function (error, response, body) {
	console.log(error);
      try {
        body = JSON.parse(body);
        if( !body.success ) return res.send(new ERR.NotFoundError("InventoryError"));

        var invs = body.rgInventory;
        var items = body.rgDescriptions;
        var invID = new Array();
        var obj = new Array();

        var cData = "";

        Object.keys(invs).forEach(function (i) {
          var inv = invs[i];
          if( inv.id == parseInt(req.params['itemid']) ) {
            cData = inv.classid+"_"+inv.instanceid;
          }
        });

        if( cData == "" )  return res.send(new ERR.NotFoundError("InventoryError"));

        var item = items[cData];
        if( parseInt(item.tradable) != 1 ) return res.send(new ERR.NotFoundError("InventoryError"));
          var data = {
            id: invID[item.classid+"_"+item.instanceid],
            name: item.name,
            hashname: item.market_hash_name,
            price: null,
          };

/*        Object.keys(item.tags).forEach(function (j) {
            var tag = item.tags[j];
            if( tag.internal_name === "CSGO_Type_WeaponCase" ) return res.send(new ERR.NotFoundError("InventoryError"));
          });
*/


        var euro = getPrice(item.market_hash_name);
        var money = (euro * 0.95) * 10000;
        if( euro < 0.10 ) return res.send(new ERR.NotFoundError("InventoryError"));

        server.conn.query("SELECT `partner`, `tokken` FROM `ts-x`.`phpbb3_users` WHERE `steamid`=?", [SteamID], function(err, row) {
          if( err ) return res.send(new ERR.InternalServerError(err));
          var offer = manager.createOffer(SteamID);
          offer.setMessage("Votre item vaut: "+Math.round(money)+" $RP, selon les prix actuels sur le marché.");
          offer.setToken(row[0].tokken);
          offer.addTheirItem({appid: 730, contextid: 2, assetid: parseInt(req.params['itemid'])});
          offer.send(function(err, status) {
            console.log(err);
            if( err && err.eresult == 15 ) return res.send({id: -1});
            else if( err && err.eresult == 50 ) return res.send({id: -2});
            else if( err ) return res.send(new ERR.InternalServerError(err));
            res.send({id: offer.id});
            return next();
          });
        });
      }
      catch( e ) {
        console.log(e);
      }
    });
  });
});

/**
 * @api {get} /steam/trade
 * @apiName GetSteamInvetory
 * @apiGroup Steam
 */
server.get('/steam/trade', function (req, res, next) {
  server.conn.query(server.getAuthSteamID, [req.headers.auth], function(err, row) {
    if( err ) return res.send(new ERR.InternalServerError(err));
    if( row.length == 0 ) return res.send(new ERR.NotAuthorizedError("NotAuthorized"));
    var SteamID = row[0].steamid;

    var cache = server.cache.get( req._url.pathname+"/"+SteamID );
    if( cache != undefined ) return res.send(cache);

    manager.getOffers(1, function(err, sent, received) {

      var obj = new Array();
      if( sent != null ) {
        Object.keys(sent).forEach(function (i) {
          if( sent[i].partner.getSteamID64() == (new SteamC(SteamID)).getSteamID64() ) {
            var item = sent[i].itemsToReceive[0];
            var data = {
              id: sent[i].id,
              name: item.name,
              image: item.icon_url_large ? item.icon_url_large : item.icon_url,
              price: getPrice(item.market_hash_name),
              escrow: sent[i].escrowEnds
            };
            obj.push(data);

          }
        });
      }
      server.cache.set( req._url.pathname+"/"+SteamID, obj, 5);
      res.send(obj);
      return next();
    });
    next();
  });
});

  /**
   * @api {get} /steam/inventory
   * @apiName GetSteamInvetory
   * @apiGroup Steam
   */
server.get('/steam/inventory', function (req, res, next) {
  server.conn.query(server.getAuthSteamID, [req.headers.auth], function(err, row) {
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

/*            Object.keys(item.tags).forEach(function (j) {
              var tag = item.tags[j];
              if( tag.internal_name === "CSGO_Type_WeaponCase" )
                isBox = true;
            });
*/
            if( !isBox ) {
              data.price = getPrice(item.market_hash_name);
              if( data.price >= 0.10 )
                obj.push(data);
            }
          }
        });

        server.cache.set( req._url.pathname+"/"+SteamID, obj, 5);
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

  /**
   * @api {get} /steam/inventory/:id
   * @apiName GetSteamInvetory
   * @apiGroup Steam
   */
server.get('/steam/inventory/:id', function (req, res, next) {
  var SteamID = req.params['id']
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
 /*         Object.keys(item.tags).forEach(function (j) {
            var tag = item.tags[j];
            if( tag.internal_name === "CSGO_Type_WeaponCase" )
              isBox = true;
          });
*/
          if( !isBox ) {
            data.price = getPrice(item.market_hash_name);
            console.log(data);
            if( data.price >= 0.10 )
              obj.push(data);
          }
        }
      });

      server.cache.set( req._url.pathname+"/"+SteamID, obj, 5);
      res.send(obj);
    }
    catch( e ) {
      console.log(e);
    }
  next();
  });
});
};
