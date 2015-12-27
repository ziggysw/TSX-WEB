"use strict";

exports = module.exports = function(server) {
var sys  = require('os-utils');


function encode(str, key) {
   key = require('crypto').createHash('sha1').update(key).digest("hex");
   var j = 0;
   var hash = "";
   for(var i=0; i<str.length; i++) {

     var ordStr = str.substr(i, 1).charCodeAt(0);
     if (j == key.length) { j = 0; }
     var ordKey = key.substr(j,1).charCodeAt(0);
     j++;

     hash += parseInt(ordStr+ordKey).toString(36).split('').reverse().join('');
   }

   return hash;
}

/**
 * @api {get} /panel/sys GetSystemInformation
 * @apiPermission admin
 * @apiName GetSystemInformation
 * @apiGroup Panel
 * @apiHeader {String} auth Votre cookie de connexion.
 */
server.get('/panel/sys', function (req, res, next) {
    try {
      server.conn.query(server.getAuthAdminID, [req.headers.auth], function(err, row) {
        if( err ) throw err;
        if( row[0] == null ) throw "NotAuthorized";

        var obj = new Object();
        function cb(obj) {
          if( Object.keys(obj).length == 5 )
            return res.send(obj);
        }

        obj.loadavg = sys.loadavg(1);
        sys.cpuUsage( function(i) {
          obj.CPU = parseFloat(i)*100.0;

          cb(obj);
        });
        require('child_process').exec('free -m', function(error, stdout, stderr) {
          var lines = stdout.split("\n");
          var str_mem_info = lines[1].replace( /[\s\n\r]+/g,' ');
          var mem_info = str_mem_info.split(' ');
          var total_mem    = parseFloat(mem_info[1]);
          var free_mem     = parseFloat(mem_info[3]);
          var cached_mem   = parseFloat(mem_info[6]);

          obj.memory = (1-((free_mem+cached_mem)/total_mem))*100.0;

          cb(obj);
        });
        require('child_process').exec('cat /sys/class/net/eth0/statistics/rx_bytes; sleep 1; cat /sys/class/net/eth0/statistics/rx_bytes', function(error, stdout, stderr) {
          var lines = stdout.split("\n");
          obj.network = (parseInt(lines[1]) - parseInt(lines[0]))/1024;

          cb(obj);
        });
        require('child_process').exec('php /var/www/ts-x/templates/php/serveurs.php', function(error, stdout, stderr) {
          var lines = stdout.split("\n");
          obj.players = lines[0];

          cb(obj);
        });
      });
    } catch ( err ) {
        return res.send(err);
    }
	next();
});
/**
 * @api {get} /panel/servers GetServersInfo
 * @apiPermission admin
 * @apiName GetServersInfo
 * @apiGroup Panel
 * @apiHeader {String} auth Votre cookie de connexion.
 */
server.get('/panel/servers', function (req, res, next) {
    try {
      server.conn.query(server.getAuthAdminID, [req.headers.auth], function(err, row) {
        if( err ) throw err;
        if( row[0] == null ) throw "NotAuthorized";

        server.conn.query("SELECT `uniq_id`, `url` as `game`, `ip`, `port`, `is_on`, `current`, `maxplayers` FROM `ts-x`.`adm_serv`;", function(err, row) {
          return res.send(row);
        });
      });
    } catch ( err ) {
        return res.send(err);
    }
	next();
});
/**
 * @api {get} /panel/email GetEmailInfo
 * @apiPermission admin
 * @apiName GetEmailInfo
 * @apiGroup Panel
 * @apiHeader {String} auth Votre cookie de connexion.
 */
server.get('/panel/email', function (req, res, next) {
    try {
      server.conn.query(server.getAuthAdminID, [req.headers.auth], function(err, row) {
        if( err ) throw err;
        if( row[0] == null ) throw "NotAuthorized";

        var pattern = "/[^a-zA-Z0-9_]+/g";

        var steamid = row[0].steamid;

        var email = new Array();
        email.push(row[0].username.toLowerCase().replace(pattern, ""));
        email.push("contact");
        var result = new Array();
        var tmp = 0;

        for(var i=0; i<email.length; i++) {
          var mail = email[i]

          server.conn.query("SELECT COUNT(*) as `cpt`, '"+mail+"' as `mail` FROM `ts-x`.`mail_system` WHERE LOWER(`to`)='"+mail+"@ts-x.eu';", function(err, row) {
            if( err ) console.log(err);

            var hashCode = encode(Math.random()+","+row[0].mail+","+steamid, "safe_"+steamid);
            var obj = { email: row[0].mail+"@ts-x.eu", hash: ""+hashCode+"", count: row[0].cpt };

            result.push(obj);
            tmp++;
            if( tmp == email.length ) {
              return res.send(result);
            }
          });
        }

      });
    } catch ( err ) {
        return res.send(err);
    }
	next();
});

};
