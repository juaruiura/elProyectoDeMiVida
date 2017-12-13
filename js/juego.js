window.onload = cargarPagina;

var aciertos = 0;
var intentos = 0;
var intentosMax = 15;
var reminder = 0;
var anterior;

function cargarPagina(){
	cargarListeners();
	asignarValores();

	//Inicializar firebase
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

//Asigna valores a las imágenes de las cartas
function asignarValores(){
	var random = 0;
	var count = 18;
	var valores = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];
	for (var i = 1; i <= 18; i++) {
		random = Math.floor(Math.random()*count);
		document.getElementById("carta"+i).value = valores[random];
		valores.splice(random, 1);
		count--;
	}
}

//Carga los listeners
function cargarListeners(){
	document.getElementById("carta1").addEventListener("click", voltear, false);
	document.getElementById("carta2").addEventListener("click", voltear, false);
	document.getElementById("carta3").addEventListener("click", voltear, false);
	document.getElementById("carta4").addEventListener("click", voltear, false);
	document.getElementById("carta5").addEventListener("click", voltear, false);
	document.getElementById("carta6").addEventListener("click", voltear, false);
	document.getElementById("carta7").addEventListener("click", voltear, false);
	document.getElementById("carta8").addEventListener("click", voltear, false);
	document.getElementById("carta9").addEventListener("click", voltear, false);
	document.getElementById("carta10").addEventListener("click", voltear, false);
	document.getElementById("carta11").addEventListener("click", voltear, false);
	document.getElementById("carta12").addEventListener("click", voltear, false);
	document.getElementById("carta13").addEventListener("click", voltear, false);
	document.getElementById("carta14").addEventListener("click", voltear, false);
	document.getElementById("carta15").addEventListener("click", voltear, false);
	document.getElementById("carta16").addEventListener("click", voltear, false);
	document.getElementById("carta17").addEventListener("click", voltear, false);
	document.getElementById("carta18").addEventListener("click", voltear, false);

	document.getElementById("carta1").addEventListener("mouseover", duda, false);
	document.getElementById("carta2").addEventListener("mouseover", duda, false);
	document.getElementById("carta3").addEventListener("mouseover", duda, false);
	document.getElementById("carta4").addEventListener("mouseover", duda, false);
	document.getElementById("carta5").addEventListener("mouseover", duda, false);
	document.getElementById("carta6").addEventListener("mouseover", duda, false);
	document.getElementById("carta7").addEventListener("mouseover", duda, false);
	document.getElementById("carta8").addEventListener("mouseover", duda, false);
	document.getElementById("carta9").addEventListener("mouseover", duda, false);
	document.getElementById("carta10").addEventListener("mouseover", duda, false);
	document.getElementById("carta11").addEventListener("mouseover", duda, false);
	document.getElementById("carta12").addEventListener("mouseover", duda, false);
	document.getElementById("carta13").addEventListener("mouseover", duda, false);
	document.getElementById("carta14").addEventListener("mouseover", duda, false);
	document.getElementById("carta15").addEventListener("mouseover", duda, false);
	document.getElementById("carta16").addEventListener("mouseover", duda, false);
	document.getElementById("carta17").addEventListener("mouseover", duda, false);
	document.getElementById("carta18").addEventListener("mouseover", duda, false);

	document.getElementById("carta1").addEventListener("mouseout", dudaReset, false);
	document.getElementById("carta2").addEventListener("mouseout", dudaReset, false);
	document.getElementById("carta3").addEventListener("mouseout", dudaReset, false);
	document.getElementById("carta4").addEventListener("mouseout", dudaReset, false);
	document.getElementById("carta5").addEventListener("mouseout", dudaReset, false);
	document.getElementById("carta6").addEventListener("mouseout", dudaReset, false);
	document.getElementById("carta7").addEventListener("mouseout", dudaReset, false);
	document.getElementById("carta8").addEventListener("mouseout", dudaReset, false);
	document.getElementById("carta9").addEventListener("mouseout", dudaReset, false);
	document.getElementById("carta10").addEventListener("mouseout", dudaReset, false);
	document.getElementById("carta11").addEventListener("mouseout", dudaReset, false);
	document.getElementById("carta12").addEventListener("mouseout", dudaReset, false);
	document.getElementById("carta13").addEventListener("mouseout", dudaReset, false);
	document.getElementById("carta14").addEventListener("mouseout", dudaReset, false);
	document.getElementById("carta15").addEventListener("mouseout", dudaReset, false);
	document.getElementById("carta16").addEventListener("mouseout", dudaReset, false);
	document.getElementById("carta17").addEventListener("mouseout", dudaReset, false);
	document.getElementById("carta18").addEventListener("mouseout", dudaReset, false);


	document.getElementById("reiniciar").addEventListener("click", reiniciar, false);

	document.getElementById("boton-facil").addEventListener("click", cambiarAFacil, false);
	document.getElementById("boton-dificil").addEventListener("click", cambiarADificil, false);

	document.getElementById("boton-fondo-verde").addEventListener("click", cambiarAVerde, false);
	document.getElementById("boton-fondo-rojo").addEventListener("click", cambiarARojo, false);
	document.getElementById("boton-fondo-amarillo").addEventListener("click", cambiarAAmarillo, false);

	document.getElementById("fondo").addEventListener("keydown", ayuda, false);
}

