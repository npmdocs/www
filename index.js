'use strict';
require('whatwg-fetch');

const path = require('path'),
      querystring = require('querystring').parse;

const registry = 'http://npm-registry-cors-proxy.herokuapp.com/';


const query = querystring(window.location.search.slice(1)).q;

if (query) {
  window.fetch(path.join(registry, name))
    .then((response) => response.json())
    .then((info) => {
      document.write(`Redirecting to ${info.homepage}...`);
      window.location = info.homepage;
    });
}
else {
  document.write('<form method="get"><input type="text" name="q"><input type="submit" value="Go"></form>');
}
