<link rel="stylesheet" type="text/css" href="/css/wiki/wiki.css" media="screen">
<script type="text/javascript" src="/js/wiki/wiki.js"></script>
<div ng-controller="ctrlAide" >


<br />

	<nav class="navbar navbar-inverse p-navbar" role="navigation" id="mw-navigation">
					<div class="container-fluid">
							<div class="navbar-header">

								<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#mw-navigation-collapse" aria-expanded="false">
									<span class="sr-only">Toggle navigation</span>
									<span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>
								</button>

							<!-- logo and main page link -->
							<div id="p-logo" class="p-logo navbar-brand" role="banner">
								<a href="/index.php?page=aide" title="Page principale"><img src="/w/images/b/bc/Wiki.png" class="img_wiki" width="40" height="40" alt="ts-X.eu :: wiki"></a>
							</div>


							</div>

							<div class="navbar-collapse collapse" id="mw-navigation-collapse" aria-expanded="false" style="height: 0px;"><ul class="nav navbar-nav">
							<!-- navigation -->
							<li id="n-mainpage-description"><a href="/index.php?page=aide" title="Aller à l'accueil [alt-shift-z]" accesskey="z">Accueil</a></li>
							<!-- Nouveaux Joueurs -->
							<li class="dropdown">
								<a href="#" class="dropdown-toggle" data-toggle="dropdown">Nouveaux Joueurs <b class="caret"></b></a>
								<ul class="dropdown-menu dropdown-menu-inverse p-Nouveaux Joueurs" id="p-Nouveaux Joueurs">
										<li id="n-Le-TeamSpeak-.5BTS.5D"><a href="/index.php?page=aide&sub=debuter#GroupD">Le TeamSpeak [TS]</a></li>
										<li id="n-Comment-bien-d.C3.A9buter-.3F"><a href="/index.php?page=aide&sub=debuter">Comment bien débuter ?</a></li>
										<li id="n-Le-Parrainage"><a href="">Le Parrainage [CREA]</a></li>
										<li id="n-Comment-gagner-de-l.27argent-sur-le-Roleplay-.3F"><a href="/index.php?page=aide&sub=argent">Comment gagner de l'argent sur le Roleplay ?</a></li>
										<li id="n-Comment-Trouver-un-job-.3F"><a href="/index.php?page=aide&sub=job">Comment Trouver un job ?</a></li>
										<li id="n-Mettre-en-place-vos-binds"><a href="/index.php?page=aide&sub=bind">Mettre en place vos binds</a></li>
										<li id="n-Qu.27est-ce-que-le-rang-no-pyj-.3F"><a href="/index.php?page=aide&sub=nopyj">Qu'est-ce que le rang no-pyj ?</a></li>
								</ul>
							</li>
							<!-- Rôle-Play -->
							<li class="dropdown">
								<a href="#" class="dropdown-toggle" data-toggle="dropdown">Rôle-Play <b class="caret"></b></a>
								
								<ul class="dropdown-menu p-Rôle-Play" id="p-Rôle-Play">
										<li id="n-Le-R.C3.A8glement-G.C3.A9n.C3.A9ral"><a href="https://www.ts-x.eu/forum/viewtopic.php?f=10&t=26749">Le Règlement Général</a></li>
										<li id="n-La-PvP"><a href="">La PvP[CREA]</a></li>
										<li id="n-Les-r.C3.A9f.C3.A9r.C3.A9s"><a href="">Les référés[CREA]</a></li>
										<li id="n-Les-Crayons-de-Couleurs"><a href="/wiki/Les_Crayons_de_Couleurs">Les Crayons de Couleurs[CREA]</a></li>
								</ul>
							</li>
							<!-- Informations Pratiques -->
							<li class="dropdown">
								<a href="#" class="dropdown-toggle" data-toggle="dropdown">Informations Pratiques <b class="caret"></b></a>
								
								<ul class="dropdown-menu p-Informations Pratiques" id="p-Informations Pratiques">
										<li id="n-Les-futures-mises-.C3.A0-jours"><a href="https://www.ts-x.eu/index.php?page=iframe#/DevZone/" rel="nofollow">Les futures mises à jours</a></li>
										<li id="n-Bugs-et-Probl.C3.A8mes-connus"><a href="/wiki/Bugs_et_Probl%C3%A8mes_connus">Bugs et Problèmes connus [CREA]</a></li>
										<li id="n-Mises-.C3.A0-jours-effectu.C3.A9es"><a href="https://www.ts-x.eu/forum/viewtopic.php?f=10&amp;t=28678&amp;view=unread#unread" rel="nofollow">Mises à jours effectuées</a></li>
										<li id="n-Comment-devenir-Chef-d.27un-m.C3.A9tier-.3F"><a href="/wiki/Devenir_chef_d%27un_m%C3%A9tier">Comment devenir Chef d'un métier ?</a></li>
										<li id="n-Comment-faire-une-record-.3F"><a href="/index.php?page=aide&sub=record">Comment faire une record ?[CREA]</a></li>
										<li id="n-Qui-sont-les-Ts-X"><a href="/wiki/Ts-x">Qui sont les Ts-X[CREA]</a></li>
										<li id="n-Devenir-VIP"><a href="/wiki/Devenir_VIP">Devenir VIP[CREA]</a></li>
										<li id="n-Devenir-membre-CS:GO"><a href="/wiki/Devenir_admin_Fun">Devenir membre CS:GO[CREA]</a></li>
								</ul>
							</li>
							<!-- Outils -->
							<li class="dropdown">
								<a href="#" class="dropdown-toggle" data-toggle="dropdown">Outils <b class="caret"></b></a>
								
								<ul class="dropdown-menu p-Outils" id="p-Outils">
										<li id="n-Importer-une-image"><a href="">Importer une image</a></li>
										<li><a href="">Modifier le Wiki</a></li>
										<li><a href="">Signaler un problème</a></li>
								</ul>
							</li></ul>
								<div class="navbar-right">
									<!-- search form
									<div id="p-search" class="p-search navbar-form" role="search">
										<form id="searchform" class="mw-search form-inline ng-pristine ng-valid" action="/tsx-web/aide/index.tpl">
											<input type="hidden" name="title" value="Spécial:Recherche">
											<div class="input-group">
												<input name="search" placeholder="Rechercher" title="Rechercher dans ts-X.eu :: wiki [alt-shift-f]" accesskey="f" id="searchInput" class="form-control" autocomplete="off">
												<div class="input-group-btn">
													<button value="Lire" id="searchGoButton" name="go" title="Aller vers une page portant exactement ce nom si elle existe." type="submit" class="searchGoButton btn btn-default"><span class="fa fa-share-alt"></span></button>
													<button value="Rechercher" id="mw-searchButton" name="fulltext" title="Rechercher les pages comportant ce texte." type="submit" class="mw-searchButton btn btn-default"><span class="fa fa-search"></span></button>
												</div>
											</div>
										</form>
									</div>
								</div> <!-- navbar-right-aligned -->
							</div><!-- /.navbar-collapse -->
						</div>
					</nav>