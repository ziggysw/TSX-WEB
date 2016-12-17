$.fn.exists = function() {
	return $(this).length > 0;
}
$(document).ready(function() {
	$(".no_visible").animate({ opacity: 0.0 }, 0);
	MakingTextEffect();
	$('.carousel').carousel();
	$("body").popover({ selector: '[data-toggle="popover"]', trigger: "hover",  html : true});
});

function MakingAlert(titre, text) {
	$("#modalAlertSomewhere").remove();
	var str = '<div class="modal fade" id="modalAlertSomewhere"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close">&#215;</button><h3 class="text-info modal-title" id="myModalLabel">' + titre + '</h3></div><div class="modal-body">' + text + '</div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Fermer</button></div></div></div></div>';
	$("body").append(str);
	$('#modalAlertSomewhere').modal('show');
}

function MakingTextEffect() {
	$(".blinking").animate({ opacity: 1.0}, 500).animate({ opacity: 0.0 }, 500, function() { MakingTextEffect(); });
}

var amountScrolled = 200;
$(window).scroll(function() {
	if ( $(window).scrollTop() > amountScrolled )
		$('a#toTop').fadeIn();
	else
		$('a#toTop').fadeOut();
});
$('a#toTop').click(function() {
	$('html, body').animate({scrollTop: 0}, 700); return false;
});

function tsxWebcam(nick) {
	var chanName = "239029302382932tsx";
	var webrtc = new SimpleWebRTC({
		localVideoEl: 'localVideo',
		remoteVideosEl: '',
		autoRequestMedia: true
	});
	webrtc.on('readyToCall', function() {
		webrtc.joinRoom(chanName);
		webrtc.mute();
	});
	webrtc.on('videoAdded', function(video, peer) {
		var dc = peer.getDataChannel(chanName);
		var remotes = document.getElementById('remotesVideos');
		if (remotes) {
			var container = document.createElement('div');
			container.className = 'videoContainer';
			container.id = 'container_' + webrtc.getDomId(peer);
			var span = document.createElement("span");
			container.appendChild(span);
			container.appendChild(video);
			video.oncontextmenu = function() {
				return false;
			};
			remotes.appendChild(container);
		}
		setTimeout(function() {
			webrtc.sendDirectlyToAll(chanName, 'setDisplayName', nick);
		}, 500);
	});
	webrtc.on('videoRemoved', function(video, peer) {
		var remotes = document.getElementById('remotesVideos');
		var el = document.getElementById(peer ? 'container_' + webrtc.getDomId(peer) : 'localScreenContainer');
		if (remotes && el) {
			remotes.removeChild(el);
		}
	});
	webrtc.on('videoOff', function() {
		webrtc.leaveRoom();
		location.href = location.href;
	});
	webrtc.on('videoOn', function() {
		webrtc.joinRoom(chanName);
		webrtc.mute();
	});
	webrtc.on('channelMessage', function(peer, label, data) {
		if (data.type == 'setDisplayName') {
			var name = data.payload;
			$("#container_" + peer.id + "_video_incoming").find("span").html(name);
		}
	});
}
_app.directive("rpItemInformation", function($compile, $http) {
 	return {
  		template: '<img class="img-circle" width="100" height="100" src="/images/roleplay/csgo/items/{{item.id}}.png" data-toggle="popover" data-placement="top" title="{{item.nom}} <i class=\'pull-right text-success\'>{{item.prix}}$</i>" data-content="{{item.description}}" alt="{{item.nom}}">',
		replace: false, scope: true,
		link: function(scope, element, attr) {
			$http.get("https://www.ts-x.eu/api/items/"+attr.rpItemInformation).success(function(res) { scope.item = res; });
		}
	}
});

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
