(function() {
	var map, marker;

	function initMap(){
		map = new google.maps.Map(document.querySelector('.mapWraper'),{
			center : { lat: 42.983233, lng: -81.250688 },
			zoom : 14
		});
		//add custom animation for the marker 
		marker = new google.maps.Marker({
			position : { lat: 42.983233, lng: -81.250688 },
			map : map,
			title : "hello world"
		});
	}
	initMap();
})();