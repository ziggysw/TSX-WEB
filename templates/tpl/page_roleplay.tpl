<script type="text/javascript" src="/js/highcharts-custom.js"></script>
<script type="text/javascript">
Highcharts.setOptions({lang: {
  	months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  	weekdays: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
}});
</script>
<script type="text/javascript" src="/js/browser-app.js?v=2"></script>

<div class="col-md-12" ng-controller="mainCtrl">
	<br  />
	<h3>Cette page est en construction. <a href="/forum/viewtopic.php?p=531049">Vos suggestions sont les bienvenues</a>.</h3>
	Note: Le ratio sera affiché pendant 15 minutes après l'utilisation d'un "ratio perso" afin de luter contre le bug csgo.
	<button class="btn btn-info pull-right" ng-click="goBack()" ng-show="back.length>0">Retour</button>
	<div class="btn-group btn-group-justified" role="group">
	  <a class="btn btn-default" href="#/user/{$steamid}"><i class="fa fa-user"></i> Votre profil</a>
		<div class="btn-group" role="group">
	    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	      <i class="fa fa-briefcase"></i> Les jobs
	      <span class="caret"></span>
	    </button>
	    <ul class="dropdown-menu">
	      <li ng-repeat="item in jobs">
					<a href="#/job/{{item.id}}?TABS=player">
						<span class="pull-left" ng-class="item.steamid ? '' : 'text-danger'">{{item.name}}</span>
						<i class="pull-right" ng-class="(item.current-item.quota)>0 ? 'text-success' : (item.current-item.quota)>-2 ? 'text-warning' : 'text-danger'">{{item.current}}  / {{item.quota}}</i>
						<i class="clearfix"></i>
					</a>
				</li>
	    </ul>
	  </div>
		<div class="btn-group" role="group">
	    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	      <i class="fa fa-users"></i> Les groupes
	      <span class="caret"></span>
	    </button>
	    <ul class="dropdown-menu">
	      <li ng-repeat="item in groups" style="background-color:rgba({{item.color}}, 0.1);">
					<a href="#/group/{{item.id}}">
						<span class="pull-left">{{item.name}}</span>
						<i class="pull-right">&nbsp;{{item.stats}}</i>
						<i class="clearfix"></i>
					</a>
				</li>
	    </ul>
	  </div>
	</div>
	<div ng-view><i ng-repeat="i in [5,4,3,2,1]" class="fa fa-cog fa-spin fa-{{i}}x"></i></div>
	<br clear="all" />
	<div modal-show="showAlert" class="modal fade">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal">&times;</button>
	        <h4 class="modal-title">{{messageTitle}}</h4>
	      </div>
	      <div class="modal-body">{{messageAlert}}</div>
	      <div class="modal-footer">
	        <button class="btn btn-info" data-dismiss="modal">Quitter</button>
	      </div>
	    </div>
	  </div>
	</div>
</div>
