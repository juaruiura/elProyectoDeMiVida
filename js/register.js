window.onload = inicializar;

function inicializar(){
	document.getElementById("formulario").addEventListener("submit", registrar, false);

	// Initialize Firebase
	var config = {
	  	apiKey: "AIzaSyBhVysR_cfDs6VfIISn9QNc4fyO1Tubw_w",
	 	authDomain: "l2game-5e775.firebaseapp.com",
	 	databaseURL: "https://l2game-5e775.firebaseio.com",
	  	storageBucket: "l2game-5e775.appspot.com",
	 	messagingSenderId: "60250418531"
	};
	firebase.initializeApp(config);
}

function registrar(event){
	event.preventDefault();
	var correo = event.target.correo.value;
	var password = event.target.password.value;
	if(validar(event)){
		firebase.auth().createUserWithEmailAndPassword(correo, password)
		.then(function(result){
			window.location.href = "main.html";
		})
		.catch(function(error) {
		});
	}
}

//Funciones que validan...
function validar(event){
	var resultado = true;

	var usuario = event.target.usuario.value;
	correo = event.target.correo.value;
	password = event.target.password.value;
	var confirmarcontr = event.target.confirmarcontr.value;
	var sexoH = document.getElementById("sexoH");
	var sexoM = document.getElementById("sexoM");
	var juego1 = document.getElementById("juego1");
	var juego2 = document.getElementById("juego2");
	var juego3 = document.getElementById("juego3");
	var juegoPrincipal = event.target.juegoPrincipal.value;
	var edad = event.target.edad.value;
	var fechaNacim = event.target.fechaNacim.value;
	var biografia = event.target.biografia.value;
	var terminos = document.getElementById("terminos");
	
	//Usuario
	if(usuario == ""){
		event.preventDefault();
		document.getElementById("error-nombre").style.visibility = "visible";
		resultado = false;
	}else{
		document.getElementById("error-nombre").style.visibility = "hidden";
	}

	//Correo
	if(correo == ""){
		event.preventDefault();
		document.getElementById("error-correo").style.visibility = "visible";
		resultado = false;
	}else{
		document.getElementById("error-correo").style.visibility = "hidden";
	}

	//Contraseña
	if(password == ""){
		event.preventDefault();
		document.getElementById("error-contr").style.visibility = "visible";
		resultado = false;
	}else{
		document.getElementById("error-contr").style.visibility = "hidden";
	}

	//Confirmar Contraseña
	if(confirmarcontr == ""){
		event.preventDefault();
		document.getElementById("error-confirmarcontr").style.visibility = "visible";
		resultado = false;
	}else{
		document.getElementById("error-confirmarcontr").style.visibility = "hidden";
	}

	//Concidencia de passwords
	if(password != confirmarcontr && password != "" && confirmarcontr != ""){
		document.getElementById("error-coincidencia").style.visibility = "visible";
		resultado = false;
	}else{
		document.getElementById("error-coincidencia").style.visibility = "hidden";
	}

	//Sexo
	if(!sexoM.checked && !sexoH.checked){
		event.preventDefault();
		document.getElementById("error-sexo").style.visibility = "visible";
		resultado = false;
	}else{
		document.getElementById("error-sexo").style.visibility = "hidden";
	}

	//Juegos
	if(!juego1.checked && !juego2.checked && !juego3.checked){
		event.preventDefault();
		document.getElementById("error-juegos").style.visibility = "visible";
		resultado = false;
	}else{
		document.getElementById("error-juegos").style.visibility = "hidden";
	}

	//Edad
	if(edad == ""){
		event.preventDefault();
		document.getElementById("error-edad").style.visibility = "visible";
		resultado = false;
	}else{
		document.getElementById("error-edad").style.visibility = "hidden";
	}

	//Fecha de Nacimiento
	if(fechaNacim == ""){
		event.preventDefault();
		document.getElementById("error-fechaNacim").style.visibility = "visible";
		resultado = false;
	}else{
		document.getElementById("error-fechaNacim").style.visibility = "hidden";
	}

	//Juego Principal
	if(juegoPrincipal == "Elija un juego"){
		event.preventDefault();
		document.getElementById("error-juegoPrin").style.visibility = "visible";
		resultado = false;
	}else{
		document.getElementById("error-juegoPrin").style.visibility = "hidden";
	}

	//Biografía
	if(biografia == ""){
		event.preventDefault();
		document.getElementById("error-biografia").style.visibility = "visible";
		resultado = false;
	}else{
		document.getElementById("error-biografia").style.visibility = "hidden";
	}

	//Términos
	if(!terminos.checked){
		event.preventDefault();
		document.getElementById("error-term").style.visibility = "visible";
		resultado = false;
	}else{
		document.getElementById("error-term").style.visibility = "hidden";
	}

	//Que la edad esté comprendida entre 14 y 99
	if (edad != "") {
		if(edad < 14 || edad > 99){
			event.preventDefault();
			document.getElementById("error-edad-2").style.visibility = "visible";
			resultado = false;
		}
	}else{
		document.getElementById("error-edad-2").style.visibility = "hidden";
	}
	return resultado;
}