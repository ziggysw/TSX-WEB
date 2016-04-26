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
		<article class="col-sm-8 comments">
			<div class="row">
				<a href="/forum/search.php?search_id=unreadposts"><h4 class="text-center">Pendant ce temps, sur le forum...</h4></a>
				<ul class="list3">
					{$listForum}
				</ul>
			</div>
		</article>
		<article class="col-sm-2">
			<div class="row">
				<h4>Les vidéos RP</h4>
				<div class="video">
					<p>Braquages:</p><br />
					<figure class="img-polaroid"><a class="various" href="https://www.youtube.com/watch?v=RtNNPcaTzO0" style="opacity: 1;"></a><img alt="" src="//i.ytimg.com/vi_webp/RtNNPcaTzO0/mqdefault.webp" style="max-width:100%;"></figure>
			    </div>
			</div>
		</article>
	</div>
	<br /><br />
	<div class="container">
		<p>Copyright &copy; 2010-2016 &bull; <a href="https://www.ts-x.eu">ts-x.eu</a> &bull; KoSSoLaX`</p>
	</div>
	<div id="lights"></div>
</footer>
	<script type="text/javascript" src="https://www.ts-x.eu/js/compile-bootstrap-globals-jquery.event.move.js"></script>
	<script type="text/javascript">
		$.getJSON("https://www.ts-x.eu/api/live/sondage/"+_steamid, function( data ) {
			if( parseInt(data) == 0 ) {
				$("#homer").css('display', 'block').css('opacity', '0').animate({ opacity: "1", height: "200px"}, 1000, function() {
					$("#homerTalk").css('display', 'block').css('opacity', '0').animate({ opacity: "1", fontSize: "12px"}, 1000);
				});
			}
		});
	</script>
	<div id="homer" style="display:none; position:fixed; height:0px; width:200px; float:right; right: 0px; bottom:0px;"><img src="/images/homer-1.gif" width="200"/>
		<div id="homerTalk" style="display:none; position:absolute; top:-50px; left:-70px; font-weight:bold; font-size:0px; background-color:white;border:2px solid black; color:black; padding:10px;">
			<a href="/index.php?page=sondage" style="font-weight:bold; color:black;">Ohhhh, un sondage est arrivé <br />Complète le pour 10.000$RP!</a>
		</div>
	</div>
</body>
</html>
