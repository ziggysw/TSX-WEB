"use strict";
exports = module.exports = function(app) {

  app.config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/:arg/:sub', {
      templateUrl: function(p) { return "/templates/node/roleplay_"+p.arg+".tpl"; },
      controller: 'rpJobGang',
      reloadOnSearch: false
    }).when('/map', {
      templateUrl: function(p) { return "/templates/node/roleplay_map.tpl"; },
      controller: 'rpMap',
      reloadOnSearch: false
    }).when('/search', {
      templateUrl: function(p) { return "/templates/node/roleplay_search.tpl"; },
      controller: 'rpSearch',
      reloadOnSearch: false
    }).when('/', {
      templateUrl: function(p) { return "/templates/node/roleplay.tpl"; },
      controller: 'rpIndex',
      reloadOnSearch: false
    });
  });

};
