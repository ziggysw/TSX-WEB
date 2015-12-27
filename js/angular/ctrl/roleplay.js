"use strict";
exports = module.exports = function(app) {

app.controller('mainCtrl', function($scope, $http, $filter, $location, $routeParams) {

  $scope.back = new Array();
  $scope.goBack = function() {
    var path = $scope.back.pop();
    if( path == $location.path() )
      path = $scope.back.pop();
    if( path === undefined )
      path = "/";

    $location.path( path );
  }

  $scope.Search = $location.search();
  $scope.Params = $routeParams;
  $scope.steamid = _steamid;
  $scope.Math = window.Math;

  $http.get("https://www.ts-x.eu:8080/jobs").success(function(res) { $scope.jobs = res; });
  $http.get("https://www.ts-x.eu:8080/groups").success(function(res) { $scope.groups = res; });

  $("body").popover({ selector: '[data-toggle="popover"]', trigger: "hover"});
  $("body").tooltip({ selector: '[data-toggle="tooltip"]', trigger: "hover"});

  if( $location.search() && $location.search().TABS ) {  setTimeout(function() { $('#'+$location.search().TABS).show(); }, 100); }
  $scope.$watch(function(){return $location.search();}, function(value) {
    $scope.Search = value;
    var tab = value.TABS; $('.tab-pane').hide(); $('#'+tab).show();
  });

});
app.controller('rpJobGang', function($scope, $http, $routeParams, $location) {
  $scope.$parent.back.push($location.path());
  if( $routeParams.sub == "notset" ) { $location.path( "/" ); }

  $scope.isAdmin = false;
  $http.get("https://www.ts-x.eu:8080/"+$routeParams.arg+"/"+$routeParams.sub).success(function(res) { $scope.data = res; });

  if( $routeParams.arg == "job" || $routeParams.arg == "group" ) {
    $http.get("https://www.ts-x.eu:8080/"+$routeParams.arg+"s/"+$routeParams.sub+"/users").success(function(res) {
      $scope.players = res;
      $scope.isAdmin = false;
      for(var i=0; i<res.length; i++) if( res[i].steamid == $scope.$parent.steamid ) $scope.isAdmin = true;
    });

    if( $routeParams.arg == "job" ) {
      $http.get("https://www.ts-x.eu:8080/items/job/"+$routeParams.sub).success(function(res) { $scope.items = res; });
      $http.get("https://www.ts-x.eu:8080/job/"+$routeParams.sub+"/top").success(function(res) { $scope.PlayerTop = res; });
    }
  }

  if( $routeParams.arg == "user" ) {
    $http.get("https://www.ts-x.eu:8080/user/"+$routeParams.sub+"/stats").success(function(res) { $scope.stats = res; });
    $http.get("https://www.ts-x.eu:8080/live/connected/"+$routeParams.sub).success(function(res) { $scope.connected = parseInt(res); });
  }
  $scope.dropCallback = function(event, index, item, external, type) {
    console.log(index);
    for(var i in $scope.data.notes ) {
      if( $scope.data.notes[i].id == item.id ) {
        console.log(i);
      }
    }
  };

  $scope.getRank = function(pos, point) {
    if( pos == 1 ) return "Président";
    else if( pos >= 2 && pos < 4 ) return "Vice-Président";
    else if( pos >= 4 && pos < 8 ) return "Ministre";
    else if( pos >= 8 && pos < 14 ) return "Haut Conseiller";
    else if( pos >= 14 && pos < 22 ) return "Assistant-Haut Conseiller";
    else if( pos >= 22 && pos < 32 ) return "Conseiller";
    else if( pos >= 32 && pos < 46 ) return "Maire";
    else if( pos >= 46 && pos < 62 ) return "Porte-Parole";
    else if( pos >= 62 && pos < 80 ) return "Citoyen dévoué";
    else if( pos >= 80 && pos < 100 ) return "Citoyen";
    else if( point < 0 ) return "Rôdeur";
    else return "Visiteur";
  }
  $scope.UpdateData = function(id) {
    $http.put("https://www.ts-x.eu:8080/"+$routeParams.arg+"/"+$routeParams.sub+"/"+$scope.steamid, {id: id})
    .success(function (res) {
      $http.get("https://www.ts-x.eu:8080/"+$routeParams.arg+"s/"+$routeParams.sub+"/users").success(function(res) {
        $scope.players = res;
      });
      $scope.showDialog = false;
    })
    .error(function (res) { $scope.$parent.showAlert = true; $scope.$parent.messageAlert = res.message; $scope.$parent.messageTitle = "Erreur"; });
  }
  $scope.UpdateNote = function(id) {

    $http.post("https://www.ts-x.eu:8080/"+$routeParams.arg+"/"+$routeParams.sub+"/note/"+id, {txt: $scope.laNote.name, hidden: 0})
    .success(function (res) {
      $http.get("https://www.ts-x.eu:8080/"+$routeParams.arg+"/"+$routeParams.sub).success(function(res) {  $scope.data = res;});
      $scope.editShowNote = false;
    })
    .error(function (res) { $scope.$parent.showAlert = true; $scope.$parent.messageAlert = res.message; $scope.$parent.messageTitle = "Erreur"; });
  }

  $scope.toggleModal = function(){ $scope.showDialog = !$scope.showDialog;};
});
app.controller('rpIndex', function($scope, $http, $timeout, $interval, $window, $location) {
  $scope.$parent.back.push($location.path());
  function setDay(dayOfWeek, hour, minutes) {
    var d = new Date();
    d.setDate(d.getDate() + (dayOfWeek + 7 - d.getDay()) % 7);
    d.setHours(hour);
    d.setMinutes(minutes);
    d.setSeconds(0);
    return d;
  }
  var wed = setDay(3, 18, 0);
  var fri = setDay(5, 21, 0);
  var now = new Date();
  $scope.pvp = ((now-fri)<(now-wed)?wed:fri);

  $http.get("https://www.ts-x.eu:8080/live/stats").success(function(res) {
    var delta = (res.time.h*60) + res.time.m + parseInt(((new Date())/1000) - res.time.t);
    $scope.stats = res;
    $scope.stats.time.h = parseInt(delta/60)%24;
    $scope.stats.time.m = (delta)%60;

    $interval( function() {
      delta += 1;
      $scope.stats.time.h = parseInt(delta/60)%24;
      $scope.stats.time.m = (delta)%60;
    }, 1000);
  });
});
app.controller('rpMap', function($scope, $http, $routeParams, $timeout, $interval, $window, $location) {
  $scope.$parent.back.push($location.path());

  var element = document.getElementById('heatmap');
  var heatmapInstance;
  $scope.timer = null;

  function scaleX(x, scale) { return Math.floor(((x/9.0)+870.0)*scale); }
  function scaleY(y, scale) { return Math.floor(((y/-9.0)+520.0)*scale); }

  $scope.$on("$destroy", function() {
      if ($scope.timer) { $timeout.cancel($scope.timer); }
  });

  $http.get("https://www.ts-x.eu:8080/zones").success(function(res) {
    $scope.mapData = JSON.parse(lzw_decode(res));
    $scope.maparea();
    angular.element($window).bind('resize', function () { $scope.maparea(); });
  });
  $http.get("https://www.ts-x.eu:8080/live/stats").success(function(res) {
    var delta = (res.time.h*60) + res.time.m + parseInt(((new Date())/1000) - res.time.t);
    $scope.stats = res;
    $scope.stats.time.h = parseInt(delta/60)%24;
    $scope.stats.time.m = (delta)%60;

    $interval( function() {
      delta += 1;
      $scope.stats.time.h = parseInt(delta/60)%24;
      $scope.stats.time.m = (delta)%60;
    }, 1000);
  });

  $scope.maparea = function() {
    $(element).find("map").find("area").remove();

    var res = $scope.mapData;
    var scale = (1/1559 * $(element).outerWidth());

    for(var i=0; i<res.length; i++) {
      var href = '';
      if( !isNaN( parseInt(res[i].type) ) )
        href = "href='#/job/"+res[i].type+"?TABS=player'";

      var coords = scaleX(res[i].min[0], scale)+","+scaleY(res[i].min[1], scale);
      coords += ","+scaleX(res[i].max[0], scale)+","+scaleY(res[i].min[1], scale);
      coords += ","+scaleX(res[i].max[0], scale)+","+scaleY(res[i].max[1], scale);
      coords += ","+scaleX(res[i].min[0], scale)+","+scaleY(res[i].max[1], scale);

      var area = '<area share="poly" coords="'+coords+'" '+href+' data-title="'+res[i].owner+'" data-msg="'+res[i].name+'" data-pv="'+res[i].private+'">';

      $(element).find("map").append(area);
    }
  }
  $scope.heatmapStop = function() {
    $(element).find("canvas").css({"z-index": "-1"});
    $timeout.cancel($scope.timer);
    $scope.timer = null;
  }
  $scope.heatmap = function() {
    $(element).find("canvas").css({"z-index": "1"});
    $http.get("https://www.ts-x.eu:8080/live/positions").success(function(res) {
      var points = heatmapInstance.getData().data;
      var nP = new Array();
      for( var i=0; i<points.length; i++) {
        if( points[i].value > 3 )
          points[i].value = 3;
        points[i].value--;
        if( points[i].value > 0 )
          nP.push(points[i]);
      }

      var scale = (1/1559 * $(element).outerWidth());
      $scope.connected = res.length;
      $scope.lastUpdate = new Date();

      for(var i=0; i<res.length; i++) {
        nP.push({ x: scaleX(res[i][0], scale), y: scaleY(res[i][1], scale), value: 3});
      }
      heatmapInstance.setData({min: 1, max: 4, data: nP});
      $scope.timer = $timeout( function() { $scope.heatmap(); }, 100);
    });
  }
  $(element).find("img").bind('load', function() {
    heatmapInstance = h337.create({container: element, radius:25});
  });
  $(element).find("map").on("mouseover", "area", function() {
    var cvs = document.createElement("a");
    var mCoords = $(this).attr("coords").split(',');
    var pos = $(this).offset();

    if( $("#uniquePopUp").length > 0 ) {
      $("#uniquePopUp").popover('destroy');
      $("#uniquePopUp").remove();
    }

    cvs.id = "uniquePopUp";
    cvs.style.position = "absolute";
    cvs.style.top = parseInt(mCoords[5])+pos.top+"px";
    cvs.style.left = parseInt(mCoords[0])+pos.left+"px";
    cvs.style.zIndex = "9999";
    if( $(this).attr("data-pv") == "1" ) {
      cvs.style.border = "1px solid red";
      cvs.style.backgroundColor = "rgba(255, 0, 0, 0.25)";
    }
    else {
      cvs.style.border = "1px solid green";
      cvs.style.backgroundColor = "rgba(0, 255, 0, 0.25)";
    }
    cvs.style.width = (parseInt(mCoords[2])-parseInt(mCoords[0]))+"px";
    cvs.style.height = (parseInt(mCoords[3])-parseInt(mCoords[5]))+"px";
    cvs.setAttribute("data-toggle", "popover");
    cvs.setAttribute("data-content", $(this).attr("data-msg"));
    cvs.setAttribute("data-original-title", $(this).attr("data-title"));

    if( $(this).attr("href") )
      cvs.href = $(this).attr("href");
    else if( $(this).attr("data-pv") == "1" )
      cvs.setAttribute("data-original-title", "Zone privée");
    else
      cvs.setAttribute("data-original-title", "Tout publique");

    $(cvs).mouseleave( function() { $(this).popover('destroy'); $(this).remove();	});
    $(cvs).click( function() { $(this).popover('destroy'); $(this).remove();	});
    document.body.appendChild(cvs);
  });
});
app.controller('rpSearch', function($scope, $http, $location) {
  $scope.$parent.back.push($location.path());

  $scope.search = "";
  $scope.data = [];

  if( $location.search() !== undefined) {
    $scope.search = Object.keys($location.search())[0];
  }


  $scope.updateSteamID = function() {
    if( $scope.search === undefined || $scope.search.length <= 1 )
      return;

    $location.search($scope.search);

    $http.get("https://www.ts-x.eu:8080/user/search/"+$scope.search)
    .success(function(res) { $scope.data = res; })
    .error(function() { $scope.data = []; });
  }
  $scope.updateSteamID();
});
app.controller('rpTribunal', function($scope, $location, $filter, $http) {
  $scope.$parent.back.push($location.path());
  $scope.steamid = '';
  if( $location.search() !== undefined) {
    $scope.steamid = Object.keys($location.search())[0];
  }

  $scope.nowDate = $filter('date')(new Date(), "le d/M à HH:mm");
  $scope.reasonT=['Insultes, Irrespect', 'Meurtre', 'Freekill massif', 'Attitude négative', 'Menaces, Hack', 'Exploit, Triche', 'Abus de ses fonctions', 'Autre, préciser:' ];
  $scope.reasonCT=['Jail dans une propriétée privée', 'Abus de /jail', 'Jail par déduction', 'Freekill en fonction', 'Abus de perquisition', 'Autre, préciser:' ];
  $scope.reason = $scope.reasonT;
  $scope.typePolice = 0;

  $scope.$watch('pData', function(newValue, old) {
    if( newValue.job_id>=1&&newValue.job_id<=9||newValue.job_id>=101&&newValue.job_id<=109 ) {
      $scope.typePolice = '1';
      $scope.reason = $scope.reasonCT;
    }
    else {
      $scope.typePolice = '0';
      $scope.reason = $scope.reasonT;
    }
  });



  $scope.report = function() {
    var search = new RegExp(/^le ([0-9]{1,2})\/([0-9]{1,2}) à ([0-9]{1,2}):([0-9]{1,2})$/);
    var buffer = search.exec($scope.nowDate);
    var date = new Date( (new Date()).getFullYear(), parseInt(buffer[2])-1, parseInt(buffer[1]), parseInt(buffer[3]), parseInt(buffer[4]), 0, 0);
    var type = parseInt($scope.typePolice);
    var obj = {steamid: $scope.steamid, timestamp: date, reason: ($scope.rType2.length>1?$scope.rType2:$scope.rType), moreinfo: $scope.moreInfo};

    if( type === 1 ) {
      $http.post("https://www.ts-x.eu:8080/report/police", obj).success(function (response) {
        $scope.$parent.showAlert = true;
        $scope.$parent.messageAlert = "Votre rapport a été envoyé, il va maintenant être lu par des référés. Ce sont des personnes n'étant ni policier, ni admin.";
        $scope.$parent.messageTitle = "Envois d'un rapport: Ok!";
        if( response !== undefined )
          $location.path("/tribunal/phone/"+response.id);
      });
    }
    $http.post("https://www.ts-x.eu:8080/report/tribunal", obj).success(function (response) {
      $scope.$parent.showAlert = true;
      $scope.$parent.messageAlert = "Votre rapport a été envoyé, il va maintenant être traité par le conseil des no-pyjs, puis par les hauts-juges.";
      $scope.$parent.messageTitle = "Envois d'un rapport: Ok!";
    });
  }
});
app.controller('rpTribunalCase', function($scope, $location, $routeParams, $http) {
  $scope.$parent.back.push($location.path());

  $scope.case = $routeParams.sub;

  if( $routeParams.arg == "phone" ) {
    var id = $routeParams.sub;
    $http.get("https://www.ts-x.eu:8080/user/"+$scope.steamid).success(function (response) { $scope.me = response; });
    $http.get("https://www.ts-x.eu:8080/report/"+id).success(function (response) { $scope.plainte = response[0]; });
    $http.get("https://www.ts-x.eu:8080/report/"+id+"/response").success(function (response) { $scope.response = response; });
    $http.get("https://www.ts-x.eu:8080/report/"+id+"/log").success(function (response) { $scope.logs = response; });
    $scope.lock = function() {
      $http.put("https://www.ts-x.eu:8080/report/"+id, {lock: 1}).success(function (response) { });
    }
    $scope.reply = function() {
			$scope.rapportReply = $scope.rapportReply.trim();
			if( $scope.rapportReply == "" ) return;

      var tmp = $scope.rapportReply;
			$http.post("https://www.ts-x.eu:8080/report/"+id+"/reply", {text: $scope.rapportReply}).success(function (response) {
				$scope.response.unshift({name: $scope.me.name, steamid: $scope.steamid, text: tmp});
			});
      $scope.rapportReply = "";
		}
  }
  else if( $routeParams.arg == "case" ) {
    $scope.steamid='';
    $scope.playtime = {}; $scope.tribunal = {}; $scope.ratio = {};
    $http.get("https://www.ts-x.eu:8080/user/"+$routeParams.sub).success(function(res) { $scope.data = res; });
    $http.get("https://www.ts-x.eu:8080/live/connected/"+$routeParams.sub).success(function(res) { $scope.connected = parseInt(res); });

    angular.forEach(["31days", "month", "begin", "start"], function(key) {
      $http.get("https://www.ts-x.eu:8080/user/"+$scope.case+"/playtime/"+key).success(function(res) { $scope.playtime[key] = res; });
    });
    angular.forEach(["31days", "month", "begin", "start"], function(key) {
      $http.get("https://www.ts-x.eu:8080/user/"+$scope.case+"/ratio/"+key).success(function(res) { $scope.ratio[key] = res; });
    });

    $scope.cat = {chat: "Chat", money: "Transaction", kill: "Meurtre", jail: "Prison", item: "Item", buy: "Vente", steal: "Vol", connect: "Connexion" };

    angular.forEach($scope.cat, function(val, key) {
      $http.get("https://www.ts-x.eu:8080/tribunal/"+$scope.case+"/"+key).success(function(res) { $scope.tribunal[key] = res; });
    });
  }
});
app.controller('rpSteamIDLookup', function($scope, $http) {

  $scope.$watch('steamid', function(newValue, oldValue) {
    SteamIDLookup(newValue);
  });

  function SteamIDLookup(steamid) {
    var pattern = /^STEAM_[01]:[01]:[0-9]{1,18}$/g;

    if( pattern.test($scope.steamid) ) {
      steamid = steamid.replace("STEAM_0", "STEAM_1").trim();
      $http.get("https://www.ts-x.eu:8080/user/"+steamid)
        .success(function(res) { $scope.$parent.pData = res; $scope.$parent.valid = true; })
        .error(function() { $scope.$parent.pData.name = "ERREUR: SteamID non trouvé"; $scope.$parent.valid = false;});
    }
    else {
      $scope.$parent.valid = false;
      $scope.$parent.pData.name = "ERREUR: SteamID non valide";
    }
  }

});

function lzw_decode(s) {
  var dict = {};
  var data = (s + "").split("");
  var currChar = data[0];
  var oldPhrase = currChar;
  var out = [currChar];
  var code = 256;
  var phrase;
  for (var i=1; i<data.length; i++) {
      var currCode = data[i].charCodeAt(0);
      if (currCode < 256) {
          phrase = data[i];
      }
      else {
         phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
      }
      out.push(phrase);
      currChar = phrase.charAt(0);
      dict[code] = oldPhrase + currChar;
      code++;
      oldPhrase = phrase;
  }
  return out.join("");
}

};