function descargarListeners(){
	document.getElementById("carta1").removeEventListener("click", voltear, false);
	document.getElementById("carta2").removeEventListener("click", voltear, false);
	document.getElementById("carta3").removeEventListener("click", voltear, false);
	document.getElementById("carta4").removeEventListener("click", voltear, false);
	document.getElementById("carta5").removeEventListener("click", voltear, false);
	document.getElementById("carta6").removeEventListener("click", voltear, false);
	document.getElementById("carta7").removeEventListener("click", voltear, false);
	document.getElementById("carta8").removeEventListener("click", voltear, false);
	document.getElementById("carta9").removeEventListener("click", voltear, false);
	document.getElementById("carta10").removeEventListener("click", voltear, false);
	document.getElementById("carta11").removeEventListener("click", voltear, false);
	document.getElementById("carta12").removeEventListener("click", voltear, false);
	document.getElementById("carta13").removeEventListener("click", voltear, false);
	document.getElementById("carta14").removeEventListener("click", voltear, false);
	document.getElementById("carta15").removeEventListener("click", voltear, false);
	document.getElementById("carta16").removeEventListener("click", voltear, false);
	document.getElementById("carta17").removeEventListener("click", voltear, false);
	document.getElementById("carta18").removeEventListener("click", voltear, false);

	document.getElementById("carta1").removeEventListener("mouseover", duda, false);
	document.getElementById("carta2").removeEventListener("mouseover", duda, false);
	document.getElementById("carta3").removeEventListener("mouseover", duda, false);
	document.getElementById("carta4").removeEventListener("mouseover", duda, false);
	document.getElementById("carta5").removeEventListener("mouseover", duda, false);
	document.getElementById("carta6").removeEventListener("mouseover", duda, false);
	document.getElementById("carta7").removeEventListener("mouseover", duda, false);
	document.getElementById("carta8").removeEventListener("mouseover", duda, false);
	document.getElementById("carta9").removeEventListener("mouseover", duda, false);
	document.getElementById("carta10").removeEventListener("mouseover", duda, false);
	document.getElementById("carta11").removeEventListener("mouseover", duda, false);
	document.getElementById("carta12").removeEventListener("mouseover", duda, false);
	document.getElementById("carta13").removeEventListener("mouseover", duda, false);
	document.getElementById("carta14").removeEventListener("mouseover", duda, false);
	document.getElementById("carta15").removeEventListener("mouseover", duda, false);
	document.getElementById("carta16").removeEventListener("mouseover", duda, false);
	document.getElementById("carta17").removeEventListener("mouseover", duda, false);
	document.getElementById("carta18").removeEventListener("mouseover", duda, false);

	document.getElementById("carta1").removeEventListener("mouseout", dudaReset, false);
	document.getElementById("carta2").removeEventListener("mouseout", dudaReset, false);
	document.getElementById("carta3").removeEventListener("mouseout", dudaReset, false);
	document.getElementById("carta4").removeEventListener("mouseout", dudaReset, false);
	document.getElementById("carta5").removeEventListener("mouseout", dudaReset, false);
	document.getElementById("carta6").removeEventListener("mouseout", dudaReset, false);
	document.getElementById("carta7").removeEventListener("mouseout", dudaReset, false);
	document.getElementById("carta8").removeEventListener("mouseout", dudaReset, false);
	document.getElementById("carta9").removeEventListener("mouseout", dudaReset, false);
	document.getElementById("carta10").removeEventListener("mouseout", dudaReset, false);
	document.getElementById("carta11").removeEventListener("mouseout", dudaReset, false);
	document.getElementById("carta12").removeEventListener("mouseout", dudaReset, false);
	document.getElementById("carta13").removeEventListener("mouseout", dudaReset, false);
	document.getElementById("carta14").removeEventListener("mouseout", dudaReset, false);
	document.getElementById("carta15").removeEventListener("mouseout", dudaReset, false);
	document.getElementById("carta16").removeEventListener("mouseout", dudaReset, false);
	document.getElementById("carta17").removeEventListener("mouseout", dudaReset, false);
	document.getElementById("carta18").removeEventListener("mouseout", dudaReset, false);

	document.getElementById("boton-facil").removeEventListener("click", cambiarAFacil, false);
	document.getElementById("boton-dificil").removeEventListener("click", cambiarADificil, false);
}

