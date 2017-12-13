window.onload = inicializar;

var formSolicitudes;
var refSolicitudes;
var formRespuestas;
var refRespuestas;
var tbodyTablaSolicitud;
var CREATE = "Crear solicitud de mazo";
var UPDATE = "Modificar solicitud de mazo";
var CREATE2 = "Crear propuesta de mazo";
var UPDATE2 = "Modificar propuesta de mazo";
var modo = CREATE;
var modo2 = CREATE2;
var refSolicitudAEditar;
var refRespuestaAEditar;
var admin = false;
var storageRef;
var fichero;
var imagenAEditar;
var selectSolicitud;
var contador;
var añadirEdicion = false;

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

	//Cambia la barra de navegación si se está logueado y si es admin permite realizar actualizaciones y borrar en la base de datos
	firebase.auth().onAuthStateChanged(function(user) {
  		if (user) {
  			if (firebase.auth().currentUser.email == "admin@l2g.com") {
  				admin = true;
  			}
    		botonLog.innerHTML = "";
    		botonReg.innerHTML = '<a href=""><span class="glyphicon glyphicon-log-out"></span> Cerrar sesión</a>';
    		document.getElementById("botonReg").addEventListener("click", logOut, false);
  		} else {
    		botonLog.innerHTML = '<a href="login.html"><span class="glyphicon glyphicon-log-in"></span> Loguéate</a>';
    		botonReg.innerHTML = '<a href="register.html"><span class="glyphicon glyphicon-user"></span> Regístrate</a>';
    		esconder();
  		}
	});

	imagenMazo = document.getElementById("imagenMazo");
	tbodyTablaSolicitud = document.getElementById("tbody-tabla-solicitud");
	tbodyTablaRespuesta = document.getElementById("tbody-tabla-respuesta");
	selectSolicitud = document.getElementById("solicitudAResponder");
	refSolicitudes = firebase.database().ref().child("solicitudes");
	refRespuestas = firebase.database().ref().child("respuestas");
	formRespuestas = document.getElementById("form-respuesta-solicitudes");
	formRespuestas.addEventListener("submit", enviarDatos2, false);
	formSolicitudes = document.getElementById("form-solicitud-mazos");
	formSolicitudes.addEventListener("submit", enviarDatos, false);	
	storageRef = firebase.storage().ref();

	leerDatos();
	leerDatos2();
}

function validarSolicitud(){
	var pasaValidacion = true;
	if(event.target.cartaPrincipal.value == ""){
		document.getElementById("error-cartaPrincipal").style.visibility = "visible";
		pasaValidacion = false;
	}else{
		document.getElementById("error-cartaPrincipal").style.visibility = "hidden";
	}
	if(event.target.coste.value == ""){
		document.getElementById("error-coste1").style.visibility = "visible";
		pasaValidacion = false;
	}else{
		if(event.target.coste.value < 2 || event.target.coste.value > 7){
		document.getElementById("error-coste2").style.visibility = "visible";
		pasaValidacion = false;
		}else{
			document.getElementById("error-coste2").style.visibility = "hidden";
		}
		document.getElementById("error-coste1").style.visibility = "hidden";
	}
	if (event.target.arenaMaxima.value == "Elige el límite de arena para las cartas") {
		document.getElementById("error-arenaMaxima").style.visibility = "visible";
		pasaValidacion = false;
	}else{
		document.getElementById("error-arenaMaxima").style.visibility = "hidden";
	}
	if (!document.getElementById("formatoE").checked && !document.getElementById("formatoD").checked){
		document.getElementById("error-formato").style.visibility = "visible";
		pasaValidacion = false;
	}else{
		document.getElementById("error-formato").style.visibility = "hidden";
	}
	if(document.getElementById("contacto").value == ""){
		document.getElementById("error-contacto").style.visibility = "visible";
		pasaValidacion = false;
	}else{
		document.getElementById("error-contacto").style.visibility = "hidden";
	}
	if(modo == CREATE){
		if(document.getElementById("imagenMazo").value == ""){
			document.getElementById("error-imagenMazo").style.visibility = "visible";
			pasaValidacion = false;
		}else{
			document.getElementById("error-imagenMazo").style.visibility = "hidden";
		}
	}
	return pasaValidacion;
}

