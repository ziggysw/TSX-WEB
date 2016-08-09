 <body>
 
        <p><button>Menu</button></p>
                <nav>
                    <ul>
                        <li><a href="club.php">LE CLUB</a></li>
                        <li><a href="club.php#membres">LES MEMBRES</a></li>
                        <li><a href="#">LES MACHINES</a></li>
                        <li><a href="#">LES TARIFS</a></li>
                        <li><a href="#">LES INFOS</a></li>
                        <li><a href="#">BAPTÊMES</a></li>
                        <li><a href="#">CONTACT</a></li>
                        <li><a href="#">VENIR</a></li>
                    </ul>
                </nav>   
    </body>
	 <script>
        $('#bouton_menu').click(function () {
        var effect = 'slide';
        var options = { direction: 'right' };
        var duration = 700;
        $('#menu').toggle(effect, options, duration);
        });
        </script>