		<!-- ATTENTION !! Avant toute modification sachez que pour les models de props vous devez rajouter 1 à l'id et au getElementById.
		Props exterrieur = 1000 // Props intérrieur = 2000 // Skin humanoide = 3000 // Skin animal = 4000 // Skin objet = 5000
		Exemple :
				<h3>Arret de bus</h3>
				<p><i><span style="color:green">Aucun risque</span></i></p>
				<p>
					<div id="1001" class="hidden">coucou hiboux</div>
					<a onclick="copyToClipboard(document.getElementById('1001').innerHTML)" class = "btn btn-warning" role = "button">1</a>
				</p>
				
		Ici l'id est 1001, si je veux rajouter un props apres lui, je mettrais donc l'id à 1002 ainsi qu'à getElementById.
			
				<h3>Armoire</h3>
				<p><i><span style="color:green">Aucun risque</span></i></p>
				<p>
					<div id="1002" class="hidden">coucou hiboux</div>
					<a onclick="copyToClipboard(document.getElementById('1002').innerHTML)" class = "btn btn-warning" role = "button">1</a>
				</p>
		En cas de question, contactez Messorem ou Kossolax =) -->
		
		<div class="container bs-docs-container">
			<div class="row">
				<div class="col-md-9" role="main">
					<br /><br />
					<center><img alt="img_title" id="img_title" src="/images/wiki/admin/admin_top.png"></center><br />
					<br />
					<div class="row">
						<div id="GroupA" class="col-md-12 group">
							<div class="panel panel-wiki">
								<div class="row">
									<div class="hidden-xs hidden-sm col-md-1">
										<span class="panel-heading panel-icone-wiki"><img src="/images/wiki/logo_wiki.png" /></span> 
									</div>
									<div class="col-md-11">
										<div class="panel-heading panel-heading-wiki"><h2>Props Exterrieur</h2></div>
									</div>
								</div>
								<div class="panel-body">
									<div id="GroupASub1">
										<h2>A</h2>
										<br />
										<div class = "row">
											<div class = "col-sm-6 col-md-3">
												<div class = "thumbnail">
						<!-- photo du props -->		<img src = "http://img11.hostingpics.net/thumbs/mini_496154busstopmdl.jpg" alt = "Arret de bus" style = "height:150px; width:300px;" >
												</div>
												<div class = "caption">
							<!-- Nom du props -->	<h3>Arret de bus</h3>
			 <!-- Niveaux de risque de crash -->	<p><i><span style="color:green">Aucun risque</span></i></p>
													<p>
						<!-- model du props -->		<div id="1001" class="hidden">models\props_street\bus_stop.mdl</div>
														<a onclick="copyToClipboard(document.getElementById('1001').innerHTML)" class = "btn btn-warning" role = "button">1</a>
													</p>
												</div>
											</div>
											<div class = "col-sm-6 col-md-3">
												<div class = "thumbnail">
						<!-- photo du props -->		<img src = "http://img11.hostingpics.net/thumbs/mini_753897FurnitureDresser001amdl.jpg" alt = "Arret de bus" style = "height:150px; width:300px;" >
												</div>
												<div class = "caption">
							<!-- Nom du props -->	<h3>Armoire</h3>
			 <!-- Niveaux de risque de crash -->	<p><i><span style="color:green">Aucun risque</span></i></p>
													<p>
						<!-- model du props -->		<div id="1002" class="hidden">models/props_c17/FurnitureDresser001a.mdl</div>
														<a onclick="copyToClipboard(document.getElementById('1002').innerHTML)" class = "btn btn-warning" role = "button">1</a>
													</p>
												</div>
											</div>
											<div class = "col-sm-6 col-md-3">
												<div class = "thumbnail">
						<!-- photo du props -->		<img src = "http://img4.hostingpics.net/thumbs/mini_530502alarmclockmdl.jpg" alt = "Arret de bus" style = "height:150px; width:300px;" >
												</div>
												<div class = "caption">
							<!-- Nom du props -->	<h3>Alarme</h3>
			 <!-- Niveaux de risque de crash -->	<p><i><span style="color:green">Aucun risque</span></i></p>
													<p>
						<!-- model du props -->		<div id="1003" class="hidden">models\props_interiors\alarm_clock.mdl</div>
														<a onclick="copyToClipboard(document.getElementById('1003').innerHTML)" class = "btn btn-warning" role = "button">1</a>
													</p>
												</div>
											</div>
											<div class = "col-sm-6 col-md-3">
												<div class = "thumbnail">
						<!-- photo du props -->		<img src = "http://img4.hostingpics.net/thumbs/mini_598667treelargemdl.png" alt = "Arret de bus" style = "height:150px; width:300px;" >
												</div>
												<div class = "caption">
							<!-- Nom du props -->	<h3>Arbre</h3>
			 <!-- Niveaux de risque de crash -->	<p><i><span style="color:green">Aucun risque</span></i></p>
													<p>
						<!-- model du props -->		<div id="1004" class="hidden">models/props/de_inferno/tree_large.mdl</div>
														<a onclick="copyToClipboard(document.getElementById('1004').innerHTML)" class = "btn btn-warning" role = "button">1</a>
													<div id="1005" class="hidden">models/props/cs_militia/tree_large_militia.mdl</div>
														<a onclick="copyToClipboard(document.getElementById('1005').innerHTML)" class = "btn btn-warning" role = "button">2</a>
													
													</p>
												</div>
											</div>
											<div class = "col-sm-6 col-md-3">
												<div class = "thumbnail">
						<!-- photo du props -->		<img src = "http://img4.hostingpics.net/thumbs/mini_853320moneypalletmdl.png" alt = "Arret de bus" style = "height:150px; width:300px;" >
												</div>
												<div class = "caption">
							<!-- Nom du props -->	<h3>Argent</h3>
			 <!-- Niveaux de risque de crash -->	<p><i><span style="color:green">Aucun risque</span></i></p>
													<p>
						<!-- model du props -->		<div id="1006" class="hidden">models\props\cs_assault\moneypallet.mdl</div>
														<a onclick="copyToClipboard(document.getElementById('1006').innerHTML)" class = "btn btn-warning" role = "button">1</a>
													<div id="1007" class="hidden">models\props\cs_assault\moneypallet02.mdl</div>
														<a onclick="copyToClipboard(document.getElementById('1007').innerHTML)" class = "btn btn-warning" role = "button">2</a>
													<div id="1008" class="hidden">models\props\cs_assault\moneypallet03.mdl</div>
														<a onclick="copyToClipboard(document.getElementById('1008').innerHTML)" class = "btn btn-warning" role = "button">3</a>
													
													</p>
												</div>
											</div>
										</div>
									</div>
									<br />
									<div id="GroupASub2">
										<h2>B</h2>
										<br />
										<div class = "row">
										   <div class = "col-sm-6 col-md-3">
											  <div class = "thumbnail">
												 <img src = "/bootstrap/images/kittens.jpg" alt = "Generic placeholder thumbnail" style = "height:150px; width:300px;" >
											  </div>
											  <div class = "caption">
													<h3>Nom du props</h3>
													<p><i>Recommandation</i></p>
													<p>
														<a href = "#" class = "btn btn-warning" role = "button">1</a>
													</p>
												</div>
											</div>
											<div class = "col-sm-6 col-md-3">
											  <div class = "thumbnail">
												 <img src = "/bootstrap/images/kittens.jpg" alt = "Generic placeholder thumbnail" style = "height:150px; width:300px;" >
											  </div>
											  <div class = "caption">
													<h3>Nom du props</h3>
													<p><i>Recommandation</i></p>
													<p>
														<a href = "#" class = "btn btn-warning" role = "button">1</a>
													</p>
												</div>
											</div>
											<div class = "col-sm-6 col-md-3">
											  <div class = "thumbnail">
												 <img src = "/bootstrap/images/kittens.jpg" alt = "Generic placeholder thumbnail" style = "height:150px; width:300px;" >
											  </div>
											  <div class = "caption">
													<h3>Nom du props</h3>
													<p><i>Recommandation</i></p>
													<p>
														<a href = "#" class = "btn btn-warning" role = "button">1</a>
													</p>
												</div>
											</div><div class = "col-sm-6 col-md-3">
											  <div class = "thumbnail">
												 <img src = "/bootstrap/images/kittens.jpg" alt = "Generic placeholder thumbnail" style = "height:150px; width:300px;" >
											  </div>
											  <div class = "caption">
													<h3>Nom du props</h3>
													<p><i>Recommandation</i></p>
													<p>
														<a href = "#" class = "btn btn-warning" role = "button">1</a>
													</p>
												</div>
											</div>
										</div>
									</div>
									<br />
									<div id="GroupASub3">
										<h2>C</h2>
										<br />
										<div class = "row">
										   <div class = "col-sm-6 col-md-3">
											  <div class = "thumbnail">
												 <img src = "/bootstrap/images/kittens.jpg" alt = "Generic placeholder thumbnail" style = "height:150px; width:300px;" >
											  </div>
											  <div class = "caption">
													<h3>Nom du props</h3>
													<p><i>Recommandation</i></p>
													<p>
														<a href = "#" class = "btn btn-warning" role = "button">1</a>
													</p>
												</div>
											</div>
											<div class = "col-sm-6 col-md-3">
											  <div class = "thumbnail">
												 <img src = "/bootstrap/images/kittens.jpg" alt = "Generic placeholder thumbnail" style = "height:150px; width:300px;" >
											  </div>
											  <div class = "caption">
													<h3>Nom du props</h3>
													<p><i>Recommandation</i></p>
													<p>
														<a href = "#" class = "btn btn-warning" role = "button">1</a>
													</p>
												</div>
											</div>
											<div class = "col-sm-6 col-md-3">
											  <div class = "thumbnail">
												 <img src = "/bootstrap/images/kittens.jpg" alt = "Generic placeholder thumbnail" style = "height:150px; width:300px;" >
											  </div>
											  <div class = "caption">
													<h3>Nom du props</h3>
													<p><i>Recommandation</i></p>
													<p>
														<a href = "#" class = "btn btn-warning" role = "button">1</a>
													</p>
												</div>
											</div><div class = "col-sm-6 col-md-3">
											  <div class = "thumbnail">
												 <img src = "/bootstrap/images/kittens.jpg" alt = "Generic placeholder thumbnail" style = "height:150px; width:300px;" >
											  </div>
											  <div class = "caption">
													<h3>Nom du props</h3>
													<p><i>Recommandation</i></p>
													<p>
														<a href = "#" class = "btn btn-warning" role = "button">1</a>
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<br />
						<div id="GroupB" class="col-md-12 group">
							<div class="panel panel-wiki">
								<div class="row">
									<div class="hidden-xs hidden-sm col-md-1">
										<span class="panel-heading panel-icone-wiki"><img src="/images/wiki/logo_wiki.png" /></span> 
									</div>
									<div class="col-md-11">
										<div class="panel-heading panel-heading-wiki"><h2>Props Interrieur</h2></div>
									</div>
								</div>
								<div class="panel-body">
									<div id="GroupBSub1">
										<h2>A</h2>
										<br />
										<div class = "row">
										   <div class = "col-sm-6 col-md-3">
											  <div class = "thumbnail">
												 <img src = "/bootstrap/images/kittens.jpg" alt = "Generic placeholder thumbnail" style = "height:150px; width:300px;" >
											  </div>
											  <div class = "caption">
													<h3>Nom du props</h3>
													<p><i>Recommandation</i></p>
													<p>
														<a href = "#" class = "btn btn-warning" role = "button">1</a>
													</p>
												</div>
											</div>
											<div class = "col-sm-6 col-md-3">
											  <div class = "thumbnail">
												 <img src = "/bootstrap/images/kittens.jpg" alt = "Generic placeholder thumbnail" style = "height:150px; width:300px;" >
											  </div>
											  <div class = "caption">
													<h3>Nom du props</h3>
													<p><i>Recommandation</i></p>
													<p>
														<a href = "#" class = "btn btn-warning" role = "button">1</a>
													</p>
												</div>
											</div>
											<div class = "col-sm-6 col-md-3">
											  <div class = "thumbnail">
												 <img src = "/bootstrap/images/kittens.jpg" alt = "Generic placeholder thumbnail" style = "height:150px; width:300px;" >
											  </div>
											  <div class = "caption">
													<h3>Nom du props</h3>
													<p><i>Recommandation</i></p>
													<p>
														<a href = "#" class = "btn btn-warning" role = "button">1</a>
													</p>
												</div>
											</div><div class = "col-sm-6 col-md-3">
											  <div class = "thumbnail">
												 <img src = "/bootstrap/images/kittens.jpg" alt = "Generic placeholder thumbnail" style = "height:150px; width:300px;" >
											  </div>
											  <div class = "caption">
													<h3>Nom du props</h3>
													<p><i>Recommandation</i></p>
													<p>
														<a href = "#" class = "btn btn-warning" role = "button">1</a>
													</p>
												</div>
											</div>
										</div>
									</div>
									<br />
									<div id="GroupBSub2">
										<h2>B</h2>
										<br />
										<div class = "row">
										   <div class = "col-sm-6 col-md-3">
											  <div class = "thumbnail">
												 <img src = "/bootstrap/images/kittens.jpg" alt = "Generic placeholder thumbnail" style = "height:150px; width:300px;" >
											  </div>
											  <div class = "caption">
													<h3>Nom du props</h3>
													<p><i>Recommandation</i></p>
													<p>
														<a href = "#" class = "btn btn-warning" role = "button">1</a>
													</p>
												</div>
											</div>
											<div class = "col-sm-6 col-md-3">
											  <div class = "thumbnail">
												 <img src = "/bootstrap/images/kittens.jpg" alt = "Generic placeholder thumbnail" style = "height:150px; width:300px;" >
											  </div>
											  <div class = "caption">
													<h3>Nom du props</h3>
													<p><i>Recommandation</i></p>
													<p>
														<a href = "#" class = "btn btn-warning" role = "button">1</a>
													</p>
												</div>
											</div>
											<div class = "col-sm-6 col-md-3">
											  <div class = "thumbnail">
												 <img src = "/bootstrap/images/kittens.jpg" alt = "Generic placeholder thumbnail" style = "height:150px; width:300px;" >
											  </div>
											  <div class = "caption">
													<h3>Nom du props</h3>
													<p><i>Recommandation</i></p>
													<p>
														<a href = "#" class = "btn btn-warning" role = "button">1</a>
													</p>
												</div>
											</div><div class = "col-sm-6 col-md-3">
											  <div class = "thumbnail">
												 <img src = "/bootstrap/images/kittens.jpg" alt = "Generic placeholder thumbnail" style = "height:150px; width:300px;" >
											  </div>
											  <div class = "caption">
													<h3>Nom du props</h3>
													<p><i>Recommandation</i></p>
													<p>
														<a href = "#" class = "btn btn-warning" role = "button">1</a>
													</p>
												</div>
											</div>
										</div>
									</div>
									<br />
									<div id="GroupBSub3">
										<h2>C</h2>
										<br />
										<div class = "row">
										   <div class = "col-sm-6 col-md-3">
											  <div class = "thumbnail">
												 <img src = "/bootstrap/images/kittens.jpg" alt = "Generic placeholder thumbnail" style = "height:150px; width:300px;" >
											  </div>
											  <div class = "caption">
													<h3>Nom du props</h3>
													<p><i>Recommandation</i></p>
													<p>
														<a href = "#" class = "btn btn-warning" role = "button">1</a>
													</p>
												</div>
											</div>
											<div class = "col-sm-6 col-md-3">
											  <div class = "thumbnail">
												 <img src = "/bootstrap/images/kittens.jpg" alt = "Generic placeholder thumbnail" style = "height:150px; width:300px;" >
											  </div>
											  <div class = "caption">
													<h3>Nom du props</h3>
													<p><i>Recommandation</i></p>
													<p>
														<a href = "#" class = "btn btn-warning" role = "button">1</a>
													</p>
												</div>
											</div>
											<div class = "col-sm-6 col-md-3">
											  <div class = "thumbnail">
												 <img src = "/bootstrap/images/kittens.jpg" alt = "Generic placeholder thumbnail" style = "height:150px; width:300px;" >
											  </div>
											  <div class = "caption">
													<h3>Nom du props</h3>
													<p><i>Recommandation</i></p>
													<p>
														<a href = "#" class = "btn btn-warning" role = "button">1</a>
													</p>
												</div>
											</div><div class = "col-sm-6 col-md-3">
											  <div class = "thumbnail">
												 <img src = "/bootstrap/images/kittens.jpg" alt = "Generic placeholder thumbnail" style = "height:150px; width:300px;" >
											  </div>
											  <div class = "caption">
													<h3>Nom du props</h3>
													<p><i>Recommandation</i></p>
													<p>
														<a href = "#" class = "btn btn-warning" role = "button">1</a>
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<br />
						<div id="GroupC" class="col-md-12 group">
							<div class="panel panel-wiki">
								<div class="row">
									<div class="hidden-xs hidden-sm col-md-1">
										<span class="panel-heading panel-icone-wiki"><img src="/images/wiki/logo_wiki.png" /></span> 
									</div>
									<div class="col-md-11">
										<div class="panel-heading panel-heading-wiki"><h2>Skins Joueurs</h2></div>
									</div>
								</div>
								<div class="panel-body">
									<div id="GroupCSub1">
										<h2>Humanoïde</h2>
										<br />
										<div class = "row">
										   <div class = "col-sm-6 col-md-3">
											  <div class = "thumbnail">
												 <img src = "/bootstrap/images/kittens.jpg" alt = "Generic placeholder thumbnail" style = "height:150px; width:300px;" >
											  </div>
											  <div class = "caption">
													<h3>Nom du Skin</h3>
													<p><i>Recommandation</i></p>
													<p>
														<a href = "#" class = "btn btn-warning" role = "button">1</a>
													</p>
												</div>
											</div>
											<div class = "col-sm-6 col-md-3">
											  <div class = "thumbnail">
												 <img src = "/bootstrap/images/kittens.jpg" alt = "Generic placeholder thumbnail" style = "height:150px; width:300px;" >
											  </div>
											  <div class = "caption">
													<h3>Nom du Skin</h3>
													<p><i>Recommandation</i></p>
													<p>
														<a href = "#" class = "btn btn-warning" role = "button">1</a>
													</p>
												</div>
											</div>
											<div class = "col-sm-6 col-md-3">
											  <div class = "thumbnail">
												 <img src = "/bootstrap/images/kittens.jpg" alt = "Generic placeholder thumbnail" style = "height:150px; width:300px;" >
											  </div>
											  <div class = "caption">
													<h3>Nom du Skin</h3>
													<p><i>Recommandation</i></p>
													<p>
														<a href = "#" class = "btn btn-warning" role = "button">1</a>
													</p>
												</div>
											</div><div class = "col-sm-6 col-md-3">
											  <div class = "thumbnail">
												 <img src = "/bootstrap/images/kittens.jpg" alt = "Generic placeholder thumbnail" style = "height:150px; width:300px;" >
											  </div>
											  <div class = "caption">
													<h3>Nom du Skin</h3>
													<p><i>Recommandation</i></p>
													<p>
														<a href = "#" class = "btn btn-warning" role = "button">1</a>
													</p>
												</div>
											</div>
										</div>
									</div>
									<br />
									<div id="GroupCSub2">
										<h2>Animal</h2>
										<br />
										<div class = "row">
										   <div class = "col-sm-6 col-md-3">
											  <div class = "thumbnail">
												 <img src = "/bootstrap/images/kittens.jpg" alt = "Generic placeholder thumbnail" style = "height:150px; width:300px;" >
											  </div>
											  <div class = "caption">
													<h3>Nom du Skin</h3>
													<p><i>Recommandation</i></p>
													<p>
														<a href = "#" class = "btn btn-warning" role = "button">1</a>
													</p>
												</div>
											</div>
											<div class = "col-sm-6 col-md-3">
											  <div class = "thumbnail">
												 <img src = "/bootstrap/images/kittens.jpg" alt = "Generic placeholder thumbnail" style = "height:150px; width:300px;" >
											  </div>
											  <div class = "caption">
													<h3>Nom du Skin</h3>
													<p><i>Recommandation</i></p>
													<p>
														<a href = "#" class = "btn btn-warning" role = "button">1</a>
													</p>
												</div>
											</div>
											<div class = "col-sm-6 col-md-3">
											  <div class = "thumbnail">
												 <img src = "/bootstrap/images/kittens.jpg" alt = "Generic placeholder thumbnail" style = "height:150px; width:300px;" >
											  </div>
											  <div class = "caption">
													<h3>Nom du Skin</h3>
													<p><i>Recommandation</i></p>
													<p>
														<a href = "#" class = "btn btn-warning" role = "button">1</a>
													</p>
												</div>
											</div><div class = "col-sm-6 col-md-3">
											  <div class = "thumbnail">
												 <img src = "/bootstrap/images/kittens.jpg" alt = "Generic placeholder thumbnail" style = "height:150px; width:300px;" >
											  </div>
											  <div class = "caption">
													<h3>Nom du Skin</h3>
													<p><i>Recommandation</i></p>
													<p>
														<a href = "#" class = "btn btn-warning" role = "button">1</a>
													</p>
												</div>
											</div>
										</div>
									</div>
									<br />
									<div id="GroupCSub3">
										<h2>Objet</h2>
										<br />
										<div class = "row">
										   <div class = "col-sm-6 col-md-3">
											  <div class = "thumbnail">
												 <img src = "/bootstrap/images/kittens.jpg" alt = "Generic placeholder thumbnail" style = "height:150px; width:300px;" >
											  </div>
											  <div class = "caption">
													<h3>Nom du Skin</h3>
													<p><i>Recommandation</i></p>
													<p>
														<a href = "#" class = "btn btn-warning" role = "button">1</a>
													</p>
												</div>
											</div>
											<div class = "col-sm-6 col-md-3">
											  <div class = "thumbnail">
												 <img src = "/bootstrap/images/kittens.jpg" alt = "Generic placeholder thumbnail" style = "height:150px; width:300px;" >
											  </div>
											  <div class = "caption">
													<h3>Nom du Skin</h3>
													<p><i>Recommandation</i></p>
													<p>
														<a href = "#" class = "btn btn-warning" role = "button">1</a>
													</p>
												</div>
											</div>
											<div class = "col-sm-6 col-md-3">
											  <div class = "thumbnail">
												 <img src = "/bootstrap/images/kittens.jpg" alt = "Generic placeholder thumbnail" style = "height:150px; width:300px;" >
											  </div>
											  <div class = "caption">
													<h3>Nom du Skin</h3>
													<p><i>Recommandation</i></p>
													<p>
														<a href = "#" class = "btn btn-warning" role = "button">1</a>
													</p>
												</div>
											</div><div class = "col-sm-6 col-md-3">
											  <div class = "thumbnail">
												 <img src = "/bootstrap/images/kittens.jpg" alt = "Generic placeholder thumbnail" style = "height:150px; width:300px;" >
											  </div>
											  <div class = "caption">
													<h3>Nom du Skin</h3>
													<p><i>Recommandation</i></p>
													<p>
														<a href = "#" class = "btn btn-warning" role = "button">1</a>
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				
				</div>
				<!--Nav Bar -->
				<nav class="col-md-2 bs-docs-sidebar">
					<ul id="sidebar" class="nav nav-stacked fixed">
						<li>
							<a href="#GroupA">Props Exterrieur</a>
							<ul class="nav nav-stacked">
								<li><a href="#GroupASub1">A</a></li>
								<li><a href="#GroupASub2">B</a></li>
								<li><a href="#GroupASub3">C</a></li>
							</ul>
						</li>
						<li>
							<a href="#GroupB">Props Intérrieur</a>
							<ul class="nav nav-stacked">
								<li><a href="#GroupBSub1">A</a></li>
								<li><a href="#GroupBSub2">B</a></li>
								<li><a href="#GroupBSub3">C</a></li>
							</ul>
						</li>
						<li>
							<a href="#GroupC">Skins Joueurs</a>
							<ul class="nav nav-stacked">
								<li><a href="#GroupCSub1">Humanoïde</a></li>
								<li><a href="#GroupCSub2">Animal</a></li>
								<li><a href="#GroupCSub3">Objet</a></li>
							</ul>
						</li>
					</ul>
				</nav>
			</div>
		</div>
<script>
  function copyToClipboard(text) {
    window.prompt("Faites Ctrl+C pour 1 le code puis Ctrl+V dans votre console CS:GO pour le coller", text);
  }
</script>