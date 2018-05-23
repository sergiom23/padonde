function initMap() {
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'
    };
                    
    // Display a map on the web page
    map = new google.maps.Map(document.getElementById("mapCanvassan"), mapOptions);
    map.setTilt(50);
        
    // Multiple markers location, latitude, and longitude
    var markers = [
        ['Restaurante Santafereño, Bogotá', 4.6439891,-74.0928933],
        ['Restaurante Puerta Santafereña, Bogotá', 4.6090104,-74.0727627],
        ['Mama Lupe, Bogotá', 4.6142175,-74.07783]
    ];
                        
    // Info window content
    var infoWindowContent = [
        ['<div class="info_content">' +
        '<h3>Restaurante Santafereño</h3>' +
        '<p>Cra. 69 #25-27, Bogotá.</p>' + '</div>'],
        ['<div class="info_content">' +
        '<h3>Restaurante Puerta Santafereña</h3>' +
        '<p>Cra. 8 #18-98, Bogotá.</p>' +
        '</div>'],
        ['<div class="info_content">' +
        '<h3>Mama Lupe</h3>' +
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