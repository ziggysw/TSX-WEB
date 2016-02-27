"use strict";
var exports = module.exports = {};

exports.user = function(server, auth){
  
  this.username = 'Visiteur';
  this.uid = 1;
  this.gid = 0;
  this.accesslevel = 0;
  this.accessname = 'Visiteur';
  
  if(typeof auth != 'undefined'){
    
    var sql = "SELECT `username`, user_id, group_id FROM `ts-x`.`phpbb3_users` U INNER JOIN `ts-x`.`phpbb3_sessions` S ON S.`session_user_id`=U.`user_id` WHERE S.`session_id`=? AND `user_id`>1 ORDER BY `session_time` DESC LIMIT 1";
    server.conn.query(sql, auth, function(err, rows) {
      if( err ) return res.send(new ERR.InternalServerError(err));
      if( rows.length == 0 ) return res.send(new ERR.NotFoundError("UserNotFound"));
      
      this.uid = rows[0].user_id;
      this.gid = rows[0].group_id;
      this.username = rows[0].username;
      switch(this.gid){
        case 0:
          this.accesslevel = 0;
          this.accessname = "Visiteur";
          break;

        case this.uid==2170:
          this.accesslevel = 100;
          this.accessname = "Leeth";
          break;

        case 67:
          this.accesslevel = 40;
          this.accessname = "Moderateur";
          break;

        case 68:
          this.accesslevel = 50;
          this.accessname = "Administrateur";
          break;

        case 117: // Wisdom
          this.accesslevel = 50;
          this.accessname = "Administrateur";
          break;

        case 18:
          this.accesslevel = 20;
          this.accessname = "VIP";
          break;

        case 19:
          this.accesslevel = 30;
          this.accessname = "ts-X";
          break;

        case 105:
          this.accesslevel = 10;
          this.accessname = "No-pyj";
          break;
          
        default:
          this.accesslevel = 0;
          this.accessname = "Inscrit";
          break;
      };
      // TODO : Check si la personne est dans la liste des assignés
    });
    
  };
  
  this.hasaccess = function(level){
      return this.accesslevel >= level;
  };
};