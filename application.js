  L.mapbox.accessToken = 'pk.eyJ1IjoibGlxdWlkMTk4MiIsImEiOiJCdmxWQkZNIn0.itcodaqRcLopL_0WP5Rjww';
  var map = L.mapbox.map('my-map', 'examples.map-i86nkdio');

  map.setView([41, 9], 7);

  // var marker = L.marker([41, 9]);
  // marker.addTo(map);
  // marker.bindPopup("<strong>Ciao!</strong>");
  // $.getJSON("data.json", function(data){
  //   console.log('server served me this', data)
  // });

  var callback = function(data){
    console.log('server served me this', data["markers"]);
    var markers = data["markers"];
  console.log(typeof markers);
  $(markers).each(function(index, marker){
  console.log("Markers", marker);
  var m = L.marker(marker['coords']);
  m.addTo(map);
  m.bindPopup('<b>'+ marker['title'] +'</b>');

  });
  }
  $.getJSON('data.json', callback);
