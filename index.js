'use strict';
require('es6-promise').polyfill();
require('whatwg-fetch');

const url = require('url'),
      querystring = require('querystring').parse;

const registry = 'http://npm-registry.herokuapp.com';


const query = querystring(window.location.search.slice(1)).q;

if (query) {
  window.fetch(url.resolve(registry, query))
    .then((response) => response.json())
    .then((info) => {
      const repo = info.repository.url;
      document.write(`Redirecting to ${repo}...`);
      window.location = repo;
    });
}
else {
  document.write('<form method="get"><input type="text" name="q"><input type="submit" value="Go"></form>');
}
