<div class="btn-group btn-group-justified" role="group">
  <a class="btn btn-default" href="#/pilori/view/{{steamid}}"> Vos rapports </a>
  <a class="btn btn-default" href="#/pilori/double/{{steamid}}"> Vos doubles comptes </a>
  <a class="btn btn-default" href="#/pilori/last/0"> Les dernières condamnations </a>
</div>
<br />

<div class="col-md-10 col-md-offset-1 alert alert-warning" role="alert" ng-show="data.length > 1">
  <strong>L'utilisation d'un double compte est tolérée</strong> mais aucune action ne doit être entreprise pour le second compte (pas de transaction, HDV, give, réduction, etc).
  Les déconnexions intempestives, pour changer de compte, ne sont pas autorisées. <i>Exemple : Je me suis fait mettre en prison, du coup je change de compte...</i>
  <br />
  Le Rang "No-pyj" ne peut être obtenu que sur un seul de vos comptes.
</div>

<div class="col-md-10 col-md-offset-1 alert alert-success" role="alert" ng-show="data.length <= 1">
  <strong>Aucun double compte détecté <i class="fa fa-thumbs-up" aria-hidden="true"></i> </strong> L'utilisation d'un double compte est tolérée, mais aucune action ne doit être entreprise en faveur du second compte.
</div>

<table ng-init="target=''" class="table table-condensed" ng-show="data.length > 1">
  <tr><th>SteamID</th><th>Pseudo</th><th>Job</th><th ng-if="steamid==Params.sub">Contester?</th></tr>
  <tr ng-repeat="item in data" ng-show="item!=Params.sub">
    <td>{{item}}</td>
    <td>{{fullData[item].name}}</td>
    <td>{{fullData[item].job_name}}</td>
    <td ng-show="steamid==Params.sub"><a class="btn btn-default" ng-click="$parent.showDialog = true; $parent.target = item; $parent.pData = fullData[item];">Contster</a></td>
  </tr>
</table>

<div modal-show="showDialog" class="modal fade">
  <div class="modal-dialog">
    <form>
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Contester un double compte</h4>
        </div>
        <div class="modal-body">
          <div class="input-group">
            <span class="input-group-addon" required>SteamID:</span>
            <input type="text" class="form-control" ng-model="target" disabled />
            <span class="input-group-addon">{{pData.name}}</span>
          </div>
          <div class="input-group">
            <span class="input-group-addon">Raison:</span>
            <select class="form-control" ng-model="reason">
              <option>Il s'agit d'un membre de ma famille</option>
              <option>Il s'agit un proche qui est venu chez moi</option>
              <option>Il s'agit d'un ancien compte que je n'ai plus accès</option>
              <option>Il s'agit d'une erreur, je n'ai pas partagé mon compte avec lui</option>
              <option>Je ne sais pas qui c'est</option>
              <option>Autres, je souhaite être recontacté</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-warning" data-dismiss="modal">Annuler</button>
          <input class="btn" type="submit" value="Envoyer" rest="put@/user/double/deny/{{target}}/{{reason}}" ng-click="showDialog = false; reloadTimer(2500);" />
        </div>
      </div>
    </form>
  </div>
</div>
