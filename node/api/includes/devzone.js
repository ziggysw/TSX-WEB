"use strict";
exports = module.exports = function(server){
  var ERR = require('node-restify-errors');
  var moment = require('moment');
  var dz = require('./user.devzone.js');
  /**
   * @api {get} /devzone/user GetUser
   * @apiName GetUser
   * @apiGroup DevZone
   * @apiHeader {String} auth Votre cookie de connexion.
   */
  server.get('/devzone/user', function (req, res, next) {
    dz.user(server, req.headers.auth,function(user){
      return res.send({
        username:    user.username,
        uid:         user.uid,
        gid:         user.gid,
        accesslevel: user.accesslevel,
        accessname:  user.accessname,
        assigne:     user.assigne
      });
    });
    next();
  });
  
  /**
   * @api {get} /devzone/status GetStatus
   * @apiName GetStatus
   * @apiGroup DevZone
   */
  server.get('/devzone/status', function (req, res, next) {
    var cache = server.cache.get( req._url.pathname);
    if( cache != undefined ) { return res.send(cache); }
    
    var sql = "SELECT S.stat_id, S.stat_name, S.stat_priority, UNIX_TIMESTAMP(S.stat_date) stat_date, S.stat_hidden FROM `leeth`.dz_status S ORDER BY stat_hidden ASC,stat_priority DESC";
    server.conn.query(sql, [], function(err, rows){
      if( err ) throw err;
      server.cache.set( req._url.pathname, rows);
      return res.send(rows);
    });
    next();
  });
  
  /**
   * @api {get} /devzone/category GetCategories
   * @apiName GetCategories
   * @apiGroup DevZone
   * @apiHeader {String} auth Votre cookie de connexion.
   */
   server.get('/devzone/category', function (req, res, next) {
     dz.user(server, req.headers.auth,function(user){
       var cache = server.cache.get( req._url.pathname+'-'+user.accesslevel );
       if( cache != undefined ) { return res.send(cache); }
       
       var sql = "SELECT cat_id,cat_name,cat_color,cat_prio,cat_minacc FROM `leeth`.dz_cat WHERE cat_minacc <= ? ORDER BY cat_prio DESC;";
       server.conn.query(sql, [user.accesslevel], function(err, rows){
         if( err ) throw err;
         server.cache.set( req._url.pathname+'-'+user.accesslevel , rows);
         return res.send(rows);
       });
     });
     next();
   });
  
  /**
   * @api {get} /devzone/ticket GetTickets
   * @apiName GetTickets
   * @apiGroup DevZone
   * @apiHeader {String} auth Votre cookie de connexion.
   */
  server.get('/devzone/ticket', function (req, res, next) {
    dz.user(server, req.headers.auth,function(user){
      var cache = server.cache.get( req._url.pathname+'-'+user.accesslevel );
      if( cache != undefined ) { return res.send(cache); }
      
      var sql = "SELECT S.stat_id, tk_id, tk_title, usr_id, assig_usr_id, tk_desc, tk_showdesc, T.cat_id, tk_url FROM `leeth`.dz_status S "
        +"LEFT JOIN `leeth`.dz_ticket T ON T.stat_id = S.stat_id "
	      +"LEFT JOIN `leeth`.dz_cat C ON T.cat_id = C.cat_id "
	      +"WHERE C.cat_minacc <= ? AND "
	      +"S.stat_id IN(SELECT * FROM (SELECT S.stat_id FROM `leeth`.dz_status S ORDER BY stat_hidden ASC,stat_priority DESC LIMIT 4) AS temp) "
	      +"ORDER BY stat_hidden ASC,stat_priority DESC,cat_prio DESC,IFNULL(tk_prio,0) ASC;";
      server.conn.query(sql, [user.accesslevel], function(err, rows){
        if( err ) throw err;
        server.cache.set( req._url.pathname+'-'+user.accesslevel , rows);
        return res.send(rows);
      });
    });
    next();
  });
  
  /**
   * @api {get} /devzone/assigne GetAssigne
   * @apiName GetAssigne
   * @apiGroup DevZone
   */
  server.get('/devzone/assigne', function (req, res, next) {
    var cache = server.cache.get(req._url.pathname);
    if( cache != undefined ) { return res.send(cache); }
    
    var sql = 'SELECT st_val FROM `leeth`.dz_settings WHERE st_key="assig"';
    server.conn.query(sql, [], function(err, rows){
      if( err ) throw err;
      var ret = JSON.parse(rows[0]['st_val']);
      server.cache.set(req._url.pathname, ret);
      return res.send(ret);
    });
    next();
  });
  
  /**
   * @api {put} /devzone/assigne PutAssigne
   * @apiName PutAssigne
   * @apiGroup DevZone
   * @apiHeader {String} auth Votre cookie de connexion.
   * @apiParam {String} user Le pseudo forum de la personne.
   */
  server.put('/devzone/assigne', function (req, res, next) {

    if( req.params['user'] == undefined )
      return res.send(new ERR.BadRequestError("InvalidParam"));
      
    dz.user(server, req.headers.auth,function(user){
      
      if(!user.hasaccess(50))
        return res.send(new ERR.NotAuthorizedError("NotAuthorized"));
        
      var sql = 'SELECT st_val FROM `leeth`.dz_settings WHERE st_key="assig"';
      server.conn.query(sql, [], function(err, rows){
        if( err ) throw err;
        
        var ret = JSON.parse(rows[0]['st_val']);
        dz.NameToId(server, req.params['user'], function(pid){
          if(pid == 1)
            return res.send(new ERR.NotFoundError("NotFound"));
          for(var i=0; i<ret.length; i++){
            if(ret[i] == pid)
              return res.send('OK');
          }
          ret[ret.length] = pid;
          var sql2 = 'UPDATE `leeth`.dz_settings SET st_val=? WHERE st_key="assig";';
          server.conn.query(sql2, [JSON.stringify(ret)], function(err2, rows2){
            if( err2 ) 
              return res.send('UPDATE ERROR');
              
            server.cache.del("/devzone/assigne");
            return res.send('OK');
          });
        });

      });
    });
    next();
  });

  
};
