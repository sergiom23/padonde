function initMap() {
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'
    };
                    
    // Display a map on the web page
    map = new google.maps.Map(document.getElementById("mapCanvasllanera"), mapOptions);
    map.setTilt(50);
        
    // Multiple markers location, latitude, and longitude
    var markers = [
        ['Restaurante Llanero Bogotá Portal del Llano Autentica Mamona, Bogotá', 4.60436,-74.0920116],
        ['Asadero La Gran Llanera Internacional, Bogotá', 4.6439882,-74.119265],
        ['El fogón llanero, Bogotá', 4.6439882,-74.1192653]
    ];
                        
    // Info window content
    var infoWindowContent = [
        ['<div class="info_content">' +
        '<h3>Restaurante Llanero Bogotá Portal del Llano Autentica Mamona</h3>' +
        '<p>Cra. 21 #853, Bogotá.</p>' + '</div>'],
        ['<div class="info_content">' +
        '<h3>Asadero La Gran Llanera Internacional</h3>' +
        '<p>Av La Esperanza #122 95, Bogotá</p>' +
        '</div>'],
        ['<div class="info_content">' +
        '<h3>El fogón llanero</h3>' +
        '<p>De Los Comuneros #26-99, Bogotá.</p>' +
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