"use strict";
var exports = module.exports = {};

exports.user = function(server, auth, cb){
  var self = {};

  self.username    = 'Visiteur';
  self.uid         = 1;
  self.gid         = 0;
  self.accessname  = 'Visiteur';
  self.accesslevel = 0;
  self.assigne     = false;
  
  var _auth = auth;
  
  if(typeof auth != 'undefined'){

    var sql = "SELECT `username`, user_id, group_id FROM `ts-x`.`phpbb3_users` U INNER JOIN `ts-x`.`phpbb3_sessions` S ON S.`session_user_id`=U.`user_id` WHERE S.`session_id`=? AND `user_id`>1 ORDER BY `session_time` DESC LIMIT 1";
    server.conn.query(sql, [auth], function(err, rows) {

      if( !err && rows.length != 0 ){
        self.uid = rows[0].user_id;
        self.gid = rows[0].group_id;
        self.username = rows[0].username;
      }
      
      var sql2 = 'SELECT st_val FROM `leeth`.dz_settings WHERE st_key="assig"';
      server.conn.query(sql2, [], function(err2, rows2){

        if( !err && rows2.length != 0 ){
          var assig = JSON.parse(rows2[0]['st_val']);

          for(var i=0; i<assig.length; i++){
            if(self.uid == assig[i]){
              self.assigne = true;
            }
          }

        }
        
        switch(self.gid){
          case 67:
            self.accesslevel = 40;
            self.accessname = "Moderateur";
            break;
          
          case 68:
            self.accesslevel = 50;
            self.accessname = "Administrateur";
            break;
          
          case 117: // Wisdom
            self.accesslevel = 50;
            self.accessname = "Administrateur";
            break;

          case 0:
            self.accesslevel = 0;
            self.accessname = "Visiteur";
            break;

          case 18:
            self.accesslevel = 20;
            self.accessname = "VIP";
            break;

          case 19:
            self.accesslevel = 30;
            self.accessname = "ts-X";
            break;

          case 105:
            self.accesslevel = 10;
            self.accessname = "No-pyj";
            break;

          default:
            self.accesslevel = 0;
            self.accessname = "Inscrit";
            break;
        };
        if(self.assigne){
          if(self.accesslevel < 40){
            self.accesslevel = 40;
            self.accessname  = 'Assigné';
          }
        }
        if(self.uid == 2170){self.accesslevel = 100;self.accessname = 'Leeth'};
        cb(self);

      });
    });
    
  }
  else{
    cb(self);
  };
  
  self.hasaccess = function(level){
      return self.accesslevel >= level;
  };
};