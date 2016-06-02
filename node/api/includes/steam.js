"use strict";
exports = module.exports = function(server){
  var ERR = require('node-restify-errors');
  var request = require('request');
  var priceList = require('../market.json');


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
