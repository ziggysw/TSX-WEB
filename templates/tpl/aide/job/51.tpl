<div ng-controller="ctrlTabs" data-job="51">
  <ul class="nav nav-tabs" role="tablist">
    <li><a ng-click="tabs='desc'">Description</a></li>
  	<li><a ng-click="tabs='memb'">Membres</a></li>
    <li><a ng-click="tabs='hier'">Hiérarchie</a></li>
    <li><a ng-click="tabs='note'">ShowNote</a></li>
    <li><a ng-click="tabs='item'">Items</a></li>
  </ul>

  <div class="tab-content" style="width:100%;">
    <div role="tabpanel" class="tab-pane active" ng-show="tabs=='desc'">
      <h2>Description :</h2><br />
		<p>Description en cours de rédaction...</p>
	  <br />
	  <button type="button" class="btn btn-success">Candidature spontanée</button>
	</div>
    <div role="tabpanel" class="tab-pane active" ng-show="tabs=='memb'">
      <h2>Membres :</h2><br />
      <i ng-hide="users" ng-repeat="i in [5,4,3,2,1]" class="fa fa-cog fa-spin fa-{{i}}x"></i>
      <ul>
        <li ng-repeat="user in users"><span style="color: #999;">{{user.name}}</span> ~ <span style="color: #003f75;">{{user.nick}}</span></li>
      </ul><br />
    </div>
    <div role="tabpanel" class="tab-pane active" ng-show="tabs=='hier'">
      <h2>Hiérarchie :</h2><br />
      <i ng-hide="jobs" ng-repeat="i in [5,4,3,2,1]" class="fa fa-cog fa-spin fa-{{i}}x"></i>
	  <ul>
        <li ng-repeat="job in jobs.sub" ng-if="job.id!=0"><span style="color: #003f75;">{{job.name}} </span>~ <span style="color: green;">{{job.pay}} $rp</span></li>
      </ul><br />
	  <p> Ils sont actuellement {{jobs.quota}} / {{jobs.current}} dans le job.</p>
    </div>
    <div role="tabpanel" class="tab-pane active" ng-show="tabs=='note'">
      <h2>ShowNote :</h2><br />
      <i ng-hide="jobs" ng-repeat="i in [5,4,3,2,1]" class="fa fa-cog fa-spin fa-{{i}}x"></i>
      <ul>
        <li ng-repeat="note in jobs.notes"><span style="color: #999;">{{note.name}}</span></li>
      </ul><br />
    </div>
    <div role="tabpanel" class="tab-pane active" ng-show="tabs=='item'">
      <h2>Items :</h2><br />
      <i ng-hide="items" ng-repeat="i in [5,4,3,2,1]" class="fa fa-cog fa-spin fa-{{i}}x"></i>
      <span ng-repeat="item in items" rp-item-information="{{item.id}}"></span><br />
    </div>
  </div>
</div>
