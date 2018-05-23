function initMap() {
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'
    };
                    
    // Display a map on the web page
    map = new google.maps.Map(document.getElementById("mapCanvaspaisa"), mapOptions);
    map.setTilt(50);
        
    // Multiple markers location, latitude, and longitude
    var markers = [
        ['Restaurante típico Comedorcito Paisa, Bogotá', 4.6104947,-74.0964033],
        ['El Consulado Paisa, Bogotá', 4.656033,-74.061684],
        ['Restaurante El Pueblito Paisa, Bogotá', 4.6043599,-74.0986046]
    ];
                        
    // Info window content
    var infoWindowContent = [
        ['<div class="info_content">' +
        '<h3>Restaurante típico Comedorcito Paisa</h3>' +
        '<p>Cra. 13 #40C-34, Bogotá.</p>' + '</div>'],
        ['<div class="info_content">' +
        '<h3>El Consulado Paisa</h3>' +
        '<p>Carrera 11 # 70A - 44, Bogotá.</p>' +
        '</div>'],
        ['<div class="info_content">' +
        '<h3>Restaurante El Pueblito Paisa</h3>' +
        '<p>Cra. 18a #39-11, Bogotá.</p>' +
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