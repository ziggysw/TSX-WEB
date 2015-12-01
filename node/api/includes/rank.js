"use strict";
exports = module.exports = function(server){
  var ERR = require('node-restify-errors');
  var moment = require('moment');

/**
 * @api {get} /rank/:type GetRankByType
 * @apiName GetRankByType
 * @apiGroup Rank
 * @apiParam {String=zombie,pvp,sell,buy,money,age,parrain,vital,success,freekill,general} type Un identifiant correspondant au type
 */
server.get('/rank/:type', function (req, res, next) {
  if( req.params['type'] == 0 )
    return res.send(new ERR.BadRequestError("InvalidParam"));


  var expire = moment({hour: 6});

  if( req.headers['if-none-match'] == expire.unix() ) { return res.send(304); }
  res.header('ETag', expire.unix());
  res.header('Last-Modified', expire.toDate());
  res.header('Expires', expire.add(1, 'day').toDate());
  res.header('Cache-Control', 'Public');


  var cache = server.cache.get( req._url.pathname);
  if( cache != undefined ) { return res.send(cache); }

  var sql = "SELECT R.`steamid`, `name`, `rank`, `old_rank`, R.`point`, `old_point` FROM `rp_rank` R INNER JOIN `rp_users` U ON R.`steamid`=U.`steamid` WHERE type=? AND R.`point`>'0' ORDER BY `rank` ASC;";
  server.conn.query(sql, [req.params['type']], function(err, rows) {
    if( rows.length == 0 ) return res.send(new ERR.NotFoundError("InvalidParam"));

    var obj = new Array();
    for(var i=0; i<rows.length; i++) {
      var row = new Array(); var j=0;
      row[j++] = rows[i].steamid;
      row[j++] = rows[i].name;
      row[j++] = rows[i].rank;
      row[j++] = rows[i].old_rank;
      row[j++] = rows[i].point;
      row[j++] = rows[i].old_point;
      obj.push(row);
    }
    server.cache.set( req._url.pathname, obj, 3600);
    res.send(obj);
	});
	next();
});

};
