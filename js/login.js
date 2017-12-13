window.onload = inicializar;

var formularioLogin;

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

	formularioLogin = document.getElementById("formularioLogin");
	formularioLogin.addEventListener("submit", autenticar, false);
}

function autenticar(event){
	event.preventDefault();
	var usuario = event.target.usuario.value;
	var password = event.target.password.value;

	firebase.auth().signInWithEmailAndPassword(usuario, password)
		.then(function(result){
			window.location.href = "main.html";
		})
	 	.catch(function(error){
	 		$("#errorLogin").modal();
		});
}