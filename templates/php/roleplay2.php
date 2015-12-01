<?php
	$tpl = new raintpl();
	$tpl->assign('steamid', str_replace("STEAM_0", "STEAM_1", $user->data['steamid']));
	draw($tpl->draw("page_roleplay", $return_string=true), "roleplay", array( "angular.route.min.js", "heatmap.min.js", "jquery.maphilight.js", "angular.dnd.min.js" ) );

?>
