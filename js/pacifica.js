function initMap() {
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'
    };
                    
    // Display a map on the web page
    map = new google.maps.Map(document.getElementById("mapCanvaspacifica"), mapOptions);
    map.setTilt(50);
        
    // Multiple markers location, latitude, and longitude
    var markers = [
        ['PESCADOS Y PARRILLA LA CAZUELA DEL PACIFICO, Bogotá', 4.6666466,-74.1891145],
        ['Sabores del Pacifico, Bogotá', 4.6071583,-74.071804],
        ['Restaurante El Rincón del Pacifico, Bogotá', 4.6041238,-74.070841]
    ];
                        
    // Info window content
    var infoWindowContent = [
        ['<div class="info_content">' +
        '<h3>PESCADOS Y PARRILLA LA CAZUELA DEL PACIFICO</h3>' +
        '<p>Cra. 75 #24 A-30, Bogotá.</p>' + '</div>'],
        ['<div class="info_content">' +
        '<h3>Sabores del Pacifico</h3>' +
        '<p> Cra. 7 #21-14, Bogotá.</p>' +
        '</div>'],
        ['<div class="info_content">' +
        '<h3>Restaurante El Rincón del Pacifico</h3>' +
        '<p>Cra. 4 #19 - 82, Bogotá.</p>' +
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