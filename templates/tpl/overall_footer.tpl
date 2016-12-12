	<a href="#" id="toTop"><span id="toTopHover"></span></a>
</div>
<footer>
	<div class="container">
		<article class="col-sm-2">
			<div class="row">
				<h4>Les journaux</h4>
				<ul class="list2">
					{$listJournal}
				</ul>
			</div>
		</article>
		<article class="col-sm-7 comments">
			<div class="row">
				<a href="/forum/search.php?search_id=unreadposts"><h4 class="text-center">Pendant ce temps, sur le forum...</h4></a>
				<ul class="list3" style="word-wrap: break-word;">
					{$listForum}
				</ul>
			</div>
		</article>
		<article class="col-sm-offset-1 col-sm-2">
			<div class="row">
				<h4>La Ts-X tv présente :</h4>
				<div class="video">
					<p>Les Braquages</p><br />
					<figure><a class="various" target="_blank" href="https://www.youtube.com/watch?v=RtNNPcaTzO0" style="opacity: 1;"></a><img alt="ts_x" src="/images/tv_tsx_brkg.png" class="img_phone"></figure>
			    </div>
			</div>
		</article>
	</div>
	<br /><br />
	<div class="container">
		<p>Copyright &copy; 2010-2016 &bull; <a href="https://www.ts-x.eu">ts-x.eu</a> &bull; KoSSoLaX`</p>
	</div>

	<style>
		.bulb {
			background-image: url("/images/bulbs-32x32-bottom.png");
			display: inline-block;
			width: 32px;
			height: 32px;
			position: fixed;
			bottom: 0px;
		}
		.bulblette {
			display: inline-block;
			width: 32px;
			height: 32px;
			position: fixed;
			font-size: 20px;
		}

	</style>
	<script type="text/javascript">
		_app.controller("lights", function($scope, $window, $http, $interval) {
			$scope.bulb = new Array();
			for(var i=0; i < Math.floor($window.innerWidth / 32) - 1; i++) {
				$scope.bulb.push( {id: i, color: Math.floor(Math.random()*4) , state: Math.floor(Math.random()*2)} );
			}

			$scope.colors = ["#19f", "#aaa", "#f22", "#080"];

			$interval(function() {
				for(var i=0; i < $scope.bulb.length; i++) {
					if( Math.random() < 0.1 && $scope.bulb[i].state != 2 )
						$scope.bulb[i].state = Math.floor(Math.random()*2);
				}
			}, 100);

			$scope.explode = function(i) {
				if( $scope.bulb[i].state != 2 ) {
					$scope.bulb[i].state = 2;

					var audio = new Audio('/sound/glass'+Math.floor(Math.random()*5)+'.mp3');
					audio.volume = 0.01;
					audio.play();

					$http.put("/api/forum/bulb");

					for(var j=0; j<4; j++)
						$scope.particles(i);
				}
			}

			$scope.particles = function(i) {
				var html = document.createElement("span");

				html.innerHTML = "&bull;";
				html.className = "bulblette";
				html.style.color = $scope.colors[$scope.bulb[i].color];
				html.style.left = 32*i + Math.floor(Math.random()*32) + "px";
				html.style.bottom = Math.floor(Math.random()*10) + "px";

				document.body.appendChild(html);

				var promise = $interval(function() {
					var px = parseInt(html.style.bottom);
					html.style.bottom = px - 2 +"px";

					if( px < -16 ) {
						document.body.removeChild(html);
						$interval.cancel(promise);
					}
				}, 20);

			}
		});

	</script>

	<div ng-controller="lights" id="lights">
		<div ng-repeat="i in bulb track by $index"
			class="bulb bulb-{{i.color}}"
			style="left:{{i.id*32}}px; background-position: -{{i.state*32}}px {{i.color*32}}px;" ng-mouseover="explode(i.id)"></div>
	</div>
</footer>
	<script type="text/javascript" src="https://www.ts-x.eu/js/compile-bootstrap-globals-jquery.event.move.js"></script>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	ga('create', 'UA-32533306-1', 'ts-x.eu');
	ga('send', 'pageview');
</script>
</body>
</html>
