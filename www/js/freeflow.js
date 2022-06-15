// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true
});
 
  var map;
  var marker;
  var newLatlng;
  var i = 0;

myApp.onPageInit('login-screen', function (page) {
  var pageContainer = $$(page.container);
  pageContainer.find('.list-button').on('click', function () {
    var username = pageContainer.find('input[name="username"]').val();
    var password = pageContainer.find('input[name="password"]').val();
	get_login(username,password);
  });
});
  
function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var chicago = new google.maps.LatLng(0,0);
    var mapOptions = {
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: chicago
    }
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    directionsDisplay.setMap(map);

	var trafficLayer = new google.maps.TrafficLayer();
  trafficLayer.setMap(map);
	
    updatePos();

  }


//here I set my marker (if i==0 -> first run)
function updatePos(){

/*
var options = {
    timeout: 500000, enableHighAccuracy: true
};
var myUpdatedPos = navigator.geolocation.watchPosition(onSuccess, onError, options);
*/
navigator.geolocation.getCurrentPosition(onSuccess, onError, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });

function onSuccess(position) {

    if (i==0){
        marker = new google.maps.Marker({
                        position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
						icon: 'pointer.png',
					   map: map,
                        map_icon_label: '<span class="map-icon map-icon-crosshairs"></span>'
                    });
		map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude), 16);

	}
    i++;

    //here I update the position
    newLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    marker.setPosition(newLatlng);
}

// onError Callback receives a PositionError object
//
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
    }

	}





// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    check_login();
});

// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;
	
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
	
})



myApp.onPageInit('VEHICULOS', function (page) {  

$$.get('http://freeflow.it-tel.com.ar/vehiculos.php', {}, function (data) {        
        $$('#COCHES').html(data);          
    });	
});

myApp.onPageInit('PAGOS', function (page) {  
$$.get('http://freeflow.it-tel.com.ar/saldo.php', {}, function (data) {        
		$$('#SALDO').html(data);          
});


$$.get('http://freeflow.it-tel.com.ar/tarjetas.php', {}, function (data) {        
        $$('#TARJETAS').html(data);          
    });     
});

myApp.onPageInit('PERFIL', function (page) {  
var user_id=window.localStorage.getItem("user_id");
$$.get('http://freeflow.it-tel.com.ar/profile.php?id='+user_id, {}, function (data) {        
        $$('#PROFILE').html(data);          
    });     
});

myApp.onPageInit('register', function (page) {  
$$.get('http://freeflow.it-tel.com.ar/register.php', {}, function (data) {        
        $$('#REGISTER').html(data);          
    });     
});

function carga_modelo(marca) {
var f=document.getElementById('patente');

$$.getJSON( "http://freeflow.it-tel.com.ar/agrega.php?modelo="+marca, function( data ) {
	var pickMarca = myApp.picker({
    input: '#loco',
	onClose: function (picker) {
		$$.get('http://freeflow.it-tel.com.ar/vehiculos.php?user_id=123&marca='+marca+'&modelo='+picker.value+'&patente='+f.value, {}, function (data) {        
			$$('#COCHES').html(data);          
		});
	},
	cols: [
        {
            textAlign: 'center',
			values: data
        }
    ]
	});
    pickMarca.open();
});

}

function borra(id) {
if (confirm("¿Está seguro?") == true) {
    $$.get('http://freeflow.it-tel.com.ar/vehiculos.php?id='+id, {}, function (data) {        
			$$('#COCHES').html(data);          
		});
} 
	
}

function borra_tarj(id) {
if (confirm("¿Está seguro?") == true) {
    $$.get('http://freeflow.it-tel.com.ar/tarjetas.php?id='+id, {}, function (data) {        
			$$('#TARJETAS').html(data);          
		});
}
} 

var pickMarca = myApp.picker({
    input: '#loco',
	onClose: function (picker) {
		carga_modelo(picker.value);
	},
    cols: [
        {
            textAlign: 'center',
			values: ['Abarth','Alfa Romeo','Aro','Asia','Asia Motors','Aston Martin','Audi','Austin','Auverland','Bentley','Bertone','Bmw','Cadillac','Chevrolet','Chrysler','Citroen','Corvette','Dacia','Daewoo','Daf','Daihatsu','Daimler','Dodge','Ferrari','Fiat','Ford','Galloper','Gmc','Honda','Hummer','Hyundai','Infiniti','Innocenti','Isuzu','Iveco','Iveco-pegaso','Jaguar','Jeep','Kia','Lada','Lamborghini','Lancia','Land-rover','Ldv','Lexus','Lotus','Mahindra','Maserati','Maybach','Mazda','Mercedes-benz','Mg','Mini','Mitsubishi','Morgan','Nissan','Opel','Peugeot','Pontiac','Porsche','Renault','Rolls-royce','Rover','Saab','Santana','Seat','Skoda','Smart','Ssangyong','Subaru','Suzuki','Talbot','Tata','Toyota','Umm','Vaz','Volkswagen','Volvo','Wartburg']
        }
    ]
});