//Volteos
function voltear(event){
	var posicion = event.target.id;
	var valor = document.getElementById(posicion).value;
	document.getElementById(posicion).src = ("img/carta" + valor + ".jpg");
	document.getElementById(posicion).removeEventListener("mouseover", duda);
	document.getElementById(posicion).removeEventListener("mouseout", dudaReset);
	if(reminder == valor){
		aciertos++;
		escribirDatos();
		document.getElementById(posicion).removeEventListener("click", voltear);
		document.getElementById(anterior).removeEventListener("click", voltear);
		reminder = 0;
		if(aciertos == 9){
		ganar();
		return;
		}
		return;
	}
	if(reminder == 0){
		reminder = valor;
		anterior = posicion;
		return;
	}
	reminder = 0;
	intentos ++;
	escribirDatos();
	if(intentos == intentosMax){
		perder();
		return;
	}
	setTimeout(function(){ document.getElementById(posicion).src = ("img/cardback.jpg"); document.getElementById(anterior).src = ("img/cardback.jpg");
							document.getElementById(posicion).addEventListener("mouseover", duda);
							document.getElementById(posicion).addEventListener("mouseout", dudaReset);
							document.getElementById(anterior).addEventListener("mouseover", duda);
							document.getElementById(anterior).addEventListener("mouseout", dudaReset);}, 500);
}

//Al pasar el ratón cambia la imagen
function duda(event){
	var posicion = event.target.id;
	document.getElementById(posicion).src = "img/duda.jpg";
}

//Al quitar el ratón cambia la imagen
function dudaReset(event){
	var posicion = event.target.id;
	document.getElementById(posicion).src = "img/cardback.jpg";
}

//Escribir datos del juego
function escribirDatos(){
	document.getElementById("datosJuego").innerHTML = ("Aciertos: " + aciertos + " | Intentos restantes : " + (intentosMax - intentos));
	if(intentos > intentosMax){
		document.getElementById("datosJuego").innerHTML = ("Aciertos: " + aciertos + " | Intentos restantes : 0");
	}
}

//El usuario gana y no puede jugar más
function perder(){
	descargarListeners();
	setTimeout(function(){
							document.getElementById("carta8").src = ("img/l.jpg");
							document.getElementById("carta9").src = ("img/o.jpg");
							document.getElementById("carta10").src = ("img/s.jpg");
							document.getElementById("carta11").src = ("img/e.jpg");
						}, 300);
}

//El usuario gana y no puede jugar más
function ganar(){
	descargarListeners();
	setTimeout(function(){
							document.getElementById("carta7").src = ("img/y.jpg");
							document.getElementById("carta8").src = ("img/o.jpg");
							document.getElementById("carta9").src = ("img/u.jpg");
							document.getElementById("carta10").src = ("img/w.jpg");
							document.getElementById("carta11").src = ("img/i.jpg");
							document.getElementById("carta12").src = ("img/n.jpg");
						}, 300);
}

//Botón de reinicio
function reiniciar(){
	for(var i = 1; i <= 18; i++){
		document.getElementById("carta"+i).src = ("img/cardback.jpg");
	}
	asignarValores();
	cargarListeners();
	intentos = 0;
	aciertos = 0;
	escribirDatos();
	document.getElementById("aciertos").innerHTML = ("Aciertos: " + aciertos);
	document.getElementById("fallos").innerHTML = ("Fallos: " + fallos);
	cargarListeners();
}

//Cambios dificultad
function cambiarAFacil(){
	intentosMax = 15;
	escribirDatos();
}

function cambiarADificil(){
	intentosMax = 10;
	escribirDatos();
	if(intentos >= intentosMax){
		perder();
	}
}

//Cambios de fondo
function cambiarAVerde(){
	document.getElementById("fondo").style.background = "#008000";
}

function cambiarARojo(){
	document.getElementById("fondo").style.background = "#FF0000";
}

function cambiarAAmarillo(){
	document.getElementById("fondo").style.background = "#FFA500";
}

//Ayuda
function ayuda(tecla){
	if(tecla.keyCode == 32){
		intentos -= 5;
		escribirDatos();
	}
	document.getElementById("fondo").removeEventListener("keydown", ayuda, false);
}

function logOut() {
	firebase.auth().signOut().then(function() {
	}, function(error) {
		alert("Error");
	});
}