function initMap() {
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'
    };
                    
    // Display a map on the web page
    map = new google.maps.Map(document.getElementById("mapCanvascund"), mapOptions);
    map.setTilt(50);
        
    // Multiple markers location, latitude, and longitude
    var markers = [
        ['Restaurante Cundiboyacense, Bogotá', 4.7090099,-74.1160406],
        ['Asadero Boyacense, Bogotá', 4.691943,-74.102873],
        ['Mi Gran Parrilla Boyacense, Bogotá', 4.6667693,-74.0799843]
    ];
                        
    // Info window content
    var infoWindowContent = [
        ['<div class="info_content">' +
        '<h3>Restaurante Cundiboyacense</h3>' +
        '<p>Cra. 100b #77-24, Bogotá.</p>' + '</div>'],
        ['<div class="info_content">' +
        '<h3>Asadero Boyacense</h3>' +
        '<p>Ac 72 #78-2, Bogotá.</p>' +
        '</div>'],
        ['<div class="info_content">' +
        '<h3>Mi Gran Parrilla Boyacense</h3>' +
        '<p>Calle 71 #30-52 T, Bogotá.</p>' +
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