  L.mapbox.accessToken = 'pk.eyJ1IjoibGlxdWlkMTk4MiIsImEiOiJCdmxWQkZNIn0.itcodaqRcLopL_0WP5Rjww';
  var map = L.mapbox.map('my-map', 'examples.map-i86nkdio');

  map.setView([41, 9], 6);

  var marker = L.marker([41, 9]);

  setTimeout(function() {
    marker.addTo(map);
  }, 2000);

  setTimeout(function() {
    marker.setLatLng([42, 9]);
    marker.openPopup();
    marker.dragging.enable();
  }, 3000);

  setTimeout(function() {
    marker.setLatLng([93, 1]);
    marker.openPopup();
    marker.dragging.enable();
  }, 7000);

  marker.bindPopup("<strong>Ciao!</strong>");
