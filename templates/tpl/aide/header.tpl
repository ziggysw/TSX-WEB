<link rel="stylesheet" type="text/css" href="/css/wiki/wiki.css" media="screen"> 
<script type="text/javascript" src="/js/wiki/wiki.js"></script>

<style>
.PCwrapper {
	position: relative;
	background: url(/images/pattern.png) repeat;
	width: 110px;
	height: 110px;
	border: 1px solid #aaa;
	border-radius: 100%;
	margin-left:90px;
	margin-top: 10px;
}
.PCwrapper, .PCwrapper * {
	-moz-box-sizing: border-box;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
}
.PCwrapper .pie {
	width: 50%;
	height: 100%;
	transform-origin: 100% 50%;
	position: absolute;
	background: #aaa;
}
.PCwrapper .spinner {
	border-radius: 100% 0 0 100% / 50% 0 0 50%;
	z-index: 200;
}
.PCwrapper .filler {
	border-radius: 0 100% 100% 0 / 0 50% 50% 0;
	left: 50%;
	opacity: 0;
	z-index: 100;
}
.PCwrapper .mask {
	width: 50%;
	height: 100%;
	position: absolute;
	background: inherit;
	opacity: 1;
	z-index: 300;
	border-radius: 100% 0 0 100% / 50% 0 0 50%;
}
</style>

<div ng-controller="ctrlAide" id="mainWiki">
<div class="hidden-sm hidden-md hidden-lg alert alert-danger" role="alert"><br />
					  <span><img alt="attention" id="img_warning" src="/images/wiki/warning.png"/></span>
					  Vous êtes actuellement sur une Version Beta du mode téléphone.
					</div>
