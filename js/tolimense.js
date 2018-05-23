function initMap() {
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'
    };
                    
    // Display a map on the web page
    map = new google.maps.Map(document.getElementById("mapCanvastol"), mapOptions);
    map.setTilt(50);
        
    // Multiple markers location, latitude, and longitude
    var markers = [
        ['El Viejo Rancho Tolimense, Bogotá', 4.6104947,-74.0964033],
        ['Restaurante Tolimense, Bogotá', 4.5762056,-74.104891],
        ['estaurante Toli Tamal, Bogotá', 4.586129,-74.118929]
    ];
                        
    // Info window content
    var infoWindowContent = [
        ['<div class="info_content">' +
        '<h3>El Viejo Rancho Tolimense</h3>' +
        '<p>Calle 11 No 28-96, Bogotá.</p>' + '</div>'],
        ['<div class="info_content">' +
        '<h3>Restaurante Tolimense</h3>' +
        '<p>59 Sur, Cra. 13 #26A, Bogotá.</p>' +
        '</div>'],
        ['<div class="info_content">' +
        '<h3>Restaurante Toli Tamal</h3>' +
        '<p>Cl. 32 Sur #27-69, Bogotá.</p>' +
        '</div>']
    ];
        
    // Add multiple markers to map
    var infoWindow = new google.maps.InfoWindow(), marker, i;
    
    // Place each marker on the map  
    for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]
        });
        
        // Add info window to marker    
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));

        // Center the map to fit all markers on the screen
        map.fitBounds(bounds);
    }

    // Set zoom level
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(14);
        google.maps.event.removeListener(boundsListener);
    });
    
}
// Load initialize function
google.maps.event.addDomListener(window, 'load', initMap);