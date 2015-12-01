$.fn.exists = function() {
	return $(this).length > 0;
}
$(document).ready(function() {
	$(".no_visible").animate({ opacity: 0.0 }, 0);
	MakingTextEffect();
	$('.carousel').carousel();
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
