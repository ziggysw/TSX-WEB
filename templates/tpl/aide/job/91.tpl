<div ng-controller="ctrlTabs" data-job="111">
	<ul class="nav nav-tabs" role="tablist">
		<li><a ng-click="tabs='desc'">Présentation </a></li>
		<li><a ng-click="tabs='memb'">Employés </a></li>
		<li><a ng-click="tabs='hier'">Hiérarchie </a></li>
		<li><a ng-click="tabs='note'">Shownote </a></li>
		<li><a ng-click="tabs='item'">Boutique </a></li>
		<li><a ng-click="tabs='quest'">Quêtes </a></li>
	</ul>

	<div class="tab-content" style="width:100%;">
		<div role="tabpanel" class="tab-pane active" ng-show="tabs=='desc'">
					<hr class="featurette-divider">
					<h2 class="text-center">Qui sommes nous :</h2><br />
					<hr class="featurette-divider">
					<p>La Cosa Nostra est la famille la plus respecté de Princeton, voler au riche pour donner au pauvres n'est 
					pas du tout notre devise.<br />
					Seul notre profit personnel compte !</p>
					<hr class="featurette-divider">
					<h2 class="text-center">Informations :</h2><br />
					<hr class="featurette-divider">
					<p><u>Siè</u>g<u>es social :</u> Rue de la soif</p><br/>
					<p><u>Distinctions :</u> Ennemis Publique N°1 depuis plus de 5 ans, souvent immité mais jamais égalé !</p>
				
					<hr class="featurette-divider">
					<h2 class="text-center">Recrutement :</h2><br />
					<hr class="featurette-divider">
					<p>Nous sommes des hommes d'honneur, toute personne ailant un passé de hors la lois et le bienvenue chez nous.<br />
					Escrocs, assassin et voleur sont les bienvenue chez nous.</p>
					<br />
					<center><a href="https://www.ts-x.eu/forum/viewforum.php?f=35" class="btn btn-md btn-success"><i class="fa fa-user"></i> Déposer une candidature spontanée</a></center>
					<br />
		</div>
		<div role="tabpanel" class="tab-pane active" ng-show="tabs=='memb'">
			<h2 class="text-center"><u>Liste des emplo</u>y<u>és :</u></h2><br /><br />
			<i ng-hide="users" ng-repeat="i in [5,4,3,2,1]" class="fa fa-cog fa-spin fa-{{i}}x"></i>
			<table width="100%" class="table-condensed">
				<tbody><!-- methode un peut dégueux pour centrer, a revoir vite ! -->
					<tr>
						<th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
						<th class="text-center"><h3>Poste occupé :</h3></th>
						<th><h3>Noms :</h3></th>
						<th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
					</tr>
					<tr ng-repeat="user in users">
						<th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
						<th class="text-center"><span style="color: #003f75;">{{user.name}} </span></th>
						<th><span style="color: #999;">{{user.nick}}</span></th>
					</tr>
				</tbody>
			</table><br />
		</div>
		<div role="tabpanel" class="tab-pane active" ng-show="tabs=='hier'">
			 <h2 class="text-center"><u>La hiérarchie de l'entre</u>p<u>rise :</u></h2><br />
			  <i ng-hide="jobs" ng-repeat="i in [5,4,3,2,1]" class="fa fa-cog fa-spin fa-{{i}}x"></i>
				<table width="100%" class="table-condensed">
					<tbody>
						<tr>
							<th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
							<th>Rang:</th>
							<th>Paye:</th>
							<th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
						</tr>
						<tr ng-repeat="job in jobs.sub" ng-if="job.id!=0">
							<th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
							<th><span style="color: #003f75;">{{job.name}} </span></th>
							<th><span style="color: green;">{{job.pay}} $rp</span></th>
							<th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
						</tr>
					</tbody>
				</table><br />
				<p class="text-center"> Nous avons actuellement {{jobs.quota}} vendeurs régulier dans  notre entreprise.</p>
		</div>
		<div role="tabpanel" class="tab-pane active" ng-show="tabs=='note'">
			<h2 class="text-center"><u>Le rè</u>g<u>lement interne :</u></h2><br />
			<i ng-hide="jobs" ng-repeat="i in [5,4,3,2,1]" class="fa fa-cog fa-spin fa-{{i}}x"></i>
			<ul>
				<li ng-repeat="note in jobs.notes"><span style="color: #999;">{{note.name}}</span></li>
			</ul><br />
		</div>
		<div role="tabpanel" class="tab-pane active" ng-show="tabs=='item'">
			<h2><u>Nos Produits :</u></h2><br /><br />
			<i ng-hide="items" ng-repeat="i in [5,4,3,2,1]" class="fa fa-cog fa-spin fa-{{i}}x"></i>
			<span ng-repeat="item in items" rp-item-information="{{item.id}}"></span><br />
		</div>
		<div role="tabpanel" class="tab-pane active" ng-show="tabs=='quest'">
			<h2>Nos missions :</h2><br />
			<table class="table-condensed">
				<tbody>
					<tr>
						<td><h3 class="ocean">Nom de la quête</h3></td>
						<td><h3 class="pomme">Gain </h3></td>
						<td><h3 class="prune">Objectif :</h3></td>
					</tr>
					<tr>
						<td>Délivrance</td>
						<td>1.000$RP par prisonniers</td>
						<td>Infiltrez-vous dans la prison et libérer un maximum de prisonnier.</td>
					</tr>
					<tr>
						<td>Où est Charlie?</td>
						<td>1.000$RP par zone découverte</td>
						<td>Rendez-vous dans 5 zones aléatoires de la ville.</td>
					</tr>
					<tr>
						<td>Documents secrets</td>
						<td>5.000$RP</td>
						<td>Rendez-vous dans la villa PvP pour voler des documents secrets <br />
						et retournez dans votre planque pour les déposer.</td>
					</tr>
					<tr>
						<td>Traffic illégal</td>
						<td>5.000$RP</td>
						<td>Introduisez-vous dans le commissariat jusqu'au distributeur d'arme<br />
						et volez-en le plus possible !</td>
					</tr>
					<tr>
						<td>Braquage des distributeurs</td>
						<td>2.500$RP</td>
						<td>Crochetez tous les distributeurs présents dans les stations de métro</td>
					</tr>
				</tbody>
			</table><br />
		</div>
	</div>
</div>
