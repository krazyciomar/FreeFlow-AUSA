  var map;
  var marker;
  var newLatlng;
  var i = 0;

  //here i create a map centered on 0,0
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
	
google.maps.event.addDomListener(window, 'load', initialize);
