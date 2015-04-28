var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var fs = require('fs');
var urlLib = require('url');
var urls = [
  'http://www.milanodabere.it/milano/teatri',
  'http://www.milanodabere.it/milano/teatri/2',
  'http://www.milanodabere.it/milano/teatri/3',
  'http://www.milanodabere.it/milano/teatri/4',
  'http://www.milanodabere.it/milano/teatri/5'
];

async.map(urls, fetchVenues, saveVenues);

function fetchVenues(url, callback) {
  var venues = [];
  request(url, function(error, response, body) {
    if (error) {
      callback(error, venues);
      return;
    }

    var elements = cheerio('#mdb_lista > article', body);
    elements.each(function(index, element) {
      var venue = {};
      var addressLink;

      var tokens;
      var latitude, longitude;

      var eventsLink;

      venue.name = cheerio('header h1 > a', element).text();

      addressLink = cheerio('header .media-body aside a[data-target="#mdb_modal_mappa"]', element);
      addressLink = addressLink.attr('href');

      tokens = addressLink.split('?');

      tokens = tokens[1].split('&');
      latitude = tokens[0].split('=');
      latitude = latitude[1];
      longitude = tokens[1].split('=')[1];
      var parsedURL = urlLib.parse(url + addressLink, true);
      venue.coords = [
        parseFloat(latitude),
        parseFloat(longitude)
      ];
      venues.push(venue);
    });
    callback(null, venues);
  });
}

function saveVenues(error, result) {
  if (error) {
    console.log("Error fetching pages.", error);
    return;
  }

  var venues = result.reduce(function(accumulator, currentElement) {
    return accumulator.concat(currentElement);
  });

  var JSONString = JSON.stringify({ venues: venues }, null, 2);

  fs.writeFile('venues.json', JSONString, function(error) {
    if (error) {
      console.log("Error writing venues.json", error);
      return;
    }
    console.log(venues.length + ' venues were saved to venues.json!');
  });
}