function enviarDatos(event){
	event.preventDefault();

	var imagenASubir = imagenMazo.files[0];
	var valorCartaPrincipal = event.target.cartaPrincipal.value;
	var valorCoste = event.target.coste.value;
	var valorArenaMaxima = event.target.arenaMaxima.value;
	var valorFormato = event.target.formato.value;
	var valorContacto = event.target.contacto.value;

	if(validarSolicitud()){
		switch(modo){
			case CREATE:
				var uploadTask = storageRef.child('imagenes/' + imagenASubir.name).put(imagenASubir);
				uploadTask.on('state_changed', function(snapshot){
				  // Observe state change events such as progress, pause, and resume
				}, function(error) {
				  // Handle unsuccessful uploads
				}, function() {
				  // Handle successful uploads on complete
					var downloadURL = uploadTask.snapshot.downloadURL;
					refSolicitudes.push({
						cartaPrincipal: valorCartaPrincipal,
						coste: valorCoste,
						arenaMaxima: valorArenaMaxima,
						formato: valorFormato,
						contacto: valorContacto,
						nombreImagenMazo: imagenASubir.name,
						urlImagenMazo: downloadURL
					});
				});
				break;
			case UPDATE:
				if(imagenASubir != null){
					imagenAEditar.delete();
					var uploadTask = storageRef.child('imagenes/' + imagenASubir.name).put(imagenASubir);
					uploadTask.on('state_changed', function(snapshot){
						// Observe state change events such as progress, pause, and resume
					}, function(error) {
					 	// Handle unsuccessful uploads
					}, function() {
						// Handle successful uploads on complete
						var downloadURL = uploadTask.snapshot.downloadURL;
						refSolicitudAEditar.update({
							cartaPrincipal: valorCartaPrincipal,
							coste: valorCoste,
							arenaMaxima: valorArenaMaxima,
							formato: valorFormato,
							contacto: valorContacto,
							nombreImagenMazo: imagenASubir.name,
							urlImagenMazo: downloadURL
						});
					});
					document.getElementById("boton-solicitud").value = CREATE;
					modo = CREATE;
					break;
				}else{
					refSolicitudAEditar.update({
						cartaPrincipal: valorCartaPrincipal,
						coste: valorCoste,
						arenaMaxima: valorArenaMaxima,
						formato: valorFormato,
						contacto: valorContacto
					});
					document.getElementById("boton-solicitud").value = CREATE;
					modo = CREATE;
				}
				leerDatos2();
		}
		formSolicitudes.reset();
	}
}

function validarSolicitud2(){
	var pasaValidacion = true;
	if(event.target.solicitudAResponder.value == "Elige la solicitud que quieras responder"){
		document.getElementById("error-solicitudAResponder").style.visibility = "visible";
		pasaValidacion = false;
	}else{
		document.getElementById("error-solicitudAResponder").style.visibility = "hidden";
	}
	if(event.target.mazoAResponder.value == ""){
		document.getElementById("error-mazoAResponder").style.visibility = "visible";
		pasaValidacion = false;
	}else{
		document.getElementById("error-mazoAResponder").style.visibility = "hidden";
	}
	return pasaValidacion;
}

function enviarDatos2(event){
	event.preventDefault();

	var valorNumeroSolicitud = event.target.solicitudAResponder.value;
	var mazoAProponer = event.target.mazoAResponder.value;
	if(validarSolicitud2()){
		switch(modo2){
			case CREATE2:
					refRespuestas.push({
						numeroSolicitud: valorNumeroSolicitud,
						mazoPropuesto: mazoAProponer
					});
				break;
			case UPDATE2:
					refRespuestaAEditar.update({
						mazoPropuesto: mazoAProponer
					});
					document.getElementById("botonRespuesta").value = CREATE2;
					modo = CREATE2;
					break;
		}
		formRespuestas.reset();
	}
}

function leerDatos(){
	refSolicitudes.on("value", function(snap){
		var datos = snap.val();
		var filasAMostrar = "";
		for(var key in datos){
			filasAMostrar += "<tr>" +
								'<td  class="colorBlanco">' + datos[key].cartaPrincipal + "</td>" +
								'<td  class="colorBlanco">' + datos[key].coste + "</td>" +
								'<td  class="colorBlanco">' + datos[key].arenaMaxima + "</td>" +
								'<td  class="colorBlanco">' + datos[key].formato + "</td>" +
								'<td  class="colorBlanco">' + datos[key].contacto + "</td>" +
								'<td><img width="200" height="150" class="img-thumbnail" src="' + datos[key].urlImagenMazo + '"/></td>';
								if (admin) {
									filasAMostrar += '<td><button class="btn btn-default editar" data-solicitud="' + key + '"><span class="glyphicon glyphicon-pencil"></span></button></td>' +
									'<td><button class="btn btn-danger borrar" data-solicitud="' + key + '"><span class="glyphicon glyphicon-trash"></span></button></td>';
								}
								filasAMostrar += "</tr>";
		}
		tbodyTablaSolicitud.innerHTML = filasAMostrar;
		if(filasAMostrar != ""){
			var elementosEditables = document.getElementsByClassName("editar");
			for (var i = 0; i < elementosEditables.length; i++){
				elementosEditables[i].addEventListener("click", editarDatos, false);
			}

			var elementosBorrables = document.getElementsByClassName("borrar");
			for (var i = 0; i < elementosBorrables.length; i++){
				elementosBorrables[i].addEventListener("click", borrarDatos, false);
			}
		}
	});
}

