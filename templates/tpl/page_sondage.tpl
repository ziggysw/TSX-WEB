<script type="text/javascript">
	_app.controller('sondage', function($scope) {
	    $scope.step = 0;
			$scope.restart = function() {
				if( window.confirm("Toutes vos réponses seront supprimées, êtes vous sur de vouloir recommencer le sondage ?") ) {
					location.href = "/index.php?page=sondage";
				}
			}
	});
</script>
<style>
	#sondage_form > div, #sondage_form > div > div {
		font-size: 14px;
	}
</style>
<form role="form" class="form-inline col-sm-offset-1 col-sm-11" action="index.php?page=sondage&action=post" method="post" id="sondage_form" ng-controller="sondage" >
	<img src="https://i.gyazo.com/0d7a97f6c7a8d2a3cd0dd7927eaf80eb.png">
	<div class="progress" ng-hide="step==0"><div class="progress-bar" role="progressbar" aria-valuenow="{{step/80*100}}" aria-valuemin="0" aria-valuemax="100" style="width: {{step/80*100}}%;">{{step/80*100 | number: 0}}%</div></div>

	<br clear="all" />

	<div class="row" ng-show="step==0">
		<div style="color:white;" class="row" ng-show="step==0">
		<p class="col-sm-9 col-sm-offset-1"><br><br>
        	 En 6 années d'existence, notre serveur n'a pas cessé d'évoluer et de s'améliorer.<br />
		Des nouveautés sortent chaque semaine sur le serveur et ce qui le rend unique,
		mais nous ne souhaitons pas nous arrêter là et nous espérons vivre encore quelque années de plus à vos côtés. <br />
        	Nous avons quelques questions à vous poser afin de suivre la bonne voie.<br />
		<br /><br />
		Ce sondage vous prendra 10 à 15 minutes pour y répondre et il est anonyme.</p>
  <br><br>
		<a class="btn btn-primary pull-right" ng-click="step=1">Commencer le sondage</a>

	</div>
	<div class="row" ng-show="step>=1 && step < 10">
		<h3>Les débutants</h3>
		<div class="form-group col-sm-12" ng-show="step==1">
			<div class="col-sm-12">Pensez-vous que le tutorial du serveur est assez complet ?</div>
			<label class="col-sm-offset-3 col-sm-3"><input type="radio" name="q1" value="1" ng-click="step=4" /> Oui</label>
			<label class="col-sm-3"><input type="radio" name="q1" value="0"  ng-click="step=2"/> Non</label>
		</div>
		<div class="form-group col-sm-12" ng-show="step==2">
			<div class="col-sm-12">Avez-vous eu des difficultés à l’une des étapes du tutorial ?</div>
			<label class="col-sm-offset-3 col-sm-3"><input type="radio" name="q2" value="1" ng-click="step=3" /> Oui</label>
			<label class="col-sm-3"><input type="radio" name="q2" value="0" ng-click="step=4" /> Non</label>
		</div>
		<div class="form-group col-sm-12" ng-show="step==3">
			<div class="col-sm-12">Quelles étapes trouvez-vous difficiles ?</div>
			<select name="q3" class="form-control col-sm-offset-3 col-sm-6">
				<option value="0">Aucune</option>
				<option value="1">Mettre son argent en sécurité</option>
				<option value="2">Se procurer le deagle</option>
				<option value="3">Poser une machine à faux billet</option>
				<option value="4">Poser un plant de drogue</option>
				<option value="5">Parler dans le chat local</option>
				<option value="6">Aller sur le wiki (/aide)</option>
				<option value="7">Trouver les lieux sur la map</option>
			</select>
			<a class="btn btn-success" ng-click="step=4">Suivant</a>
		</div>
		<div class="form-group col-sm-12" ng-show="step==4">
			<div class="col-sm-12">Avez-vous eu des difficultés à jouer sur le serveur après le tutorial ?</div>
			<label class="col-sm-offset-3 col-sm-3"><input type="radio" name="q4" value="1" ng-click="step=5" /> Oui</label>
			<label class="col-sm-3"><input type="radio" name="q4" value="0" ng-click="step=10" /> Non</label>
		</div>
		<div class="form-group col-sm-12" ng-show="step==5">
			<div class="col-sm-12">Quelles étaient vos difficultés ?</div>
			<label class="col-sm-offset-3 col-sm-8"><input type="checkbox" name="q5" value="0">Je suis resté trop longtemps sans emploi</label>
			<label class="col-sm-offset-3 col-sm-8"><input type="checkbox" name="q5" value="1">Il y a trop de meurtres en ville</label>
			<label class="col-sm-offset-3 col-sm-8"><input type="checkbox" name="q5" value="2">Il y a trop de commandes à connaître</label>
			<label class="col-sm-offset-3 col-sm-8"><input type="checkbox" name="q5" value="3">Le tutorial devrait expliquer le premier job</label>
			<a class="btn btn-success" ng-click="step=10">Suivant</a>
		</div>
	</div>

	<div class="rows" ng-show="step>=10 && step < 20">
		<h3>Les quêtes</h3>
		<div class="form-group col-sm-12" ng-show="step==10">
			<div class="col-sm-12">Connaissez-vous les quêtes sur le roleplay ?</div>
			<label class="col-sm-offset-3 col-sm-3"><input type="radio" name="q10" value="1" ng-click="step=11"/> Oui</label>
			<label class="col-sm-3"><input type="radio" name="q10" value="0" ng-click="step=20" /> Non</label>
		</div>
		<div class="form-group col-sm-12" ng-show="step==11">
			<div class="col-sm-12">Quelle est votre quête préférée ?</div>
			<select name="q11" class="form-control col-sm-offset-3 col-sm-6">
				<option value="0">Aucune</option>
				<option value="1">18th: Blanchiment d'argent</option>
				<option value="2">18th: Vol de voiture</option>
				<option value="3">Dealer: Surveillance des plants</option>
				<option value="4">Dealer: Récolte des plants</option>
				<option value="5">Justice: La justice sournoise</option>
				<option value="6">Justice: La justice express</option>
				<option value="7">Justice: Un homme très recherché</option>
				<option value="8">Mafia: Délivrance</option>
				<option value="9">Mafia: Où est Charlie?</option>
				<option value="10">Mafia: Documents secrets</option>
				<option value="11">Mercenaire: Le justicier masqué</option>
				<option value="12">Mercenaire: Un coup de main pour la justice</option>
				<option value="13">Police: Suivez le lapin blanc</option>
				<option value="14">Police: Surveillance renforcée</option>
				<option value="15">Police: Non à la contrebande</option>
				<option value="16">Technicien: Sous écoute</option>
				<option value="17">Technicien: Surveillance des machines</option>
				<option value="18">Job de vente: Collecte des matières premières</option>
				<option value="19">Job de vente: Employé modèle</option>
			</select>
			<a class="btn btn-success" ng-click="step=12">Suivant</a>
		</div>
		<div class="form-group col-sm-12" ng-show="step==12">
			<div class="col-sm-12">Les quêtes sont-elles trop difficiles pour des récompenses trop faibles ?</div>
			<label class="col-sm-offset-3 col-sm-8"><input type="radio" name="q12" value="0">Oui trop difficiles et les récompenses sont parfaites</label>
			<label class="col-sm-offset-3 col-sm-8"><input type="radio" name="q12" value="1">Oui trop difficiles et les récompenses sont trop faibles</label>
			<label class="col-sm-offset-3 col-sm-8"><input type="radio" name="q12" value="2">Non trop faciles et les récompenses trop fortes</label>
			<label class="col-sm-offset-3 col-sm-8"><input type="radio" name="q12" value="3">Non trop faciles et les récompenses sont trop faibles</label>
			<a class="btn btn-success" ng-click="step=13">Suivant</a>
		</div>
		<div class="form-group col-sm-12" ng-show="step==13">
			<div class="col-sm-12">Avez-vous déjà effectué la quête braquage ?</div>
			<label class="col-sm-offset-3 col-sm-3"><input type="radio" name="q13" value="1" ng-click="step=14" /> Oui</label>
			<label class="col-sm-3"><input type="radio" name="q13" value="0" ng-click="step=20"/> Non</label>
		</div>
		<div class="form-group col-sm-12" ng-show="step==14">
			<div class="col-sm-12">Sur une note de 1 à 5, notez la quête braquage</div>
			<label class="col-sm-2 col-sm-offset-1"><input type="radio" name="q14" value="1" ng-click="step=15" /> 1</label>
			<label class="col-sm-2"><input type="radio" name="q14" value="2" ng-click="step=15"/> 2</label>
			<label class="col-sm-2"><input type="radio" name="q14" value="3" ng-click="step=15"/> 3</label>
			<label class="col-sm-2"><input type="radio" name="q14" value="4" ng-click="step=16"/> 4</label>
			<label class="col-sm-2"><input type="radio" name="q14" value="5" ng-click="step=16"/> 5</label>
		</div>
		<div class="form-group col-sm-12" ng-show="step==15">
			<div class="col-sm-12">Quels sont les points à améliorer à la quête braquage ?</div>
			<textarea class="form-control col-sm-offset-3" name="q15" style="width:50% !important;"></textarea>
			<a class="btn btn-success" ng-click="step=16">Suivant</a>
		</div>
		<div class="form-group col-sm-12" ng-show="step==16">
			<div class="col-sm-12">La quête braquage est une quête “en groupe”, avez-vous une idée d’une autre quête à faire “en groupe” ?</div>
			<label class="col-sm-offset-3 col-sm-3"><input type="radio" name="q16" value="1" ng-click="step=17" /> Oui</label>
			<label class="col-sm-3"><input type="radio" name="q16" value="0" ng-click="step=20"/> Non</label>
		</div>
		<div class="form-group col-sm-12" ng-show="step==17">
			<div class="col-sm-12">Quelle est votre idée ?</div>
			<textarea class="form-control col-sm-offset-3" name="q17" style="width:50% !important;"></textarea>
			<a class="btn btn-success" ng-click="step=20">Suivant</a>
		</div>
	</div>

	<div class="rows" ng-show="step>=20 && step < 30">
		<h3>Le roleplay</h3>
		<div class="form-group col-sm-12" ng-show="step==20">
			<div class="col-sm-12">Pensez-vous que le serveur devrait être plus roleplay ?</div>
			<label class="col-sm-offset-3 col-sm-3"><input type="radio" name="q20" value="1" ng-click="step=21"/> Oui</label>
			<label class="col-sm-3"><input type="radio" name="q20" value="0" ng-click="step=30"/> Non</label>
		</div>
		<div class="form-group col-sm-12" ng-show="step==21">
			<div class="col-sm-12">Pensez-vous que les joueurs devraient tous avoir un nom et un prénom RP. Exemple: Jean Peuplus ?</div>
			<label class="col-sm-offset-3 col-sm-3"><input type="radio" name="q21" value="1" ng-click="step=22"/> Oui</label>
			<label class="col-sm-3"><input type="radio" name="q21" value="0" ng-click="step=22"/> Non</label>
		</div>
		<div class="form-group col-sm-12" ng-show="step==22">
			<div class="col-sm-12">Pensez-vous que les joueurs devraient avoir une personnalité gentil/méchant et que cette personnalité influence leur gameplay ?</div>
			<label class="col-sm-offset-3 col-sm-3"><input type="radio" name="q22" value="1" ng-click="step=23"/> Oui</label>
			<label class="col-sm-3"><input type="radio" name="q22" value="0" ng-click="step=23"/> Non</label>
		</div>
		<div class="form-group col-sm-12" ng-show="step==23">
			<div class="col-sm-12">Pensez-vous que les joueurs devraient avoir un anniversaire sur le rp ?</div>
			<label class="col-sm-offset-3 col-sm-3"><input type="radio" name="q23" value="1" ng-click="step=24"/> Oui</label>
			<label class="col-sm-3"><input type="radio" name="q23" value="0"  ng-click="step=24"/> Non</label>
		</div>
		<div class="form-group col-sm-12" ng-show="step==24">
			<div class="col-sm-12">Pensez-vous que les ventes des jobs devraient tous se dérouler dans leur propre bâtiment ?</div>
			<label class="col-sm-offset-3 col-sm-3"><input type="radio" name="q24" value="1" ng-click="step=30"/> Oui</label>
			<label class="col-sm-3"><input type="radio" name="q24" value="0"  ng-click="step=30"/> Non</label>
		</div>
	</div>

	<div class="rows" ng-show="step>=30 && step < 40">
		<h3>Princeton</h3>
		<div class="form-group col-sm-12" ng-show="step==30">
			<div class="col-sm-12">Quel est le lieu que vous préférez dans Princeton ?</div>
			<select name="q30" class="form-control col-sm-offset-3 col-sm-6">
				<option value="0">Le commissariat</option>
				<option value="1">L'hôpital</option>
				<option value="2">La banque</option>
				<option value="3">Le tribunal</option>
				<option value="4">L'armurerie</option>
				<option value="5">Le Mc'Donald</option>
				<option value="6">L'épicerie "Saïd"</option>
				<option value="7">La planque 18th</option>
				<option value="8">La planque dealer</option>
				<option value="9">Le SexShop</option>
				<option value="10">Le bâtiment des Tueurs</option>
				<option value="11">Le bâtiment des Concessionnaires</option>
				<option value="12">Le bâtiment des Coachs</option>
				<option value="13">Le bâtiment des Couturier</option>
				<option value="14">Le bâtiment des Artificiers</option>
				<option value="15">Le bâtiment des vendeurs de ticket Loto</option>
				<option value="16">Le batiment des techniciens</option>
				<option value="17">La villa PvP</option>
				<option value="18">La villa immobilier</option>
				<option value="19">La villa Mafieuse</option>
				<option value="20">Les appartements</option>
				<option value="21">Le bunker</option>
				<option value="22">La discothèque</option>
				<option value="23">La ruelle sombre</option>
			</select>
			<a class="btn btn-success" ng-click="step=31">Suivant</a>
		</div>
		<div class="form-group col-sm-12" ng-show="step==31">
			<div class="col-sm-12">Pourquoi l'aimez-vous ?</div>
			<textarea class="form-control col-sm-offset-3" name="q31" style="width:50% !important;"></textarea>
			<a class="btn btn-success" ng-click="step=32">Suivant</a>
		</div>
		<div class="form-group col-sm-12" ng-show="step==32">
			<div class="col-sm-12">Quel est le lieu que vous aimez le moins dans Princeton ?</div>
			<select name="q32" class="form-control col-sm-offset-3 col-sm-6">
				<option value="0">Le commissariat</option>
				<option value="1">L'hôpital</option>
				<option value="2">La banque</option>
				<option value="3">Le tribunal</option>
				<option value="4">L'armurerie</option>
				<option value="5">Le Mc'Donald</option>
				<option value="6">L'épicerie "Saïd"</option>
				<option value="7">La planque 18th</option>
				<option value="8">La planque dealer</option>
				<option value="9">Le SexShop</option>
				<option value="10">Le bâtiment des Tueurs</option>
				<option value="11">Le bâtiment des Concessionnaires</option>
				<option value="12">Le bâtiment des Coachs</option>
				<option value="13">Le bâtiment des Couturier</option>
				<option value="14">Le bâtiment des Artificiers</option>
				<option value="15">Le bâtiment des vendeurs de ticket Loto</option>
				<option value="16">Le bâtiment des techniciens</option>
				<option value="17">La villa PvP</option>
				<option value="18">La villa immobilier</option>
				<option value="19">La villa Mafieuse</option>
				<option value="20">Les appartements</option>
				<option value="21">Le bunker</option>
				<option value="22">La discothèque</option>
				<option value="23">La ruelle sombre</option>
			</select>
			<a class="btn btn-success" ng-click="step=33">Suivant</a>
		</div>
		<div class="form-group col-sm-12" ng-show="step==33">
			<div class="col-sm-12">Pourquoi ne l'aimez-vous pas ?</div>
			<textarea class="form-control col-sm-offset-3" name="q33" style="width:50% !important;"></textarea>
			<a class="btn btn-success" ng-click="step=40">Suivant</a>
		</div>
	</div>

	<div class="rows" ng-show="step>=40 && step < 42">
		<h3>Les Métiers</h3>
		<div class="form-group col-sm-12" ng-show="step==40">
			<div class="col-sm-12">Quel est votre métier préféré sur notre serveur ?</div>
			<select name="q40" class="form-control col-sm-offset-3 col-sm-6">
				<option value="0">La police</option>
				<option value="1">L'hôpital</option>
				<option value="2">Vendeur au Mc'Donald</option>
				<option value="3">Artisan</option>
				<option value="4">Mercenaire</option>
				<option value="5">Concessionnaire</option>
				<option value="6">Vendeur immobilier</option>
				<option value="7">Coach</option>
				<option value="8">Dealer</option>
				<option value="9">Mafieu</option>
				<option value="10">Juge</option>
				<option value="11">GOS / Marshall / g.ONU</option>
				<option value="12">Armurerier</option>
				<option value="13">Artificier</option>
				<option value="14">Vendeur de tickets loto</option>
				<option value="15">18th</option>
				<option value="16">Vendeur au SexShop</option>
				<option value="17">Banquier</option>
				<option value="18">Technicien</option>
			</select>
			<a class="btn btn-success" ng-click="step=41">Suivant</a>
		</div>
		<div class="form-group col-sm-12" ng-show="step==41">
			<div class="col-sm-12">Pourquoi ce job vous intéresse-t-il ?</div>
			<label class="col-sm-offset-3 col-sm-8"><input type="checkbox" name="q41" value="0">L'argent, on y gagne beaucoup</label>
			<label class="col-sm-offset-3 col-sm-8"><input type="checkbox" name="q41" value="1">Les personnes présentes dans le métier</label>
			<label class="col-sm-offset-3 col-sm-8"><input type="checkbox" name="q41" value="2">Je trouve que le chef du métier fait bien son travail</label>
			<label class="col-sm-offset-3 col-sm-8"><input type="checkbox" name="q41" value="3">Le prestige de faire partie de ce métier</label>
			<label class="col-sm-offset-3 col-sm-8"><input type="checkbox" name="q41" value="3">Il y a toujours quelque chose à faire dans ce job</label>
			<a class="btn btn-success" ng-click="step=42">Suivant</a>
		</div>
	</div>

	<div class="rows" ng-show="step>=42 && step < 50">
		<h3>L'artisanat</h3>
		<div class="form-group col-sm-12" ng-show="step==42">
			<div class="col-sm-12">Avez-vous déjà pratiqué l'artisanat sur notre serveur ?</div>
			<label class="col-sm-offset-3 col-sm-3"><input type="radio" name="q42" value="1" ng-click="step=43"/> Oui</label>
			<label class="col-sm-3"><input type="radio" name="q42" value="0" ng-click="step=48"/> Non</label>
		</div>
		<div class="form-group col-sm-12" ng-show="step==43">
			<div class="col-sm-12">Selectionnez l'une des propositions suivantes</div>
			<label class="col-sm-offset-3 col-sm-8"><input type="radio" name="q43" value="0" >Il faut diminuer le coût des crafts et garder telle quelle la fatigue</label>
			<label class="col-sm-offset-3 col-sm-8"><input type="radio" name="q43" value="1">Il faut diminuer la fatigue et garder tel quel le coût des crafts</label>
			<label class="col-sm-offset-3 col-sm-8"><input type="radio" name="q43" value="2">Je sais pas</label>
			<a class="btn btn-success" ng-click="step=44">Suivant</a>
		</div>
		<div class="form-group col-sm-12" ng-show="step==44">
			<div class="col-sm-12">Pensez-vous que l'artisanat a un effet négatif pour votre métier ?</div>
			<label class="col-sm-offset-3 col-sm-2"><input type="radio" name="q44" value="2" /> Oui</label>
			<label class="col-sm-2"><input type="radio" name="q44" value="1" /> Non</label>
			<label class="col-sm-2"><input type="radio" name="q44" value="0" /> Je sais pas</label>
			<a class="btn btn-success" ng-click="step=45">Suivant</a>
		</div>
		<div class="form-group col-sm-12" ng-show="step==45">
			<div class="col-sm-12">Pensez-vous que l'artisanat est trop difficile / compliqué ?</div>
			<label class="col-sm-offset-3 col-sm-3"><input type="radio" name="q45" value="1" ng-click="step=46"/> Oui</label>
			<label class="col-sm-3"><input type="radio" name="q45" value="0" ng-click="step=50"/> Non</label>
		</div>
		<div class="form-group col-sm-12" ng-show="step==46">
			<div class="col-sm-12">En quoi est-ce trop difficile ?</div>
			<textarea class="form-control col-sm-offset-3" name="q46" style="width:50% !important;"></textarea>
			<a class="btn btn-success" ng-click="step=47">Suivant</a>
		</div>
		<div class="form-group col-sm-12" ng-show="step==47">
			<div class="col-sm-12">Pensez-vous qu’il faille rajouter un mini-tutorial pour son premier craft ?</div>
			<label class="col-sm-offset-3 col-sm-3"><input type="radio" name="q47" value="1" ng-click="step=50"/> Oui</label>
			<label class="col-sm-3"><input type="radio" name="q47" value="0" ng-click="step=50"/> Non</label>
		</div>
		<div class="form-group col-sm-12" ng-show="step==48">
			<div class="col-sm-12">Selectionnez l'une des propositions suivantes</div>
			<label class="col-sm-offset-3 col-sm-8"><input type="radio" name="q48" value="0" >Je ne connais pas</label>
			<label class="col-sm-offset-3 col-sm-8"><input type="radio" name="q48" value="1">Je trouve ça trop compliqué</label>
			<label class="col-sm-offset-3 col-sm-8"><input type="radio" name="q48" value="2">Je trouve ça trop coûteux</label>
			<label class="col-sm-offset-3 col-sm-8"><input type="radio" name="q48" value="3">Je trouve ça trop chiant</label>
			<label class="col-sm-offset-3 col-sm-8"><input type="radio" name="q48" value="4">Je trouve ça trop long</label>
			<label class="col-sm-offset-3 col-sm-8"><input type="radio" name="q48" value="5">Autre</label>
			<a class="btn btn-success" ng-click="step=50">Suivant</a>
		</div>
	</div>

	<div class="rows" ng-show="step>=50 && step < 60">
		<h3>Les meurtres / Le freekill</h3>
		<div class="form-group col-sm-12" ng-show="step==50">
			<div class="col-sm-12">Pensez-vous qu’il y a trop de meurtre en ville ?</div>
			<label class="col-sm-offset-3 col-sm-3"><input type="radio" name="q50" value="1" ng-click="step=51"/> Oui</label>
			<label class="col-sm-3"><input type="radio" name="q50" value="0" ng-click="step=57"/> Non</label>
		</div>
		<div class="form-group col-sm-12" ng-show="step==51">
			<div class="col-sm-12">Connaissez-vous le Tribunal en jeu ?</div>
			<label class="col-sm-offset-3 col-sm-3"><input type="radio" name="q51" value="1" ng-click="step=52" /> Oui</label>
			<label class="col-sm-3"><input type="radio" name="q51" value="0" ng-click="step=52"/> Non</label>
		</div>
		<div class="form-group col-sm-12" ng-show="step==52">
			<div class="col-sm-12">Connaissez-vous le /report ?{{tribunal}}</div>
			<label class="col-sm-offset-3 col-sm-3"><input type="radio" name="q52" value="1" ng-click="step=53"/> Oui</label>
			<label class="col-sm-3"><input type="radio" name="q52" value="0" ng-click="step=53" /> Non</label>
		</div>
		<div class="form-group col-sm-12"  ng-show="step==53">
			<div class="col-sm-12">Connaissez-vous le bot anti-freekill ?</div>
			<label class="col-sm-offset-3 col-sm-3"><input type="radio" name="q53" value="1" ng-click="step=54" /> Oui</label>
			<label class="col-sm-3"><input type="radio" name="q53" value="0" ng-click="step=54" /> Non</label>
		</div>
		<div class="form-group col-sm-12"  ng-show="step==54">
			<div class="col-sm-12">Connaissez-vous la maladie du freekill ?</div>
			<label class="col-sm-offset-3 col-sm-3"><input type="radio" name="q54" value="1" ng-click="step=55" /> Oui</label>
			<label class="col-sm-3"><input type="radio" name="q54" value="0" ng-click="step=55" /> Non</label>
		</div>
		<div class="form-group col-sm-12" ng-show="step==55">
			<div class="col-sm-12">Avez-vous des suggestions supplémentaires pour réduire le nombre de meurtres en ville ?</div>
			<label class="col-sm-offset-3 col-sm-8"><input type="radio" name="q55" value="0" ng-click="step=60">Augmenter le temps de prison pour meurtre par la police</label>
			<label class="col-sm-offset-3 col-sm-8"><input type="radio" name="q55" value="1" ng-click="step=60">Augmenter le temps de prison pour meurtre par les juges</label>
			<label class="col-sm-offset-3 col-sm-8"><input type="radio" name="q55" value="2" ng-click="step=60">Augmenter le temps de prison pour meurtre par le /report</label>
			<label class="col-sm-offset-3 col-sm-8"><input type="radio" name="q55" value="3" ng-click="step=60">Augmenter la pénalité liée à la maladie du freekill</label>
			<label class="col-sm-offset-3 col-sm-8"><input type="radio" name="q55" value="4" ng-click="step=56">Autre</label>
		</div>
		<div class="form-group col-sm-12" ng-show="step==56">
			<div class="col-sm-12">Précisez :</div>
			<textarea class="form-control col-sm-offset-3" name="q56" style="width:50% !important;"></textarea>
			<a class="btn btn-success" ng-click="step=60">Suivant</a>
		</div>
		<div class="form-group col-sm-12" ng-show="step==57">
			<div class="col-sm-12">Pensez-vous que toutes les mesures anti-freekill sont une bonne chose ? (/report, juge, bot anti freekill)</div>
			<label class="col-sm-offset-3 col-sm-3"><input type="radio" name="q57" value="1" ng-click="step=60"/> Oui</label>
			<label class="col-sm-3"><input type="radio" name="q57" value="0" ng-click="step=60" /> Non</label>
		</div>
	</div>

	<div class="rows" ng-show="step>=60 && step < 70">
		<h3>Le PvP</h3>
		<div class="form-group col-sm-12" ng-show="step==60">
			<div class="col-sm-12">Connaissez-vous le système de PvP présent sur le serveur ?</div>
			<label class="col-sm-offset-3 col-sm-3"><input type="radio" name="q60" value="1" ng-click="step=61"/> Oui</label>
			<label class="col-sm-3"><input type="radio" name="q60" value="0" ng-click="step=70" /> Non</label>
		</div>
		<div class="form-group col-sm-12" ng-show="step==61">
			<div class="col-sm-12">Pensez-vous qu’il y ait des problèmes liés à celle-ci ?</div>
			<label class="col-sm-offset-3 col-sm-8"><input type="radio" name="q61" value="0" ng-click="step=66">Non</label>
			<label class="col-sm-offset-3 col-sm-8"><input type="radio" name="q61" value="1" ng-click="step=62">Oui, les problèmes sont principalement liés aux personnes eux-mêmes. (Rage, non fairplay, hors pvp).</label>
			<label class="col-sm-offset-3 col-sm-8"><input type="radio" name="q61" value="2" ng-click="step=64">Oui, les problèmes sont principalement liés aux stuff. (Berserk, crack, etc).</label>
		</div>
		<div class="form-group col-sm-12" ng-show="step==62">
			<div class="col-sm-12">Mis à part sanctionner le joueur, avez-vous une suggestion pour éviter ces problèmes ?</div>
			<label class="col-sm-offset-3 col-sm-3"><input type="radio" name="q62" value="1" ng-click="step=63"/> Oui</label>
			<label class="col-sm-3"><input type="radio" name="q62" value="0" ng-click="step=66" /> Non</label>
		</div>
		<div class="form-group col-sm-12" ng-show="step==63">
			<div class="col-sm-12">Précisez :</div>
			<textarea class="form-control col-sm-offset-3" name="q63" style="width:50% !important;"></textarea>
			<a class="btn btn-success" ng-click="step=66">Suivant</a>
		</div>
		<div class="form-group col-sm-12" ng-show="step==64">
			<div class="col-sm-12">Mis à part interdire totalement l’item, avez-vous une suggestion pour équilibrer cet item ?</div>
			<label class="col-sm-offset-3 col-sm-3"><input type="radio" name="q64" value="1" ng-click="step=65"/> Oui</label>
			<label class="col-sm-3"><input type="radio" name="q64" value="0" ng-click="step=66"/> Non</label>
		</div>
		<div class="form-group col-sm-12" ng-show="step==65">
			<div class="col-sm-12">Précisez :</div>
			<textarea class="form-control col-sm-offset-3" name="q65" style="width:50% !important;"></textarea>
			<a class="btn btn-success" ng-click="step=66">Suivant</a>
		</div>
		<div class="form-group col-sm-12" ng-show="step==66">
			<div class="col-sm-12">Vous pensez qu’il faut changer le nombre de capture du bunker ?</div>
			<label class="col-sm-offset-3 col-sm-8"><input type="radio" name="q66" value="0" ng-click="step=67">Non</label>
			<label class="col-sm-offset-3 col-sm-8"><input type="radio" name="q66" value="1" ng-click="step=67">Oui, il faut réduire le nombre de captures (1x/semaine)</label>
			<label class="col-sm-offset-3 col-sm-8"><input type="radio" name="q66" value="2" ng-click="step=67">Oui, il faut augmenter le nombre de captures (3x/semaine)</label>
		</div>
		<div class="form-group col-sm-12" ng-show="step==67">
			<div class="col-sm-12">Pratiquez-vous fréquemment la capture du bunker ?</div>
			<label class="col-sm-offset-3 col-sm-3"><input type="radio" name="q67" value="1" ng-click="step=70"/> Oui</label>
			<label class="col-sm-3"><input type="radio" name="q67" value="0"  ng-click="step=68"/> Non</label>
		</div>
		<div class="form-group col-sm-12" ng-show="step==68">
			<div class="col-sm-12">Pourquoi ?</div>
			<label class="col-sm-offset-3 col-sm-8"><input type="checkbox" name="q68" value="0">Le stuff coûte trop cher</label>
			<label class="col-sm-offset-3 col-sm-8"><input type="checkbox" name="q68" value="1">Je n'ai pas de groupe</label>
			<label class="col-sm-offset-3 col-sm-8"><input type="checkbox" name="q68" value="2">Mon groupe n'est pas assez organisé</label>
			<label class="col-sm-offset-3 col-sm-8"><input type="checkbox" name="q68" value="2">Je n'y comprends rien</label>
			<label class="col-sm-offset-3 col-sm-8"><input type="checkbox" name="q68" value="3">Je m'oppose au système de capture actuel</label>
			<a class="btn btn-success" ng-click="step=70">Suivant</a>
		</div>
	</div>

	<div class="rows" ng-show="step>=70 && step < 80">
		<h3>Les administrateurs</h3>
		<div class="form-group col-sm-12" ng-show="step==70">
			<div class="col-sm-12">Pensez-vous que les admins sont suffisamment réactifs aux questions des joueurs ?</div>
			<label class="col-sm-offset-1 col-sm-2"><input type="radio" name="q70" value="0" ng-click="step=71">Pas du tout d'accord</label>
			<label class="col-sm-2"><input type="radio" name="q70" value="1" ng-click="step=71">Plutôt pas d'accord</label>
			<label class="col-sm-2"><input type="radio" name="q70" value="2" ng-click="step=71">Neurtre</label>
			<label class="col-sm-2"><input type="radio" name="q70" value="3" ng-click="step=71">Plutôt d'accord</label>
			<label class="col-sm-2"><input type="radio" name="q70" value="4" ng-click="step=71">Totalement d'accord</label>
		</div>
		<div class="form-group col-sm-12" ng-show="step==71">
			<div class="col-sm-12">Pensez-vous que les admins sont “de votre côté” ?</div>
			<label class="col-sm-offset-1 col-sm-2"><input type="radio" name="q71" value="0" ng-click="step=72">Pas du tout d'accord</label>
			<label class="col-sm-2"><input type="radio" name="q71" value="1" ng-click="step=72">Plutôt pas d'accord</label>
			<label class="col-sm-2"><input type="radio" name="q71" value="2" ng-click="step=72">Neurtre</label>
			<label class="col-sm-2"><input type="radio" name="q71" value="3" ng-click="step=72">Plutôt d'accord</label>
			<label class="col-sm-2"><input type="radio" name="q71" value="4" ng-click="step=72">Totalement d'accord</label>
		</div>
		<div class="form-group col-sm-12" ng-show="step==72">
			<div class="col-sm-12">Pensez-vous que les admins règles suffisamment les problèmes du quotidien ?</div>
			<label class="col-sm-offset-1 col-sm-2"><input type="radio" name="q72" value="0" ng-click="step=73">Pas du tout d'accord</label>
			<label class="col-sm-2"><input type="radio" name="q72" value="1" ng-click="step=73">Plutôt pas d'accord</label>
			<label class="col-sm-2"><input type="radio" name="q72" value="2" ng-click="step=73">Neurtre</label>
			<label class="col-sm-2"><input type="radio" name="q72" value="3" ng-click="step=73">Plutôt d'accord</label>
			<label class="col-sm-2"><input type="radio" name="q72" value="4" ng-click="step=73">Totalement d'accord</label>
		</div>
		<div class="form-group col-sm-12" ng-show="step==73">
			<div class="col-sm-12">Pensez-vous que les admins devraient sanctionner plus lourdement les mauvais comportements ?</div>
			<label class="col-sm-offset-1 col-sm-2"><input type="radio" name="q73" value="0" ng-click="step=74">Pas du tout d'accord</label>
			<label class="col-sm-2"><input type="radio" name="q73" value="1" ng-click="step=74">Plutôt pas d'accord</label>
			<label class="col-sm-2"><input type="radio" name="q73" value="2" ng-click="step=74">Neurtre</label>
			<label class="col-sm-2"><input type="radio" name="q73" value="3" ng-click="step=74">Plutôt d'accord</label>
			<label class="col-sm-2"><input type="radio" name="q73" value="4" ng-click="step=74">Totalement d'accord</label>
		</div>
		<div class="form-group col-sm-12" ng-show="step==74">
			<div class="col-sm-12">Pensez-vous que les admins arrivent rapidement sur le channel “besoin d’un admin” sur TeamSpeak ?</div>
			<label class="col-sm-offset-1 col-sm-2"><input type="radio" name="q74" value="0" ng-click="step=75">Pas du tout d'accord</label>
			<label class="col-sm-2"><input type="radio" name="q74" value="1" ng-click="step=75">Plutôt pas d'accord</label>
			<label class="col-sm-2"><input type="radio" name="q74" value="2" ng-click="step=75">Neurtre</label>
			<label class="col-sm-2"><input type="radio" name="q74" value="3" ng-click="step=75">Plutôt d'accord</label>
			<label class="col-sm-2"><input type="radio" name="q74" value="4" ng-click="step=75">Totalement d'accord</label>
		</div>
		<div class="form-group col-sm-12" ng-show="step==75">
			<div class="col-sm-12">Pensez-vous que les admins sont suffisamment présents en jeu ?</div>
			<label class="col-sm-offset-1 col-sm-2"><input type="radio" name="q75" value="0" ng-click="step=76">Pas du tout d'accord</label>
			<label class="col-sm-2"><input type="radio" name="q75" value="1" ng-click="step=76">Plutôt pas d'accord</label>
			<label class="col-sm-2"><input type="radio" name="q75" value="2" ng-click="step=76">Neurtre</label>
			<label class="col-sm-2"><input type="radio" name="q75" value="3" ng-click="step=76">Plutôt d'accord</label>
			<label class="col-sm-2"><input type="radio" name="q75" value="4" ng-click="step=76">Totalement d'accord</label>
		</div>
		<div class="form-group col-sm-12" ng-show="step==76">
			<div class="col-sm-12">Pensez-vous que les admins font suffisamment d'événement ?</div>
			<label class="col-sm-offset-1 col-sm-2"><input type="radio" name="q76" value="0" ng-click="step=77">Pas du tout d'accord</label>
			<label class="col-sm-2"><input type="radio" name="q76" value="1" ng-click="step=77">Plutôt pas d'accord</label>
			<label class="col-sm-2"><input type="radio" name="q76" value="2" ng-click="step=77">Neurtre</label>
			<label class="col-sm-2"><input type="radio" name="q76" value="3" ng-click="step=77">Plutôt d'accord</label>
			<label class="col-sm-2"><input type="radio" name="q76" value="4" ng-click="step=77">Totalement d'accord</label>
		</div>
		<div class="form-group col-sm-12" ng-show="step==77">
			<div class="col-sm-12">Pensez-vous que les admins s'impliquent suffisamment pour faire progresser le serveur ?</div>
			<label class="col-sm-offset-1 col-sm-2"><input type="radio" name="q77" value="0" ng-click="step=78">Pas du tout d'accord</label>
			<label class="col-sm-2"><input type="radio" name="q77" value="1" ng-click="step=78">Plutôt pas d'accord</label>
			<label class="col-sm-2"><input type="radio" name="q77" value="2" ng-click="step=78">Neurtre</label>
			<label class="col-sm-2"><input type="radio" name="q77" value="3" ng-click="step=78">Plutôt d'accord</label>
			<label class="col-sm-2"><input type="radio" name="q77" value="4" ng-click="step=78">Totalement d'accord</label>
		</div>
		<div class="form-group col-sm-12" ng-show="step==78">
			<div class="col-sm-12">Pensez-vous que le serveur crash de moins en moins avec le temps ?</div>
			<label class="col-sm-offset-1 col-sm-2"><input type="radio" name="q78" value="0" ng-click="step=79">Pas du tout d'accord</label>
			<label class="col-sm-2"><input type="radio" name="q78" value="1" ng-click="step=79">Plutôt pas d'accord</label>
			<label class="col-sm-2"><input type="radio" name="q78" value="2" ng-click="step=79">Neurtre</label>
			<label class="col-sm-2"><input type="radio" name="q78" value="3" ng-click="step=79">Plutôt d'accord</label>
			<label class="col-sm-2"><input type="radio" name="q78" value="4" ng-click="step=79">Totalement d'accord</label>
		</div>
		<div class="form-group col-sm-12" ng-show="step==79">
			<div class="col-sm-12">Pensez-vous que le serveur est suffisamment résistant contre le DDos ?</div>
			<label class="col-sm-offset-1 col-sm-2"><input type="radio" name="q79" value="0" ng-click="step=80">Pas du tout d'accord</label>
			<label class="col-sm-2"><input type="radio" name="q79" value="1" ng-click="step=80">Plutôt pas d'accord</label>
			<label class="col-sm-2"><input type="radio" name="q79" value="2" ng-click="step=80">Neurtre</label>
			<label class="col-sm-2"><input type="radio" name="q79" value="3" ng-click="step=80">Plutôt d'accord</label>
			<label class="col-sm-2"><input type="radio" name="q79" value="4" ng-click="step=80">Totalement d'accord</label>
		</div>
	</div>

	<div class="rows" ng-show="step==80">
		<p class="col-sm-6 col-sm-offset-3"><br /><br />
			Merci pour le temps que vous avez consacré à répondre à ce sondage !<br />
			<a class="btn btn-danger" ng-click="restart()">Recommencer le sondage</a> ou
			<input type="submit" class="btn btn-success" value="Envoyer mes réponses" />
			<br /><br /><br /><br />
		</p>
	</div>
	<div class="rows"><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /></div>
</form>