function agrega_pat() {
	var f=document.getElementById('patente');
		var pat=f.value;

		if (pat.length<6) {
			alert('Debe ingresar una patente');
			picker.close();
			return;
		}
pickMarca.open();
}

function muestra_saldo() {
	var f=document.getElementById('saldo');
		var sat=f.value;
		$$.get('http://freeflow.it-tel.com.ar/saldo.php', {}, function (data) {        
			$$('#SALDO').html(data);          
    });
	
}

function agrega_saldo() {
	var f=document.getElementById('saldo');
		var sat=f.value;

$$.get('http://freeflow.it-tel.com.ar/agrega_saldo.php?saldo='+sat, {}, function (data) {        
        $$('#saldos').html(data);          
    });
		
alert('Saldo sumado con éxito');
}

function guarda_tarj() {
var numero=document.getElementById('tarjeta_num');
var venc=document.getElementById('tarjeta_venc');
var cvc=document.getElementById('tarjeta_cod');

$$.get('http://freeflow.it-tel.com.ar/tarjetas.php?numero='+numero.value+"&venc="+venc.value+"&cvc="+cvc.value, {}, function (data) {        
			$$('#COCHES').html(data);          
		});
$$.get('http://freeflow.it-tel.com.ar/tarjetas.php', {}, function (data) {        
        $$('#TARJETAS').html(data);          
    });
alert('Tarjeta agregada con éxito');
}

function registra() {
var url='';
var password=document.getElementById('password').value;
var password1=document.getElementById('password1').value;
var email=document.getElementById('email').value;
var nombre=document.getElementById('nombre').value;
var apellido=document.getElementById('apellido').value;
var dni=document.getElementById('dni').value;
var celular=document.getElementById('celular').value;

if (!email || !nombre || !apellido || !dni || !celular || !password || !password1) {
	myApp.alert('Faltan ingresar datos');
	return;
}

if (password!=password1){
	myApp.alert('Las password no coinciden');
	return;
}

url='?password='+password;
url+='&email='+email;
url+='&nombre='+nombre;
url+='&apellido='+apellido;
url+='&dni'+dni;
url+='&celular='+celular;

$$.get('http://freeflow.it-tel.com.ar/save_register.php'+url, {}, function (data) {
  
});

myApp.alert('Registro completado con éxito');

mainView.router.loadPage('login.html');

}	

/******* Inicio Login *****************/
function get_login(user,pass) {
	var ret=0;
$$.getJSON('http://freeflow.ittel.com.ar/freeflow/remote_login.php?user='+user+'&pass='+pass, function( data ) {

	if (data["id"]>0) {
		window.localStorage.setItem("user_id",data["id"]);
		window.localStorage.setItem("user_name",data["user"]);
		mainView.router.loadPage('index.html');
	} else {
		myApp.alert('Usuario o clave incorrecta!');
	}
});
}

function salir() {
	window.localStorage.setItem("user_id",0);
	window.localStorage.setItem("user_name",'');
	mainView.router.loadPage('login.html');
}

function check_login() {
var value=window.localStorage.getItem("user_id");

if (value==0) {
	mainView.router.loadPage('login.html');
}
}

$$(document).on('deviceready', function() {
   check_login();
});

/************** Fin Login *******************/

function guarda_perfil() {
var nombre=document.getElementById('nombre').value;
var apellido=document.getElementById('apellido').value;
var user_id=window.localStorage.getItem("user_id");
var imgUri=document.getElementById("pics").src;
var url='';
url="?id_user="+user_id;
url+="&apellido="+apellido;
url+="&nombre="+nombre;

$$.get('http://freeflow.it-tel.com.ar/save_pv.php'+url, {}, function (data) {
  
});
uploadPhoto(imgUri);
myApp.alert('Perfil modificado con éxito');
mainView.router.loadPage('index.html');
}

	
