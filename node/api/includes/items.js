"use strict";
exports = module.exports = function(server){

/**
 * @api {get} /items GetItems
 * @apiName GetItems
 * @apiGroup Item
 */
server.get('/items', function (req, res, next) {
    try {
        if( req.params['id'] == 0 )
            throw "InvalidParam";

        server.conn.query("SELECT `id`, `nom` FROM `rp_items`", function(err, rows) {
            if( err )
                throw err;
            if( rows.length == 0 )
                res.send("NotFound");
            else
                res.send(rows);
		});
    } catch ( err ) {
        return res.send(err);
    }
	next();
});
/**
 * @api {get} /items/job/:id GetItemByJob
 * @apiName GetItemByJob
 * @apiGroup Item
 * @apiParam {Integer} id Un identifiant unique correspondant au job.
 */
server.get('/items/job/:id', function (req, res, next) {
	try {
        if( req.params['id'] == 0 )
            throw "InvalidParam";

        server.conn.query("SELECT `id`, `nom`, `prix` FROM `rp_items` WHERE `job_id`=? AND `extra_cmd`<>'UNKNOWN'", [req.params['id']], function(err, rows) {
		        if( err )
              throw err;
            return res.send(rows);
		});
    } catch ( err ) {
        return res.send(err);
    }
	next();
});
};
