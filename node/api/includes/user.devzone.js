"use strict";
var exports = module.exports = {};

exports.user = function(server, auth, cb){
  var self = {};
  self.username = 'Visiteur';
  self.uid = 1;
  self.gid = 0;
  self.accesslevel = 0;
  self.accessname = 'Visiteur';
  var _auth = auth;
  
  if(typeof auth != 'undefined'){
    
    var sql = "SELECT `username`, user_id, group_id FROM `ts-x`.`phpbb3_users` U INNER JOIN `ts-x`.`phpbb3_sessions` S ON S.`session_user_id`=U.`user_id` WHERE S.`session_id`=? AND `user_id`>1 ORDER BY `session_time` DESC LIMIT 1";
    server.conn.query(sql, auth, function(err, rows) {
      if( err ) return res.send(new ERR.InternalServerError(err));
      if( rows.length != 0 ){
        self.uid = rows[0].user_id;
        self.gid = rows[0].group_id;
        self.username = rows[0].username;
        switch(self.gid){
          case 0:
            self.accesslevel = 0;
            self.accessname = "Visiteur";
            break;

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
        if(self.uid == 2170){self.accesslevel = 100;self.accessname = 'Leeth'};
        // TODO : Check si la personne est dans la liste des assignés
      }
      cb(self);
    });
    
  }
  else{
    cb(self);
  };
  
  self.hasaccess = function(level){
      return self.accesslevel >= level;
  };
};