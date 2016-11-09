<br /><br />
</div>
<div class="col-sm-offset-1 col-sm-8 alert alert-warning" role="alert">
	<p class="txt"><span><img alt="attention" id="img_warning" src="/images/wiki/warning.png"/></span>
	Si cette page n'est plus d'actualité, vous pouvez nous le signaler
	<a target="_blank" href="https://www.ts-x.eu/forum/viewtopic.php?f=10&t=33820">ici</a> ou le modifier vous-même sur <a target="_blank" href="https://github.com/ts-x/TSX-WEB/tree/master/templates/tpl/aide">Github</a></p>
</div>

<script type="text/javascript">
  var app = angular.module("tsx", [])
  .directive("rpItemInformation", function($compile, $http) {
		return {
			template: '<img class="img-circle" width="100" height="100" src="/images/roleplay/csgo/items/{{item.id}}.png" data-toggle="popover" data-placement="top" title="{{item.nom}}" data-content="{{item.prix}}$ vendu par {{item.job}}">',
			replace: false,
			scope: true,
			link: function(scope, element, attr) {
				$http.get("https://www.ts-x.eu/api/items/"+attr.rpItemInformation).success(function(res) {
					scope.item = res;
	      });
			}
		}
  })
	.directive("drawPiePc", function ($compile) {
    return {
      template: '<div class="PCwrapper"><div class="pie spinner" style="transform: rotate({{pc*3.6}}deg)"></div><div class="pie filler" style="opacity: {{pc>=50?1:0}}"></div><div class="mask" style="opacity: {{pc>=50?0:1}}"></div></div>',
      replace: false,
      scope: true,
      link: function(scope, element, attr) {
        scope.pc = attr.drawPiePc;
      },
    }
  })
  .controller("ctrlAide", function($scope, $http) {
		$("body").popover({ selector: '[data-toggle="popover"]', trigger: "hover"});
		$("body").tooltip({ selector: '[data-toggle="tooltip"]', trigger: "hover"});
  })
	.controller("ctrlTabs", function($scope, $http, $attrs) {
		$scope.tabs = "desc";

		$scope.$watch("tabs", function(newValue, oldValue) {

			$scope.users = $scope.items = $scope.jobs = null;
			if( newValue == "memb" )
				$http.get("/api/jobs/"+$attrs.job+"/users").success(function(res) { $scope.users = res; });
			else if( newValue == "item" )
				$http.get("/api/items/job/"+$attrs.job).success(function(res) { $scope.items = res; });
			else if( newValue == "note" || newValue == "hier" )
				$http.get("/api/job/"+$attrs.job).success(function(res) { $scope.jobs = res; });

		});
	});
</script>
