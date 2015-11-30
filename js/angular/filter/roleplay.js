"use strict";
exports = module.exports = function(app) {

  var trad = new Object();

  app.filter('t', function($http, $templateCache) {

/*    $http.get('/js/angular/fr.json', {cache: true}).success(function(res) { trad = res; }); */

    return function(input, option) {
      if( option === undefined )
        return (trad[input] === undefined ? input : trad[input]);
      else
        return (trad[option][input] === undefined ? input : trad[option][input]);
    }
  });

}
