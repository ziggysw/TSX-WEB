var restify = require('restify');
var redirect = require('restify-redirect');

var fs=require("fs");
var mysql = require('mysql2');
var NodeCache = require( "node-cache" );

function Pool(num_conns) {
  this.pool = [];
  for(var i=0; i < num_conns; ++i) {
    var conn = mysql.createConnection(server.sqlConfig);
    conn.connect();
    conn.on('error', function(err) {
        setTimeout(handleDisconnect, 5000);
    });
    this.pool.push(conn);
  }
  this.last = 0;
}
Pool.prototype.query = function(a, b, c, d) {
    var cli = this.pool[this.last];
    this.last++;
    if (this.last == this.pool.length)
       this.last = 0;
    return cli.query(a, b, c, d);
}

var server = restify.createServer({key: fs.readFileSync("../www.ts-x.eu.key"), certificate: fs.readFileSync("../www.ts-x.eu.crt"), ca: fs.readFileSync('../intermediate.crt') });
require('./auth.js')(server);

server.conn = new Pool(16);
server.cache = new NodeCache({ stdTTL: 30, checkperiod: 60 });
server.restify = restify;
server.restify.CORS.ALLOW_HEADERS.push('origin');
server.restify.CORS.ALLOW_HEADERS.push('auth');


function handleDisconnect() {
    server.conn = new Pool(16);
}
//handleDisconnect();

process.on('uncaughtException', function(err) {
	console.log('Caught exception: ' + err);
	handleDisconnect();
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());
server.use(restify.fullResponse());
server.use(restify.conditionalRequest());
server.use(redirect());




require('./includes/user.js')(server);
require('./includes/report.js')(server);
require('./includes/items.js')(server);
require('./includes/zones.js')(server);
require('./includes/proxy.js')(server);
require('./includes/panel.js')(server);
require('./includes/job.js')(server);
require('./includes/group.js')(server);
require('./includes/live.js')(server);
require('./includes/forum.js')(server);
require('./includes/rank.js')(server);
require('./includes/connection.js')(server);

server.get('/', function (req, res, next) {
  return res.redirect('https://www.ts-x.eu/node/apidoc/');
});

server.listen(8080, "37.59.68.185", function () {
	console.log('%s listening at %s', server.name, server.url);
});
