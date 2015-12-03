"use strict";
exports = module.exports = function(server){
  var ERR = require('node-restify-errors');
  var request = require('request');
  var statData = require('/home/leeth/tsx/assoc.json');
  // bla, bla, bla... à déplacer
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
   * @api {get} /user/:SteamID GetUserBySteamID
   * @apiName GetUserBySteamID
   * @apiGroup User
   * @apiParam {String} SteamID Un identifiant unique sous le format STEAM_1:x:xxxxxxx
   */
  server.get('/user/:id', function (req, res, next) {
    if( req.params['id'] == 0 )
      return res.send(new ERR.BadRequestError("InvalidParam"));

    var cache = server.cache.get( req._url.pathname);
    if( cache != undefined ) {
      cache.is_admin = false;

      server.conn.query(server.getAuthSMAdmin, [req.headers.auth], function(err, row) {
        if( row.length > 0 )
          cache.is_admin = true;

        return res.send(cache);
      });
    }
    var sql = "SELECT U.`name`, `money`+`bank` as `cash`, U.`job_id`, `job_name`, U.`group_id`, G.`name` as `group_name`, `time_played` as `timeplayed`, ";
    sql += "`permi_lege`, `permi_lourd`, `permi_vente`, `train` as `train_knife`, `train_weapon`, `train_esquive`, ";
    sql += "`pay_to_bank`, `have_card`, `have_account`, `kill`, `death`, `refere`, `timePlayedJob`, U.`skin`, UNIX_TIMESTAMP(`last_connected`) as `last_connected`"
    sql += " FROM `rp_users` U INNER JOIN `rp_jobs` J ON J.`job_id`=U.`job_id` INNER JOIN `rp_groups` G ON G.`id`=U.`group_id` WHERE `steamid`=?";

    server.conn.query(sql, [req.params['id']], function(err, rows) {
      if( err ) return res.send(new ERR.InternalServerError(err));
      if( rows.length == 0 ) return res.send(new ERR.NotFoundError("UserNotFound"));

      rows[0].skin = (require('path').basename(rows[0].skin)).replace(/[^A-Za-z]/g, '').replace(/variant.mdl/g, '').replace(/varmdl/g, '').replace("mdl", "");
      rows[0].skin = (rows[0].skin==''? 'null' : rows[0].skin);
      rows[0].last_connected = new Date(parseInt(rows[0].last_connected)*1000);
      rows[0].is_admin = false;
      rows[0].steam64 = steamIDToProfile(req.params['id']);

      server.cache.set( req._url.pathname, rows[0]);

      server.conn.query(server.getAuthSMAdmin, [req.headers.auth], function(err, row) {
        if( row.length > 0 )
          rows[0].is_admin = true;

        return res.send( rows[0] );
      });
    });

  	next();
  });
  /**
   * @api {get} /user/search/:name GetUserByName
   * @apiName GetUserByName
   * @apiGroup User
   * @apiParam {String} name Un critère de recherche par nom
   */
  server.get('/user/search/:name', function (req, res, next) {
    if( req.params['name'] == 0 )
      return res.send(new ERR.BadRequestError("InvalidParam"));

    var cache = server.cache.get( req._url.pathname);
    if( cache != undefined ) {
      cache.is_admin = false;

      server.conn.query(server.getAuthSMAdmin, [req.headers.auth], function(err, row) {
        if( row.length > 0 )
          cache.is_admin = true;

        return res.send(cache);
      });
    }
    var sql = "SELECT C.`steamid`, C.`name`, J.`job_name` as `job` FROM (";
    sql += " ( SELECT `steamid`, `name`, '1' as `priority` FROM `rp_csgo`.`rp_users` WHERE `name` LIKE ? ORDER BY `last_connected` DESC LIMIT 100 ) ";
	  sql += " UNION ";
	  sql += " ( SELECT REPLACE(`steamid`, 'STEAM_0', 'STEAM_1'), `username` AS `name`, '2' as `priority` FROM `ts-x`.`phpbb3_users` WHERE `username` LIKE ? OR `username_clean` LIKE ? ORDER BY `user_lastvisit` DESC LIMIT 100) ";
	  sql += " UNION ";
    sql += " ( SELECT `steamid`, `name`, '3' as `priority` FROM `rp_users` U INNER JOIN `rp_jobs` J ON U.`job_id`=J.`job_id` WHERE `job_name` LIKE ? LIMIT 100) ";
    sql += " UNION ";
	  sql += " ( SELECT REPLACE(`steamid`, 'STEAM_0', 'STEAM_1'), `uname` AS `name`, '4' as `priority` FROM `ts-x`.`srv_nicks` WHERE `uname` LIKE ? OR `uname2` LIKE ? LIMIT 10) ";
    sql += " ) AS C LEFT JOIN `rp_users` U ON U.`steamid`=C.`steamid` LEFT JOIN `rp_jobs` J ON U.`job_id`=J.`job_id` WHERE C.`steamid`<>'notset' GROUP BY `steamid` ORDER BY `priority` ASC;";

    req.params['name'] = "%" + req.params['name'] + "%";
    server.conn.query(sql, [req.params['name'],req.params['name'],req.params['name'],req.params['name'],req.params['name'],req.params['name']], function(err, rows) {
      if( err ) return res.send(new ERR.InternalServerError(err));
      if( rows.length == 0 ) return res.send(new ERR.NotFoundError("NotFound"));

      for(var i=0; i<rows.length; i++)
        rows[i].steam64 = steamIDToProfile(rows[i].steamid);

      server.cache.set( req._url.pathname, rows);
      return res.send( rows );
    });

  	next();
  });

/**
 * @api {get} /user/:SteamID/personality GetUserPersonality
 * @apiName GetUserPersonality
 * @apiGroup User
 * @apiParam {String} SteamID Un identifiant unique sous le format STEAM_1:x:xxxxxxx
 */
server.get('/user/:id/personality', function (req, res, next) {
  function cb(obj) {
    if( Object.keys(obj).length == 2 ) {
      server.cache.set( req._url.pathname, obj);
      return res.send(obj);
    }
  }

  if( req.params['id'] == 0 )
    return res.send(new ERR.BadRequestError("InvalidParam"));

  var cache = server.cache.get( req._url.pathname);
  if( cache != undefined ) return res.send(cache);

  var obj = new Object();
  server.conn.query("SELECT `type`, COUNT(`type`) as `cpt` FROM `rp_bigdata` WHERE `steamid`=? AND `date` > CURDATE() - INTERVAL 90 DAY GROUP BY `type`;", [req.params['id']], function(err, rows) {
    if( err ) return res.send(new ERR.InternalServerError(err));
    if( rows.length == 0 ) return res.send(new ERR.NotFoundError("UserNotFound"));

    obj.bigdata = rows[0];
    cb(obj);
  });
  server.conn.query("SELECT `money`+`bank` FROM `rp_users` WHERE `steamid`=?;", [req.params['id']], function(err, rows) {
    if( err ) return res.send(new ERR.InternalServerError(err));
    if( rows.length == 0 ) return res.send(new ERR.NotFoundError("UserNotFound"));

    obj.data = rows[0];
    cb(obj);
  });
}
/**
 * @api {get} /user/:SteamID/stats GetUserStats
 * @apiName GetUserStats
 * @apiGroup User
 * @apiParam {String} SteamID Un identifiant unique sous le format STEAM_1:x:xxxxxxx
 */
server.get('/user/:id/stats', function (req, res, next) {
  function cb(obj) {
    if( Object.keys(obj).length == 2 ) {
      server.cache.set( req._url.pathname, obj);
      return res.send(obj);
    }
  }

  if( req.params['id'] == 0 )
    return res.send(new ERR.BadRequestError("InvalidParam"));

  var cache = server.cache.get( req._url.pathname);
  if( cache != undefined ) return res.send(cache);

  var obj = new Object();
  server.conn.query("SELECT `name`, `completed`, `time` FROM `rp_quest_book` QB INNER JOIN `rp_quest` Q ON QB.`uniqID`=Q.`uniqID` WHERE `steamID`=? ORDER BY `time` DESC LIMIT 10;", [req.params['id']], function(err, rows) {
    if( err ) return res.send(new ERR.InternalServerError(err));
    if( rows.length == 0 ) return res.send(new ERR.NotFoundError("UserNotFound"));

    for(var i=0; i<rows.length; i++)
      rows[i].time = new Date(rows[i].time*1000);

    obj.quest = rows;
    cb(obj);
  });
  server.conn.query("SELECT `stat_id`, `data` FROM `rp_statdata` WHERE `steamID`=?;", [req.params['id']], function(err, rows) {
    if( err ) return res.send(new ERR.InternalServerError(err));
    if( rows.length == 0 ) return res.send(new ERR.NotFoundError("UserNotFound"));

    var arr = new Array();
    for(var i=0; i<rows.length; i++) {
      arr.push( {name: statData[rows[i].stat_id], data: rows[i].data} )
    }
    obj.stat = arr;
    cb(obj);
  });

	next();
});

function fillArray(table, min, max, step) {
  var i = 0;
  while(min <= max) {
    if(typeof(table[i]) == 'undefined' || table[i][0] > min) {
       table.splice(i, 0, new Array(min, null));
    }
    min += step;
    i++;
  }
}

/**
 * @api {get} /user/:SteamID/incomes/:scale GetUserIncomes
 * @apiName GetUserIncomes
 * @apiGroup User
 * @apiParam {String} SteamID Un identifiant unique sous le format STEAM_1:x:xxxxxxx
 * @apiParam {Integer} scale échelle de temps en heure. Défaut: 24
 */
server.get('/user/:id/incomes/:scale', function (req, res, next) {

  function cb(obj) {
    if( Object.keys(obj).length == 7 ) {

      var arr = [ {name: 'Les ventes', data: obj.vente, type: 'column' },
      {name: 'Les vols', data: obj.vol, type: 'column'},
      {name: 'Gains du loto', data: obj.loto, type: 'column'},
      {name: 'Les amendes', data: obj.amende, type: 'column'},
      {name: 'La paye', data: obj.pay, type: 'column'},
      {name: 'La durée de connexion', data: obj.connexion, yAxis: 1, tooltip: { valueSuffix: 'min' }}];

      var arr2 = [
        { title: { text: 'Argent gagné ($)'}, min: 0, tickAmount: 10, endOnTick:false, maxPadding: 0.0 },
        { title: { text: 'Temps de jeu (min)'}, min: 0, tickAmount: 10, endOnTick:false, maxPadding: 0.0, opposite: true}
      ];

      var obj2 = new Object();
      obj2.title = 'Argent gagné par '+obj.name;
      obj2.data = arr;
      obj2.axis = arr2;

      server.cache.set( req._url.pathname, obj2);
      return res.send(obj2);
    }
  }

  if( req.params['id'] == 0 )
    return res.send(new ERR.BadRequestError("InvalidParam"));

  var cache = server.cache.get( req._url.pathname);
  if( cache != undefined ) return res.send(cache);

  var scale = 24;
  if( req.params['scale'] != 0 )
    scale = parseInt(req.params['scale']);

  var obj = new Object();
  var day = 24*60*60*1000;
  var now = Math.floor( (new Date().getTime())/day  )*day;
  var min = now - (31*day);

  day = day/24 * scale;

  var sqlTimeColumn = "(FLOOR(`timestamp`/("+scale+"*60*60))*"+scale+"*60*60) as `date` ";
  var sql = "";
  sql += "SELECT SUM(I.`prix`*S.`amount`) AS `total`, " + sqlTimeColumn;
  sql += "	FROM `rp_sell` S INNER JOIN `rp_items` I ON S.`item_id`=I.`id` WHERE `steamid`=? AND `item_type`='0' GROUP BY `date` ORDER BY `date` ASC;"

  server.conn.query(sql, [req.params['id']], function(err, rows) {
    if( err ) return res.send(new ERR.InternalServerError(err));

    var tmp = new Array();
    for (var i = 0, len = rows.length; i < len; i++) {
      tmp.push( Array( parseInt(rows[i].date)*1000 , parseInt(rows[i].total) ) );
    }
    fillArray(tmp, min, now, day);
    obj.vente = tmp;
    cb(obj);
  });

  sql = "SELECT SUM(`total`) as `total`, `date` FROM (";
  sql += "    SELECT SUM(I.`prix`*S.`amount`) AS `total`, " + sqlTimeColumn;
  sql += "		FROM `rp_sell` S INNER JOIN `rp_items` I ON S.`item_id`=I.`id` WHERE `steamid`=? AND (`item_type`='2' OR (`item_type`='4' AND `item_name`='Vol: Objet')) GROUP BY `date`";
  sql += "	UNION";
  sql += "	SELECT SUM(`amount`) AS `total`, " + sqlTimeColumn;
  sql += "			FROM `rp_sell` WHERE `steamid`=? AND `item_id`='0' AND `item_name` LIKE 'Vol: %' GROUP BY `date`";
  sql += "    ) AS VOL GROUP BY `date` ORDER BY `date` ASC;";

  server.conn.query(sql, [req.params['id'],req.params['id']], function(err, rows) {
    if( err ) return res.send(new ERR.InternalServerError(err));

    var tmp = new Array();
    for (var i = 0, len = rows.length; i < len; i++) {
      tmp.push( Array( parseInt(rows[i].date)*1000 , parseInt(rows[i].total) ) );
    }
    fillArray(tmp, min, now, day);
    obj.vol = tmp;
    cb(obj);
  });

  sql = "SELECT SUM(`amount`) AS `total`, " + sqlTimeColumn;
  sql += "			FROM `rp_sell` WHERE `steamid`=? AND `item_id`='0' AND `item_name`='LOTO' GROUP BY `date` ORDER BY `date` ASC;";

  server.conn.query(sql, [req.params['id']], function(err, rows) {
    if( err ) return res.send(new ERR.InternalServerError(err));

    var tmp = new Array();
    for (var i = 0, len = rows.length; i < len; i++) {
      tmp.push( Array( parseInt(rows[i].date)*1000 , parseInt(rows[i].total) ) );
    }
    fillArray(tmp, min, now, day);
    obj.loto = tmp;
    cb(obj);
  });

  sql = "SELECT SUM(`amount`) AS `total`, " + sqlTimeColumn;
  sql += "			FROM `rp_sell` WHERE `steamid`=? AND (`item_type`='3' OR (`item_type`='4' AND (`item_name`='Caution' OR `item_name`='Amande'))) GROUP BY `date` ORDER BY `date` ASC;";

  server.conn.query(sql, [req.params['id']], function(err, rows) {
    if( err ) return res.send(new ERR.InternalServerError(err));

    var tmp = new Array();
    for (var i = 0, len = rows.length; i < len; i++) {
      tmp.push( Array( parseInt(rows[i].date)*1000 , parseInt(rows[i].total) ) );
    }
    fillArray(tmp, min, now, day);
    obj.amende = tmp;
    cb(obj);
  });

  sql = "SELECT SUM(`amount`) AS `total`, " + sqlTimeColumn;
  sql += "			FROM `rp_sell` WHERE `steamid`=? AND `item_type`='1' GROUP BY `date` ORDER BY `date` ASC;";
  server.conn.query(sql, [req.params['id']], function(err, rows) {
    if( err ) return res.send(new ERR.InternalServerError(err));

    var tmp = new Array();
    for (var i = 0, len = rows.length; i < len; i++) {
      tmp.push( Array( parseInt(rows[i].date)*1000 , parseInt(rows[i].total) ) );
    }
    fillArray(tmp, min, now, day);
    obj.pay = tmp;
    cb(obj);
  });

  sql = "SELECT SUM(`temps`)/60 AS `total`, " + sqlTimeColumn +"	FROM `rp_stats` WHERE `steamid`=? GROUP BY `date` ORDER BY `date` ASC;"
  server.conn.query(sql, [req.params['id']], function(err, rows) {
    if( err ) return res.send(new ERR.InternalServerError(err));

    var tmp = new Array();
    for (var i = 0, len = rows.length; i < len; i++) {
      tmp.push( Array( parseInt(rows[i].date)*1000 , parseInt(rows[i].total) ) );
    }
    fillArray(tmp, min, now, day);
    obj.connexion = tmp;
    cb(obj);
  });

  sql = "SELECT `name`	FROM `rp_users` WHERE `steamid`=?;"
  server.conn.query(sql, [req.params['id']], function(err, rows) {
    if( err ) return res.send(new ERR.InternalServerError(err));
    if( rows.length == 0 ) return res.send(new ERR.NotFoundError("UserNotFound"));

    obj.name = rows[0].name;
    cb(obj);
  });

  next();
});


/**
 * @api {delete} /user/:type QuitUserJobGroup
 * @apiName QuitUserJobGroup
 * @apiGroup User
 * @apiHeader {String} auth Votre cookie de connexion.
 * @apiParam {String=job,group} type
 */
server.del('/user/:type', function (req, res, next) {

  if( req.params['type'] != "group" && req.params['type'] != "job" )
    return res.send(new ERR.BadRequestError("InvalidParam"));

  server.conn.query(server.getAuthSteamID, [req.headers.auth], function(err, row) {
    if( err ) return res.send(new ERR.InternalServerError(err));
    if( row.length == 0 ) return res.send(new ERR.NotAuthorizedError("NotAuthorized"));
    var SteamID = row[0].steamid.replace("STEAM_0", "STEAM_1");
    var UserName = row[0].username_clean;

    var sql0;
    if( req.params['type'] == "job" )
      sql0 = "SELECT `is_boss`, J.`job_id` as `id` FROM `rp_users` U INNER JOIN `rp_jobs` J ON J.`job_id`=U.`job_id`  WHERE `steamid`=? LIMIT 1;";
    else if( req.params['type'] == "group" )
      sql0 = "SELECT `is_chef` as `is_boss`, U.`group_id` as `id` FROM `rp_users` U INNER JOIN `rp_groups` G ON G.`id`=U.`group_id`  WHERE `steamid`=? LIMIT 1;";


    var sql1 = "UPDATE `rp_users` SET `"+req.params['type']+"_id`=0 WHERE `steamid`=? LIMIT 1;";
    var sql2 = "INSERT INTO `rp_users2` (`id`, `steamid`, `"+req.params['type']+"_id`, `pseudo`, `steamid2`) VALUES (NULL, ?, 0, ?, ?);";

    server.conn.query(sql0, [SteamID], function(err, row) {
      if( err ) return res.send(new ERR.InternalServerError(err));
      if( row.length == 0 ) return res.send(new ERR.NotFoundError("UserNotFound"));
      if( parseInt(row[0].is_boss) == 1 ) return res.send(new ERR.NotFoundError("Cannot dismiss while chief"));

      var val = parseInt(row[0].id);

      if( isNaN(val) || val == 0 )
        return res.send(new ERR.ForbiddenError("NotAuthorized: You don't have a "+ req.params['type']));

      server.conn.query(sql1, [SteamID], function(err, row) {
        if( err ) return res.send(new ERR.InternalServerError(err));
        server.conn.query(sql2, [SteamID , UserName, SteamID], function(err, row) {
          if( err ) return res.send(new ERR.InternalServerError(err));

          server.cache.del("/user/"+SteamID);
          return res.send("OK");
        });
      });
    });
  });
  next();
});

/**
 * @api {get} /user/:SteamID/sendMoney/:cash sendMoneyToSteamID
 * @apiName sendMoneyToSteamID
 * @apiGroup User
 * @apiParam {String} SteamID Un identifiant unique sous le format STEAM_1:x:xxxxxxx
 * @apiParam {Integer} cash Argent à envoyer
 */
server.put('/user/:SteamID/sendMoney/:cash', function (req, res, next) {
  if( !req.params['SteamID'] || !req.params['cash'] )
    return res.send(new ERR.BadRequestError("InvalidParam"));


  server.conn.query(server.getAuthSMAdmin, [req.headers.auth], function(err, row) {
    if( err ) return res.send(new ERR.InternalServerError(err));
    if( row.length == 0 ) return res.send(new ERR.NotAuthorizedError("NotAuthorized"));
    var SteamID = row[0].steamid.replace("STEAM_0", "STEAM_1");
    var UserName = row[0].username;
    var amount = parseInt(req.params['cash']);

    if( SteamID == req.params['SteamID'] )
      return res.send(new ERR.NotAuthorizedError("NotAuthorized"));

    server.conn.query("SELECT `money`+`bank` as `cash` FROM `rp_users` WHERE `steamid`=? LIMIT 1;", [SteamID], function(err, row) {
      if( err ) return res.send(new ERR.InternalServerError(err));

      if( row[0].cash < amount || amount <= 0 )
        return res.send(new ERR.NotAuthorizedError("NotEnoughtMoney"));

      request("http://178.32.42.113:27015/njs/connected/"+SteamID, function (error, response, body) {
        if( error ) return res.send(new ERR.NotFoundError("ServerNotFound"));
        if( parseInt(body) == 1 ) return res.send(new ERR.NotFoundError("YouMustBeDisconnected"));

        server.conn.query("UPDATE `rp_users` SET `bank`=`bank`-? WHERE `steamid`=? LIMIT 1;", [amount, SteamID], function(err, row) {
          if( err ) return res.send(new ERR.InternalServerError(err));
          server.conn.query("INSERT INTO `rp_users2` (`id`, `steamid`, `bank`, `pseudo`, `steamid2`) VALUES (NULL, ?, ?, ?, ?);", [req.params['SteamID'], amount, UserName, SteamID], function(err, row) {
            if( err ) return res.send(new ERR.InternalServerError("aaa"+err));


            server.cache.del("/user/"+SteamID);
            server.cache.del("/user/"+req.params['SteamID']);
            return res.send("OK");
          });
        });
      });
    });
  });



	next();
});


};
