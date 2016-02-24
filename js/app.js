// sssdn,ksssssssssssssssssssssssssss
var app = angular.module('tsx', ['ngRoute', 'dndLists']);

app.config(function($httpProvider) {
	$httpProvider.defaults.headers.common['auth'] = _md5;
});

require("./angular/ctrl/roleplay.js")(app);
require("./angular/route/roleplay.js")(app);
require("./angular/directive/roleplay.js")(app);
require("./angular/filter/roleplay.js")(app);
