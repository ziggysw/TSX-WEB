<div class="btn-group btn-group-justified" role="group">
  <a class="btn btn-default" href="#/pilori/view/{{steamid}}"> Vos rapports </a>
  <a class="btn btn-default" href="#/pilori/double/{{steamid}}"> Vos doubles comptes </a>
  <a class="btn btn-default" href="#/pilori/last/0"> Les dernières condamnations </a>
</div>
<style>
  .img-overlay {
    position: relative;
    display: inline-block;
    float: right;
    width: 64px;
    height: 64px;
    text-align: center;
  }
  .img-overlay i {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    opacity: 0.5;
  }
  .img-overlay i.fa-ban {
    color: red;
  }
  .img-overlay i.fa-check {
    color: green;
  }

</style>

<a href="#/pilori/last/{{(Params.sub | num)-1}}" class="btn btn-default pull-left" ng-show="(Params.sub | num)>0"> Précédent </a>
<a href="#/pilori/last/{{(Params.sub | num)+1}}" class="btn btn-default pull-right"> Suivant </a>

<br clear="all"/>
<table class="col-md-10 col-md-offset-1">
  <tr ng-repeat="item in data">
    <td class="img-overlay"><img src="/images/icons/{{item.game}}.png" width="64" height="64" />
      <i ng-show="item.banned==1" class="fa fa-ban fa-5x" aria-hidden="true"></i>
      <i ng-show="item.banned==0" class="fa fa-check fa-5x" aria-hidden="true"></i>
    </td>
    <td width="10"></td>
    <td>
      <a href="#/pilori/view/{{item.SteamID}}">{{item.nick}}</a> {{item.game | prettyBan}},
      <span ng-hide="item.Length">de façon Permanente.
        <i ng-show="item.banned==1">Cette sanction ne peut-être levée que par la clémence d'un admin.</i>
      </span>
      <span ng-show="item.Length">pour une durée de {{item.Length | fullDuration }}. <br />
        <i ng-show="item.banned==1">Cette sanction sera levée à {{ (item.Length + item.StartTime) * 1000 | date: "HH'h'mm, le dd-MM-yy" }}.</i>
      </span>
    <br />
      La raison de cette sanction est: <u><b>{{item.reason}}</b></u>.
      <span ng-show="item.banned==0">
        <i ng-hide="item.unban==1">Cette sanction est terminée.</i>
        <i ng-show="item.unban==1">Un admin vous a accordé sa clémence.</i>
      </span>

      <span ng-show="item.SteamID==steamid && item.banned==1">Vous pouvez contester en postant <a href="https://www.ts-x.eu/forum/posting.php?mode=post&f=56">ici</a>.</span>
    </td>
  </tr>
</table>
<br clear="all" />

<a href="#/pilori/last/{{(Params.sub | num)-1}}" class="btn btn-default pull-left" ng-show="(Params.sub | num)>0"> Précédent </a>
<a href="#/pilori/last/{{(Params.sub | num)+1}}" class="btn btn-default pull-right"> Suivant </a>
