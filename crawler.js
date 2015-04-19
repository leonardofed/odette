var request = require('request'); //node carica una libreria esterna
var cheerio = require('cheerio');

var dataUrl = "http://www.milanodabere.it/milano/teatri"; //salvo all'interno della variabile una stringa che ha l'indrizzo in questione

request(dataUrl, function(error, response, body) { //#1dataUrl del sito, #2 è una funzione di callback
  var $ = cheerio.load(body);

  var elements = $('#mdb_lista > article');
  var list = [];

  elements.each(function(index, element) {
    var obj = {};
    var addressLink = $('header > div.media-body > aside > div > a:nth-child(2)', element).attr('href');

    obj.title = $('header h1 > a', element).text();
    obj.coords = [];

    list.push(obj);
  });

  console.log(list);
});
