'use strict';
require('whatwg-fetch');

var path = require('path'),
    querystring = require('querystring').parse;

var registry = 'http://npm-registry-cors-proxy.herokuapp.com/';


var name = querystring(window.location.search.slice(1)).q;

window.fetch(path.join(registry, name))
  .then((response) => response.json())
  .then((info) => window.location = info.homepage);
