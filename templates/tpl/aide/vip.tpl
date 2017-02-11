<div class="container bs-docs-container" data-spy="scroll" data-target="#sidebar" ng-controller="vip">		<div class="col-xs-12 col-sm-9">			<br /><br />			<center><img alt="img_title" id="img_title" src="/images/wiki/admin/admin_top.png"></center><br />			<br />			<div class="row">				<div id="GroupA" class="col-md-12 group">
					<div class="panel panel-wiki">
						<div class="row">
							<div class="hidden-xs hidden-sm col-md-1">
								<span class="panel-heading panel-icone-wiki"><img src="/images/wiki/logo_wiki.png" /></span>
							</div>
							<div class="col-md-11">
								<div class="panel-heading panel-heading-wiki">
									<h2>Tous les props</h2>
								</div>
							</div>
						</div>
						<div class="panel-body">
							<div id="GroupASub1">								<p style="text-align: center; margin: 0 0 2em 0">Faites Ctrl+C pour copier le model puis allez dans votre console CS:GO et faites Ctrl+V pour le coller</p>
								<div class="row">
									<div class="col-sm-6 col-md-3" ng-repeat="item in props" ng-if="checkData(item, filter)">
										<div class="thumbnail">
											<img src="/web/messorem/images/props/{{item.id}}.jpg" alt="{{item.id}}" style="height:150px; width:300px;" >
										</div>
										<div class="caption">
											<p style="text-align: center;"><span style="font-size: 1.17em;font-weight: bold;" > {{item.nom}}</span> [ {{item.tag}} ]</p>
											<input class="form-control" type="text" value="{{item.model}}" select-on-click />											<p>&nbsp;</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>		</div>		<nav class="col-md-2 bs-docs-sidebar">			<ul id="sidebar" class="nav nav-stacked fixed">				<input class="pull-right form-control" placeholder="RECHERCHE" type="text" name="search" ng-model="filter" />				<br /><br /><br />				<li>					<a href="#GroupA">Tous les props</a>				</li>				<li>					<a href="#GroupB">Tous les skins ( à venir )</a>				</li>			</ul>		</nav>