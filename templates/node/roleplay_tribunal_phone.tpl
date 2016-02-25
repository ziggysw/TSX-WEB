<style>.well { margin-bottom: 2px; } pre.well > img { margin-right: 5px; }</style>
<form class="form-horizontal">
  <h4>{{plainte.title}} du {{(plainte.timestamp*1000) | date: 'dd/MM à HH:mm'}}:</h4>
  <table style="text-align:center; width:100%;">
    <tr>
      <td><img class="img-polaroid" src="//www.ts-x.eu/do/steam_avatar/steamid/{{plainte.steamid}}.jpg" width="100" height="100"/></td>
      <td>VS</td>
      <td><img class="img-polaroid" src="//www.ts-x.eu/do/steam_avatar/steamid/{{plainte.reportSteamID}}.jpg" width="100" height="100"/></td>
    </tr>
    <tr>
      <td>{{plainte.name}}</td>
      <td></td>
      <td>{{plainte.reportName}}</td>
    </tr>
  </table>
  <ul class="nav nav-tabs" role="tablist">
    <li style="width:33%;"><a href="#/tribunal/phone/{{case}}?TABS=chat">Chat</a></li>
    <li style="width:33%;"><a href="#/tribunal/phone/{{case}}?TABS=log">Logs: {{plainte.reportName}}</a></li>
    <li style="width:33%;"><a href="#/tribunal/phone/{{case}}?TABS=log2">Logs: {{plainte.name}}</a></li>
  </ul>
  <div class="tab-content col-md-12">
    <div role="tabpanel" class="tab-pane row" id="chat" ng-class="Search.TABS==key?'active':''">
      <pre class="well well-sm clearfix" ng-hide="plainte.lock == 1"><img class="img-polaroid img-circle pull-left" src="//www.ts-x.eu/do/steam_avatar/steamid/{{steamid}}.jpg" width="50" height="50"/><b>{{me.name}}</b>: <br /><div class="col-md-11"><textarea class="form-control pull-left" ng-model="rapportReply"></textarea></div><br /><input class="btn btn-success col-md-1 col-md-offset-10" type="submit" value="Envoyer" ng-click="reply()"/><input class="btn btn-warning col-md-1" type="submit" value="Lock" ng-click="lock()" ng-hide="!plainte.admin" /></pre>
      <pre class="well well-sm clearfix" ng-repeat="item in response"><img class="img-polaroid img-circle pull-left" src="//www.ts-x.eu/do/steam_avatar/steamid/{{item.steamid}}.jpg" width="50" height="50"/><b>{{item.name}}</b>: {{item.text}}</pre>
      <pre class="well well-sm clearfix"><img class="img-polaroid img-circle pull-left" src="//www.ts-x.eu/do/steam_avatar/steamid/{{plainte.steamid}}.jpg" width="50" height="50"/><b>{{plainte.name}}</b>: {{plainte.text}}</pre>
    </div>
    <div role="tabpanel" class="tab-pane row" id="log">
      <span class="small text-muted" ng-repeat="item in logs[1] track by $index">{{item}}<br /></span>
    </div>
    <div role="tabpanel" class="tab-pane row" id="log2">
      <span class="small text-muted" ng-repeat="item in logs[0] track by $index">{{item}}<br /></span>
    </div>
  </div>

</form>
