window.onload = inicializar;

function inicializar(){
	// Initialize Firebase
	var config = {
	  	apiKey: "AIzaSyBhVysR_cfDs6VfIISn9QNc4fyO1Tubw_w",
	 	authDomain: "l2game-5e775.firebaseapp.com",
	 	databaseURL: "https://l2game-5e775.firebaseio.com",
	  	storageBucket: "l2game-5e775.appspot.com",
	 	messagingSenderId: "60250418531"
	  };
	firebase.initializeApp(config);

	//Cambia la barra de navegación en función de si el usuario está logueado o no
	firebase.auth().onAuthStateChanged(function(user) {
  		if (user) {
    		logueado = true;
    		botonLog.innerHTML = "";
    		botonReg.innerHTML = '<a href=""><span class="glyphicon glyphicon-log-out"></span> Cerrar sesión</a>';
    		document.getElementById("botonReg").addEventListener("click", logOut, false);
  		} else {
    		logueado = false;
    		botonLog.innerHTML = '<a href="login.html"><span class="glyphicon glyphicon-log-in"></span> Loguéate</a>';
    		botonReg.innerHTML = '<a href="register.html"><span class="glyphicon glyphicon-user"></span> Regístrate</a>';
  		}
	});
}

function logOut() {
	firebase.auth().signOut().then(function() {
	}, function(error) {
		alert("Error");
	});
}