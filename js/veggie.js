function initMap() {
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'
    };
                    
    // Display a map on the web page
    map = new google.maps.Map(document.getElementById("mapCanvasveggie"), mapOptions);
    map.setTilt(50);
        
    // Multiple markers location, latitude, and longitude
    var markers = [
        ['Restaurante Loto Azul Vegetariano, Bogotá', 4.600115,-74.074616],
        ['Zukini, Bogotá', 4.6088208,-74.1105954],
        ['Bulevar Sésamo, Bogotá', 4.6088208,-74.1105954]
    ];
                        
    // Info window content
    var infoWindowContent = [
        ['<div class="info_content">' +
        '<h3>Restaurante Loto Azul Vegetariano</h3>' +
        '<p>Carrera 5 BIS # 12C-02, Bogotá.</p>' + '</div>'],
        ['<div class="info_content">' +
        '<h3>Zukini</h3>' +
        '<p>12, Cl. 24 #7, Bogotá.</p>' +
        '</div>'],
        ['<div class="info_content">' +
        '<h3>Bulevar Sésamo</h3>' +
        '<p>Av. Jimenez De Quesada #464, Bogotá.</p>' +
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