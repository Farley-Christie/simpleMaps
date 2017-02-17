(function() {
	//i dont work in crome
	var map = new google.maps.Map(document.querySelector('.mapWraper')), marker;

	function initMap(position){
		map.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
			map.setZoom(14);
			
			marker = new google.maps.Marker({
				position : { lat: position.coords.latitude, lng: position.coords.longitude },
				map : map,
				title : "hello world"
		});
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
})();