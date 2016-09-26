<div ng-controller="ctrlTabs" data-job="111">
	<ul class="nav nav-tabs" role="tablist">
		<li><a ng-click="tabs='desc'">Présentation </a></li>
		<li><a ng-click="tabs='memb'">Employés </a></li>
		<li><a ng-click="tabs='hier'">Hiérarchie </a></li>
		<li><a ng-click="tabs='note'">Shownote </a></li>
		<li><a ng-click="tabs='quest'">Quêtes </a></li>
	</ul>

	<div class="tab-content" style="width:100%;">
		<div role="tabpanel" class="tab-pane active" ng-show="tabs=='desc'">
					<hr class="featurette-divider">
					<h2 class="text-center">Qui sommes nous :</h2><br />
					<hr class="featurette-divider">
					<p>Le tribunal de Princeton est le performant du compté, plus de 50 procès par jours,<br/>
					nos juges sont formé sur le terrain immédiatement après leurs études de droit et nous leur offrons de réelle 
					évolution de carrière.</p>
					<hr class="featurette-divider">
					<h2  class="text-center">Informations :</h2><br />
					<hr class="featurette-divider">
					<p><u>Siè</u>g<u>es social :</u> </p><br/>
					<p><u>Distinctions :</u> Plus jolie tribunal du compté, premier tribunal à avoir aboli la peine de mort.</p>
				
					<hr class="featurette-divider">
					<h2 class="text-center">Recrutement :</h2><br />
					<hr class="featurette-divider">
					<p>Nos séssions de formation sont journalière, nous recrutons sur présentation de votre carte No-pyj et sur validation d'un test oral.</p>
					<br />
					<center><a href="https://www.ts-x.eu/forum/viewforum.php?f=35" class="btn btn-md btn-success"><i class="fa fa-user"></i> Déposer une candidature spontanée</a></center>
					<br />
		</div>
		<div role="tabpanel" class="tab-pane active" ng-show="tabs=='memb'">
			<h2 class="text-center"><u>Liste des em</u>p<u>lo</u>y<u>és :</u></h2><br /><br />
			<i ng-hide="users" ng-repeat="i in [5,4,3,2,1]" class="fa fa-cog fa-spin fa-{{i}}x"></i>
			<table width="60%" class="table-condensed employes">
				<tbody>
					<tr>
						<th class="text-center"><h3>Poste occupé :</h3></th>
						<th><h3>Noms :</h3></th>
					</tr>
					<tr ng-repeat="user in users">
						<th class="text-center"><span style="color: #003f75;">{{user.name}} </span></th>
						<th><span style="color: #999;">{{user.nick}}</span></th>
					</tr>
				</tbody>
			</table><br />
		</div>
		<div role="tabpanel" class="tab-pane active" ng-show="tabs=='hier'">
			 <h2 class="text-center"><u>La hiérarchie de l'entre</u>p<u>rise :</u></h2><br />
			  <i ng-hide="jobs" ng-repeat="i in [5,4,3,2,1]" class="fa fa-cog fa-spin fa-{{i}}x"></i>
				<table width="40%" class="table-condensed hierarchie">
					<tbody>
						<tr>
							<th>Rang:</th>
							<th>Paye:</th>
						</tr>
						<tr ng-repeat="job in jobs.sub" ng-if="job.id!=0">
							<th><span style="color: #003f75;">{{job.name}} </span></th>
							<th><span style="color: green;">{{job.pay}} $rp</span></th>
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
						<td>	Un homme très recherché</td>
						<td>2 500$rp</td>
						<td>Vous avez 12 heures pour le trouver et l'arrêter un homme recherché par le tribunal.</td>
					</tr>
					<tr>
						<td>La justice exprès</td>
						<td>2 500$rp</td>
						<td>Vous avez 24 minutes pour condamner 3 joueurs différents dans votre Tribunal.<br />
						(100$RP d'amende et 3h de prison minimum).</td>
					</tr>
					<tr>
						<td>La justice sournoise</td>
						<td>5 000$rp</td>
						<td>Prenez une plainte pour meurtre sur votre cible et condamnez le.<br />
						(100$RP d'amende et 3h de prison minimum)</td>
					</tr>
				</tbody>
			</table><br />
		</div>
	</div>
</div>