function leerDatos2(){
	refSolicitudes.on("value", function(snap){
		var filasAMostrar = "";
		var selectAMostrar = "<option>Elige la solicitud que quieras responder</option>";
		contador = 0;
		var datos = snap.val();	
		for(var key in datos){
			contador++;	
			filasAMostrar += "<tr>" +
								'<td  class="colorBlanco">' + contador + "</td>" +
								'<td  class="colorBlanco">' + datos[key].cartaPrincipal + "</td>" +
								'<td  class="colorBlanco">' + datos[key].coste + "</td>" +
								'<td  class="colorBlanco">' + datos[key].arenaMaxima + "</td>" +
								'<td  class="colorBlanco">' + datos[key].formato + "</td>" +
								'<td  class="colorBlanco">' + datos[key].contacto + "</td>" +
								'<td  class="colorBlanco" id="mazoPropuesto' + contador + '"></td>';
			if (admin) {
				filasAMostrar += '<td id="botonEditarRespuesta' + contador + '"><button class="btn btn-default editar2" data-respuesta=""><span class="glyphicon glyphicon-pencil"></span></button></td>' +
				'<td id="botonBorrarRespuesta' + contador + '"><button class="btn btn-danger borrar2" data-respuesta=""><span class="glyphicon glyphicon-trash"></span></button></td>';
			}
			filasAMostrar += "</tr>";
								
			selectAMostrar += '<option>' + contador + '</option>';		
		}
		tbodyTablaRespuesta.innerHTML = filasAMostrar;
		selectSolicitud.innerHTML = selectAMostrar;
	});

	refRespuestas.on("value", function(snap){
		var datos = snap.val();
		for(var key in datos){
			for(var i = 1; i <= contador; i++){
				if(datos[key].numeroSolicitud == i){
					document.getElementById("mazoPropuesto"+i).innerHTML = datos[key].mazoPropuesto;
					if(admin){
						var elementosEditables = document.getElementsByClassName("editar2");
						elementosEditables[i-1].addEventListener("click", editarDatos2, false);
						elementosEditables[i-1].setAttribute("data-respuesta", key);
						
						var elementosBorrables = document.getElementsByClassName("borrar2");
						elementosBorrables[i-1].addEventListener("click", borrarDatos2, false);
						elementosBorrables[i-1].setAttribute("data-respuesta", key);
					}
				}
			}
		}
	});	
}

function borrarDatos(){
	var keySolicitudABorrar = this.getAttribute("data-solicitud");
	var refSolicitudABorrar = refSolicitudes.child(keySolicitudABorrar);
	refSolicitudABorrar.on("value", function(snap){
		var datos = snap.val();
		var desertRef = storageRef.child('imagenes/'+datos.nombreImagenMazo);
		desertRef.delete();
	});
	refSolicitudABorrar.remove();
}

function borrarDatos2(){
	var keyRespuestaABorrar = this.getAttribute("data-respuesta");
	var refRespuestaABorrar = refRespuestas.child(keyRespuestaABorrar);
	refRespuestaABorrar.remove();
	leerDatos2();
}

function editarDatos(){
	document.getElementById("error-cartaPrincipal").style.visibility = "hidden";
	document.getElementById("error-coste2").style.visibility = "hidden";
	document.getElementById("error-coste1").style.visibility = "hidden";
	document.getElementById("error-arenaMaxima").style.visibility = "hidden";
	document.getElementById("error-formato").style.visibility = "hidden";
	document.getElementById("error-contacto").style.visibility = "hidden";
	document.getElementById("error-imagenMazo").style.visibility = "hidden";

	var keySolicitudAEditar = this.getAttribute("data-solicitud");
	refSolicitudAEditar = refSolicitudes.child(keySolicitudAEditar);
	refSolicitudAEditar.once("value", function(snap){
		var datos = snap.val();
		document.getElementById("cartaPrincipal").value = datos.cartaPrincipal;
		document.getElementById("coste").value = datos.coste;
		document.getElementById("arenaMaxima").value = datos.arenaMaxima;
		if(datos.formato == document.getElementById("formatoE").value){
			document.getElementById("formatoE").checked = true;
		}else{
			document.getElementById("formatoD").checked = true;
		}
		document.getElementById("contacto").value = datos.contacto;
		imagenAEditar = storageRef.child('imagenes/'+datos.nombreImagenMazo);
	});
	document.getElementById("boton-solicitud").value = UPDATE;
	modo = UPDATE;
}

function editarDatos2(){
	document.getElementById("error-solicitudAResponder").style.visibility = "hidden";
	document.getElementById("error-mazoAResponder").style.visibility = "hidden";

	var keyRespuestaAEditar = this.getAttribute("data-respuesta");
	refRespuestaAEditar = refRespuestas.child(keyRespuestaAEditar);
	refRespuestaAEditar.once("value", function(snap){
		var datos = snap.val();
		document.getElementById("solicitudAResponder").value = datos.numeroSolicitud;
		document.getElementById("mazoAResponder").value = datos.mazoPropuesto;
	});
	document.getElementById("botonRespuesta").value = UPDATE2;
	modo2 = UPDATE2;
}

function esconder(){
	espacioFormSolicitudMazos.innerHTML ="";
	espacioRespuestaSolicitud1.innerHTML = "";
	espacioRespuestaSolicitud2.innerHTML = "";
}

function logOut() {
	firebase.auth().signOut().then(function() {
	}, function(error) {
		alert("Error");
	});
}