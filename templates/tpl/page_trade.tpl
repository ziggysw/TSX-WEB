<script type="text/javascript">
var app = angular.module("tsx", []);
app.controller('ctrl', function($scope, $http, $filter, $location) {
  $http.defaults.headers.common['auth'] = _md5;
  $scope.steamid = _steamid;
  $scope.error = false;
  $scope.loading = true;
  $scope.trade = true;
  $scope.link = "{$link}";
  $scope.validLink = false;
  $scope.patternLink = new RegExp(/^https:\/\/steamcommunity\.com\/tradeoffer\/new\/\?partner=([0-9]+)&token=([a-zA-Z0-9]+)$/);

  $scope.loading = true;
  $scope.steamid64 = steamIDToProfile($scope.steamid);
  $http.get("https://www.ts-x.eu/api/steam/inventory/"+$scope.steamid)
    .success(function (response) { $scope.error = false; $scope.loading = false; $scope.items = response; })
    .error(function() { $scope.loading = false; $scope.error = true; });

  $scope.submitLink = function() {
    var match = $scope.link.match($scope.patternLink);
    $http.put("https://www.ts-x.eu/api/steam/trade", {partner: match[1], tokken: match[2]}).success(function(res) {
      console.log(res);
    });
  }
  $scope.offert = function(id) {
    $http.post("https://www.ts-x.eu/api/steam/trade", {itemid: id}).success(function(res) {console.log(res); }).error(function(res) {console.log(res); });
  }
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

<br /><br />

<div class="col-md-10 col-md-offset-1" ng-app="app" ng-controller="ctrl">

  <div ng-show="trade">
    <strong>Nous ne connaissons pas votre lien d'échange</strong> Vous pouvez retrouver votre lien ici: <a href="https://steamcommunity.com/my/tradeoffers/privacy#trade_offer_access_url">ici</a>.
      <a href="https://steamcommunity.com/my/tradeoffers/privacy#trade_offer_access_url">
        <img src="/images/steam-confirm.png" />
      </a>

      <br />
      <form name="form" class="input-group">
          <input type="text" class="form-control" name="link" ng-model="link" required ng-pattern="patternLink"/>
          <span class="input-group-btn">
            <input type="submit" class="btn btn-default" ng-class="form.link.$valid?'btn-success':'btn-warning disabled'" value="Envoyer" ng-click="submitLink()" />
          </span>
      </form>
  </div>



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
    <figure class="img-polaroid col-md-3" ng-repeat="item in items" style="height:150px;float:left;text-align:center;">
        {{item.name}}
        instance: {{item.instanceid}}
        class: {{item.classid}}
        <br /><br />
        <img src="http://steamcommunity-a.akamaihd.net/economy/image/{{item.image}}" width="100" ng-click="offert('6436295075')"/>
        <br /><br />
        {{item.price*10000*0.90 | number: 0 }}$RP
    </figure>
  </div>
</div>
