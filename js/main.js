(function() {
	//i dont work in crome
	var map = new google.maps.Map(document.querySelector('.map-wrapper')),
	preloader = document.querySelector('.preload-wrapper'),

	// import geocode api
	geocoder = new google.maps.Geocoder(),
	geocodeButton = document.querySelector('.geocode'),

	//directions
	directionsServices = new google.maps.DirectionsService(),
	directionsDisplay,
	locations = [],

	marker;

	function initMap(position){

		//save our location
		locations[0] = { lat: position.coords.latitude, lng: position.coords.longitude };

		directionsDisplay = new google.maps.DirectionsRenderer();
		directionsDisplay.setMap(map);

		map.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
			map.setZoom(14);
			
			marker = new google.maps.Marker({
				position : { lat: position.coords.latitude, lng: position.coords.longitude },
				map : map,
				title : "hello world"
		});
		preloader.classList.add('hide-preloader');
		//add custom animation for the marker 
	}
	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(initMap, handleError);
	}else{
		console.log("nope");
	}

	function handleError(){
		console.log('somthing went wrong');
	}
//add turn by turn directions
	function codeAddress(){
		var address = document.querySelector('.address').value;
		geocoder.geocode({'address': address}, function(results, status){
			if(status == google.maps.GeocoderStatus.OK){
				// push location into array
				locations[1] = { lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() }
				map.setCenter(results[0].geometry.location);
				if(marker){
					marker.setMap(null);
					marker = new google.maps.Marker({
						map : map,
						position : results[0].geometry.location
					});

				calcRoute(results[0].geometry.location);

				} else {
					console,log(status);
				}
			}
		});
	}

	function calcRoute(codedLoc){
		var request = {
			origin: locations[0],
			destination: locations[1],
			travelMode: "DRIVING"
		};

		directionsServices.route(request, function(responce, status){
			if (status == "OK"){
				directionsDisplay.setDirections(responce);
			}
		});
	}
	geocodeButton.addEventListener('click',codeAddress,false);
})();