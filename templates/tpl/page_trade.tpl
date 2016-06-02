<script type="text/javascript">

var app = angular.module("tsx", []);
app.controller('ctrl', function($scope, $http, $filter, $location) {

  if( $location.search() !== undefined && Object.keys($location.search())[0] != undefined )
    $scope.steamid = Object.keys($location.search())[0];
  else
    $scope.steamid = _steamid;
  $scope.error = false;
  $scope.loading = true;

  $scope.updateTrading = function() {
    $scope.loading = true;
    $scope.steamid64 = steamIDToProfile($scope.steamid);
    $http.get("https://www.ts-x.eu/api/steam/inventory/"+$scope.steamid).success(function (response) { $scope.error = false; $scope.loading = false; $scope.items = response; }).error(function() { $scope.loading = false; $scope.error = true; });
  }

  $scope.updateTrading();
});

function steamIDToProfile(steamID) {
  var parts = steamID.split(":");
  var iServer = Number(parts[1]);
  var iAuthID = Number(parts[2]);
  var converted = "76561197960265728"
  var lastIndex = converted.length - 1

  var toAdd = iAuthID * 2 + iServer;
  var toAddString = new String(toAdd)
  var addLastIndex = toAddString.length - 1;

  for(var i=0;i<=addLastIndex;i++) {
      var num = Number(toAddString.charAt(addLastIndex - i));
      var j=lastIndex - i;

      do {
          var num2 = Number(converted.charAt(j));
          var sum = num + num2;

          converted = converted.substr(0,j) + (sum % 10).toString() + converted.substr(j+1);

          num = Math.floor(sum / 10);
          j--;
      } while(num);
  }
  return converted;
}
</script>

<div class="col-md-10 col-md-offset-1" ng-app="app" ng-controller="ctrl">
  <input type="text" class="form-control input-sm" ng-model="steamid" ng-change="updateTrading()"/>

  <div ng-show="error" class="col-sm-12 alert alert-danger" role="alert">
    <strong>Votre inventaire est privé.</strong> Vous pouvez modifier les paramètres d'inventaire <a href="http://steamcommunity.com/profiles/{{steamid64}}/edit/settings" />ici</a>.
      <img src="/images/steam-trade.png" />
  </div>
  <div ng-show="loading" class="col-sm-12 alert alert-warning" role="alert">
    Chargement des données...
  </div>
  <div ng-show="items.length == 0" class="col-sm-12 alert alert-warning" role="alert">
    <strong>Votre inventaire est vide.</strong> Vous n'avez aucun item qui n'est pas une caisse, ou qui ne vaut pas au moins 10 centimes.
  </div>
  <div ng-hide="error || loading || items.length == 0">
    <h3>Votre inventaire CS:GO</h3>
    <ul>
      <li ng-repeat="item in items" style="width:150px;height:150px;float:left;border:1px solid black;">
        {{item.name}}
        <br />
        &rarr; {{item.price}}€ &rarr; {{item.price*10000*0.90}}$RP
        <br />
        <img src="http://steamcommunity-a.akamaihd.net/economy/image/{{item.image}}" width="100" />

      </li>
    </ul>
  </div>
</div>
