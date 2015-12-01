"use strict";
var sys = require('sys')
var exec = require('child_process').exec;

exports = module.exports = function(server){

/**
 * @api {post} /report/police SendReportPolice
 * @apiName SendReportPolice
 * @apiGroup Report
 * @apiPermission user
 * @apiHeader {String} auth Votre cookie de connexion.
 * @apiParam {String} steamid Un identifiant unique Steam.
 * @apiParam {Integer} timestamp La date, selon le joueur
 * @apiParam {String} reason La raison
 * @apiParam {String} moreinfo Info supplémentaire
 */
server.post('/report/police', function (req, res, next) {
    try {
        if( !req.params['steamid'] || !req.params['timestamp'] || !req.params['reason'] || !req.params['moreinfo'] )
            throw "InvalidParam";
        var d = new Date(req.params['timestamp']);
        if(!(d instanceof Date && isFinite(d)))
            throw "InvalidDate";

        server.conn.query(server.getAuthSteamID, [req.headers.auth], function(err, row) {
            if( err ) throw err;
            if( row[0] == null ) throw "NotAuthorized";

            var steamID = row[0].steamid.replace("STEAM_0", "STEAM_1");

            server.conn.query("INSERT INTO `rp_messages` (`id`, `title`, `text`, `timestamp`, `steamid`, `reportSteamID`) VALUES (NULL, ?, ?, ?, ?, ?);", [req.params['reason'], req.params['moreinfo'],  parseInt(d.getTime()/1000), steamID, req.params['steamid']], function(err, row) {
                if( err ) throw err;

                var ID = row.insertId;
                server.conn.query("SELECT DISTINCT `steamid` FROM `rp_users` WHERE `job_id` IN (1,2,101,102) OR `refere` = 1 OR `steamid`=? OR `steamid`=?;", [req.params['steamid'], steamID], function( err, row ) {
                    if( err ) throw err;

                    for (var i = 0; i < row.length; i++) {
                        server.conn.query("INSERT INTO `rp_messages_seen` (`id`, `messageid`, `steamid`) VALUES (NULL, ?, ?)", [ID, row[i].steamid], function(err, row) {
                            if( err ) throw err;
                            res.send({'id': ID});
                        });
                    }
                });
            });
        });
    } catch ( err ) {
        return res.send(err);
    }
    next();
});
/**
 * @api {get} /report GetReports
 * @apiName GetReports
 * @apiGroup Report
 * @apiPermission user
 * @apiHeader {String} auth Votre cookie de connexion.
 */
server.get('/report', function (req, res, next) {

	try {
        if( req.params['id'] == 0 )
            throw "InvalidParam";
        server.conn.query(server.getAuthSteamID, [req.headers.auth], function(err, row) {
            if( err ) throw err;
            if( row[0] == null ) throw "NotAuthorized";

            var steamID = row[0].steamid.replace("STEAM_0", "STEAM_1");

            server.conn.query("SELECT M.`id`, M.`title`, `seen`, `timestamp` FROM `rp_messages` M INNER JOIN `rp_messages_seen` MS ON MS.`messageid`=M.`id` AND MS.`steamid`=? AND `linked_to` IS NULL AND ((M.`lock`=1 AND MS.`seen`=0) OR M.`lock`=0) ORDER BY M.`timestamp` DESC", [steamID], function( err, row ) {
			if( err ) throw err;
			if( row[0] == null ) throw "NotAuthorized";
			res.send( row );
            });
        });
    } catch ( err ) {
        return res.send(err);
    }
	next();
});
/**
 * @api {put} /report/:id SetReportLock
 * @apiName SetReportLock
 * @apiGroup Report
 * @apiPermission user
 * @apiHeader {String} auth Votre cookie de connexion.
 * @apiParam {Integer} id Un identifiant unique du topic
 * @apiParam {Integer} lock Faut-il verouiller le message, oui ou non?
 */
server.put('/report/:id', function (req, res, next) {
	try {
        if( req.params['id'] == 0 && req.params['lock'] === undefined )
            throw "InvalidParam";
        server.conn.query(server.getAuthSteamID, [req.headers.auth], function(err, row) {
            if( err ) throw err;
            if( row[0] == null ) throw "NotAuthorized";

            var steamID = row[0].steamid.replace("STEAM_0", "STEAM_1");

            server.conn.query("SELECT `steamid` FROM `rp_messages_seen` WHERE `messageid`=? AND `steamid`=?", [req.params['id'], steamID], function( err, row ) {
                if( err ) throw err;
                if( row[0] == null ) throw "NotAuthorized";

                server.conn.query("UPDATE `rp_messages_seen` SET `seen`=1 WHERE `messageid`=? AND `steamid`<>(SELECT `steamid` FROM `rp_messages` WHERE `id`=?) AND  `steamid`<>(SELECT `reportSteamID` FROM `rp_messages` WHERE `id`=?)", [req.params['id'], req.params['id'], req.params['id']], function( err, row ) {

                    server.conn.query("SELECT DISTINCT `steamid` FROM `rp_users` WHERE `job_id` IN (1,2,101,102) AND `steamid`=?;", [steamID], function( err, row ) {
                        if( err ) throw err;
                        if( row[0] == null ) throw "NotAuthorized";

                        server.conn.query("UPDATE `rp_messages` SET `lock`=? WHERE `id`=?", [req.params['lock'], req.params['id']], function( err, row ) {
                            if( err ) throw err;
                            res.send("OK");
                        });
                    });
                });
            });
        });
    } catch ( err ) {
        return res.send(err);
    }
	next();
});
/**
 * @api {put} /report/:id GetReportMessage
 * @apiName GetReportMessage
 * @apiGroup Report
 * @apiPermission user
 * @apiHeader {String} auth Votre cookie de connexion.
 * @apiParam {Integer} id Un identifiant unique du topic
 */
server.get('/report/:id', function (req, res, next) {
	try {
        if( req.params['id'] == 0 )
            throw "InvalidParam";
        server.conn.query(server.getAuthSteamID, [req.headers.auth], function(err, row) {
            if( err ) throw err;
            if( row[0] == null ) throw "NotAuthorized";

            var steamID = row[0].steamid.replace("STEAM_0", "STEAM_1");

            server.conn.query("SELECT `job_id` FROM `rp_messages_seen` MS INNER JOIN `rp_users` U ON U.`steamid`=MS.`steamid` WHERE `messageid`=? AND MS.`steamid`=?", [req.params['id'], steamID], function( err, row ) {
                if( err ) throw err;
                if( row[0] == null ) throw "NotAuthorized";

                var job = row[0].job_id;

                server.conn.query("UPDATE `rp_messages_seen` SET `seen`=1 WHERE `messageid`=? AND `steamid`=?", [req.params['id'], steamID], function( err, row ) {
                    if( err ) throw err;
                });

                server.conn.query("SELECT id, `title`, `text`, M.`steamid`, U.`name`, `reportSteamID`, U2.`name` as `reportName`, `timestamp`, `lock` FROM `rp_messages` M INNER JOIN `rp_users` U ON U.`steamid`=M.`steamid` INNER JOIN `rp_users` U2 ON U2.`steamid`=M.`reportSteamID` WHERE `id`=?", [req.params['id']], function( err, row ) {
                    if( err ) throw err;
                    if( job == 1 || job == 2 || job == 101 || job == 102 )
                        row[0].admin = 1;
                    res.send(row);
                });
            });
        });
    } catch ( err ) {
        return res.send(err);
    }
	next();
});
/**
 * @api {get} /report/:id/log GetReportLog
 * @apiName GetReportLog
 * @apiGroup Report
 * @apiPermission user
 * @apiHeader {String} auth Votre cookie de connexion.
 * @apiParam {Integer} id Un identifiant unique du topic
 */
server.get('/report/:id/log', function (req, res, next) {
	try {
        if( req.params['id'] == 0 )
            throw "InvalidParam";
        server.conn.query(server.getAuthSteamID, [req.headers.auth], function(err, row) {
            if( err ) throw err;
            if( row[0] == null ) throw "NotAuthorized";

            var steamID = row[0].steamid.replace("STEAM_0", "STEAM_1");

            server.conn.query("SELECT `steamid` FROM `rp_messages_seen` WHERE `messageid`=? AND `steamid`=?", [req.params['id'], steamID], function( err, row ) {
                if( err ) throw err;
                if( row[0] == null ) throw "NotAuthorized";

                server.conn.query("SELECT `steamid`, `reportSteamID`, `timestamp` FROM `rp_messages` WHERE `id`=?", [req.params['id']], function( err, row ) {
                    if( err ) throw err;

                    var dump = new Array();
                    dump[0] = new Array();
                    dump[1] = new Array();

                    var now = new Date(row[0].timestamp*1000);
                    var y = now.getFullYear();
                    var m = parseInt(now.getMonth()) + 1; if( m < 10 ) m = '0'+m;
                    var d = parseInt(now.getDate()); if( d < 10 ) d = '0'+d;

                    var cmd = "grep -h \"L "+m+"/"+d+"/"+y+" - \" /home/srcds/srv_csgo_rp/csgo/logs/* | egrep \""+row[0].steamid+"|"+row[0].reportSteamID+"\" | grep -v Loading | grep -v \"ADMIN-LOG\" | sort -r";
                    var child = exec(cmd, {maxBuffer: 1024 * 1024}, function (err, stdout, stderr) {
                        if (err !== null)
                            throw err;

                        stdout = stdout.split("\n");
                        for( var i= 0; i<stdout.length; i++) {
                            if( stdout[i].indexOf(row[0].steamid) > -1 )
                                dump[0].push(stdout[i]);
                            if( stdout[i].indexOf(row[0].reportSteamID) > -1 )
                                dump[1].push(stdout[i]);
                        }
                    });
                    child.on('close', function(code) {
                         res.send(dump);
                    });
                });
            });
        });
    } catch ( err ) {
        return res.send(err);
    }
	next();
});
/**
 * @api {get} /report/:id/response GetReportResponse
 * @apiName GetReportResponse
 * @apiGroup Report
 * @apiPermission user
 * @apiHeader {String} auth Votre cookie de connexion.
 * @apiParam {Integer} id Un identifiant unique du topic
 */
server.get('/report/:id/response', function (req, res, next) {
	try {
        if( req.params['id'] == 0 )
            throw "InvalidParam";
        server.conn.query(server.getAuthSteamID, [req.headers.auth], function(err, row) {
            if( err ) throw err;
            if( row[0] == null ) throw "NotAuthorized";

            var steamID = row[0].steamid.replace("STEAM_0", "STEAM_1");

            server.conn.query("SELECT `steamid` FROM `rp_messages_seen` WHERE `messageid`=? AND `steamid`=?", [req.params['id'], steamID], function( err, row ) {
                if( err ) throw err;
                if( row[0] == null ) throw "NotAuthorized";

                server.conn.query("SELECT M.`steamid`, U.`name`, `text`, `timestamp` FROM `rp_messages` M INNER JOIN `rp_users` U ON U.`steamid`=M.`steamid` WHERE `linked_to`=? ORDER BY `id` DESC;", [req.params['id']], function( err, row ) {
                    if( err ) throw err;
                    res.send(row);
                });
            });
        });
    } catch ( err ) {
		return res.send(err);
	}

	next();
});
/**
 * @api {post} /report/reply/:id SendReportReply
 * @apiName SendReportReply
 * @apiGroup Report
 * @apiPermission user
 * @apiHeader {String} auth Votre cookie de connexion.
 * @apiParam {Integer} id Un identifiant unique du topic
 * @apiParam {String} text Le message que vous répondez
 */
server.post('/report/:id/reply', function (req, res, next) {

    try {
        if( !req.params['id'] || !req.params['text'] )
                throw "InvalidParam";
        server.conn.query(server.getAuthSteamID, [req.headers.auth], function(err, row) {
            if( err ) throw err;
            if( row[0] == null ) throw "NotAuthorized";

            var steamID = row[0].steamid.replace("STEAM_0", "STEAM_1");

            server.conn.query("SELECT `steamid` FROM `rp_messages_seen` WHERE `messageid`=?", [req.params['id']], function( err, rows ) {
                if( err ) throw err;
                if( rows[0] == null ) throw "NotFound";

                var found = false;
                for (var i = 0; i < rows.length; i++) if( rows[i].steamid == steamID ) found = true;

                if( !found ) throw "NotAuthorized";

                server.conn.query("UPDATE `rp_messages_seen` SET `seen`=0 WHERE `messageid`=? AND `steamid`<>?", [req.params['id'], steamID], function( err, row ) {
                    if( err ) throw err;
                });

                server.conn.query("INSERT INTO `rp_messages` (`id`, `text`, `timestamp`, `steamid`, `linked_to`) VALUES (NULL, ?, UNIX_TIMESTAMP(), ?, ?);", [req.params['text'], steamID, req.params['id']], function(err, row) {
                    if( err ) throw err;

				    res.send("OK");
                });
            });
        });
    } catch ( err ) {
		return res.send(err);
	}
	next();
});

};