<br /><br />
<div class="row">
	<div class="col-sm-3 hidden-phone">
		<div class="container">
			<div class="col-sm-3 hidden-phone">
				<div ng-controller="search"">
					<input class="form-control" type="text" placeholder="Rechercher" ng-model="search">
					<ul>
						<li ng-repeat="item in data"><a href="index.php?page=aide&sub={{item.ref}}">{{item.ref}}</a></li>
					</ul>
				</div>
				<div class="panel-group" id="accordion">
				<!--<div class="panel panel-wiki">
						<div class="panel-heading">
							<h4 class="panel-title">
								<a data-toggle="collapse" data-parent="#accordion" href="#Menupage"><i class="fa fa-chevron-right" aria-hidden="true"></i>
								[menu page]</a>
							</h4>
						</div>
						<div id="Menupage" class="panel-collapse collapse in">
							<ul class="list-group">
								<li class="list-group-item">1</li>
								<li class="list-group-item">2</li>		
								<li class="list-group-item">3</li>
								<li class="list-group-item">4</li>
							</ul>
						</div>			
					</div>-->
					<div class="panel panel-wiki">
						<div class="panel-heading">
							<h4 class="panel-title">
								<a href="/index.php?page=aide"><i class="fa fa-chevron-right" aria-hidden="true"></i>
								Accueil</a>
							</h4>
						</div>
					</div>
					<div class="panel panel-wiki">
						<div class="panel-heading">
							<h4 class="panel-title title-nav">
								<a data-toggle="collapse" data-parent="#accordion" href="#MenuOne"><i class="fa fa-chevron-right" aria-hidden="true"></i>
								Débuter</a>
							</h4>
						</div>
						<div id="MenuOne" class="panel-collapse collapse">
							<ul class="list-group">
								<li class="list-group-item"><a href="/index.php?page=aide&sub=debuter"><i class="fa fa-book hidden-xs hidden-sm" aria-hidden="true"></i> Comment bien débuter</a></li>
								<li class="list-group-item"><a href="/index.php?page=aide&sub=emploi"><i class="fa fa-map-o hidden-xs hidden-sm" aria-hidden="true"></i> Trouver un emploi</a></li>
								<li class="list-group-item"><a href="/index.php?page=aide&sub=argent"><i class="fa fa-money hidden-xs hidden-sm" aria-hidden="true"></i> Gagner de l'argent</a></li>
								<li class="list-group-item"><a href="/index.php?page=aide&sub=bind"><i class="fa fa-keyboard-o hidden-xs hidden-sm" aria-hidden="true"></i> Comment faire un bind</a></li>
								<li class="list-group-item"><a href="/index.php?page=aide&sub=argent#GroupDSub2"><i class="fa fa-bomb hidden-xs hidden-sm" aria-hidden="true"></i> Les events</a></li>
								<li class="list-group-item"><a href="/index.php?page=aide&sub=mairie"><i class="fa fa-medium hidden-xs hidden-sm" aria-hidden="true"></i> La Mairie</a></li>
								<li class="list-group-item"><a href="/index.php?page=aide&sub=pvp"><i class="fa fa-shield hidden-xs hidden-sm" aria-hidden="true"></i> La PvP</a></li>
								<li class="list-group-item"><a href="/index.php?page=aide&sub=debuter#GroupD"><i class="fa fa-heart hidden-xs hidden-sm" aria-hidden="true"></i> Le Mariage [☻CREA☻]</a></li>
								<li class="list-group-item"><a href="/index.php?page=aide&sub=crayon"><i class="fa fa-paint-brush hidden-xs hidden-sm" aria-hidden="true"></i> Les crayons de couleur</a></li>
							</ul>
						</div>
					</div>
					<div class="panel panel-wiki">
						<div class="panel-heading panel-menu-header">
							<h4 class="panel-title">
								<a data-toggle="collapse" data-parent="#accordion" href="#MenuTwo"><i class="fa fa-chevron-right" aria-hidden="true"></i>
								Administration</a>
							</h4>
						</div>
						<div id="MenuTwo" class="panel-collapse collapse">
							<ul class="list-group">
								<li class="list-group-item"><a href="/index.php?page=aide&sub=nopyj"><i class="fa fa-graduation-cap hidden-xs hidden-sm" aria-hidden="true"></i> Le rang No-pyj</a></li>
								<li class="list-group-item"><a href="https://www.ts-x.eu/forum/viewtopic.php?f=10&t=26749"><i class="fa fa-university hidden-xs hidden-sm" aria-hidden="true"></i> Règlement général</a></li>
								<li class="list-group-item"><a href="/index.php?page=aide&sub=admin#GroupB"><i class="fa fa-user-plus hidden-xs hidden-sm" aria-hidden="true"></i> Les référés</a></li>
								<li class="list-group-item"><a href="/index.php?page=aide&sub=emploi#GroupE"><i class="fa fa-user-secret hidden-xs hidden-sm" aria-hidden="true"></i> Devenir chef de Job</a></li>
								<li class="list-group-item"><a href="/index.php?page=aide&sub=admin#GroupC"><i class="fa fa-wheelchair hidden-xs hidden-sm" aria-hidden="true"></i> Passer VIP</a></li>
								<li class="list-group-item"><a href="/index.php?page=aide&sub=admin#GroupA"><i class="fa fa-coffee hidden-xs hidden-sm" aria-hidden="true"></i> Qui sont les Ts-x</a></li>
								<li class="list-group-item"><a href="/index.php?page=aide&sub=admin#GroupD"><i class="fa fa-rebel hidden-xs hidden-sm" aria-hidden="true"></i> Être membre CS:GO</a></li>
							</ul>
						</div>
					</div>
					<div class="panel panel-wiki">
						<div class="panel-heading">
							<h4 class="panel-title">
								<a data-toggle="collapse" data-parent="#accordion" href="#MenuThree"><i class="fa fa-chevron-right" aria-hidden="true"></i>
								Aide</a>
							</h4>
						</div>
							<div id="MenuThree" class="panel-collapse collapse">
							<ul class="list-group">
								<li class="list-group-item"><a href="/index.php?page=aide&sub=debuter#GroupF"><i class="fa fa-headphones hidden-xs hidden-sm" aria-hidden="true"></i> Le teamspeack</a></li>
								<li class="list-group-item"><a href="/index.php?page=aide&sub=record"><i class="fa fa-video-camera hidden-xs hidden-sm" aria-hidden="true"></i> Faire une record</a></li>
								<li class="list-group-item"><a href="https://www.ts-x.eu/index.php?page=iframe#/DevZone/"><i class="fa fa-ticket hidden-xs hidden-sm" aria-hidden="true"></i> Les futures maj</a></li>
								<li class="list-group-item"><a href="/index.php?page=aide&sub=help"><i class="fa fa-bug hidden-xs hidden-sm" aria-hidden="true"></i> Bugs et problèmes</a></li>
								<li class="list-group-item"><a href="https://www.ts-x.eu/forum/viewtopic.php?f=10&amp;t=28678&amp;view=unread#unread"><i class="fa fa-check hidden-xs hidden-sm" aria-hidden="true"></i> Mise à jour effectué</a></li>
							</ul>
						</div>
					</div>
					<div class="panel panel-wiki">
						<div class="panel-heading">
							<h4 class="panel-title">
								<a data-toggle="collapse" data-parent="#accordion" href="#MenuFour"><i class="fa fa-chevron-right" aria-hidden="true"></i>
								Outils</a>
							</h4>
						</div>
						<div id="MenuFour" class="panel-collapse collapse">
							<ul class="list-group">
								<li class="list-group-item"><a href="/web/messorem/images/"><i class="fa fa-file-image-o hidden-xs hidden-sm" aria-hidden="true"></i> Importer une image</a></li>
								<li class="list-group-item"><a href="https://www.ts-x.eu/forum/viewtopic.php?f=10&t=33820&view=unread#unread"><i class="fa fa-exclamation-triangle hidden-xs hidden-sm" aria-hidden="true"></i> Signaler un problème</a></li>
								<li class="list-group-item"><a href="https://github.com/ts-x/TSX-WEB/tree/master/templates/tpl/aide"><i class="fa fa-cog hidden-xs hidden-sm" aria-hidden="true"></i> Modifier le wiki</a></li>
								<li class="list-group-item"><a href="/index.php?page=aide&sub=vip"><i class="fa fa-database hidden-xs hidden-sm" aria-hidden="true"></i> Beta vip</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
