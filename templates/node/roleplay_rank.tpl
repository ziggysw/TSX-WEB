<h2>Le classement {{Params.sub}}:</h2>
<span ng-hide="data">loading...</span>
<table class="table">
  <thead>
    <tr><th>Pos.</th><th>Joueur:</th><th></th><th>Grade:</th><th>Point:</th></tr>
  </thead>
  <tbody>
    <tr ng-repeat="item in data" ng-init="steamid=item[0]; name=item[1]; rank=item[2]; old_rank=item[3]; point=item[4]; old_point=item[5];"
      ng-class="($parent.steamid==steamid?'active':'')">
      <td>{{rank}}
        <span ng-show="old_rank-rank<0" class="label label-warning">{{old_rank-rank}}</span>
        <span ng-show="old_rank-rank>0" class="label label-success">+{{old_rank-rank}}</span>
        <span ng-show="old_rank-rank==0" class="label label-info">=</span>
      </td>
      <td>{{steamid}}</td>
      <td><a href="#/user/{{steamid}}">{{name}}</a></td>
      <td>{{getRank(rank, point)}}</td>
      <td>{{point}}
        <span ng-show="point-old_point<0" class="label label-warning">{{(point-old_point)}}</span>
        <span ng-show="point-old_point>0" class="label label-success">{{(point-old_point)}}</span>
      </td>
    </tr>
  </tbody>
</table>
