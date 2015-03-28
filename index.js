'use strict';
require('es6-promise').polyfill();
require('whatwg-fetch');

const url = require('url'),
      querystring = require('querystring').parse,
      githubUrl = require('github-url-from-git');

const registry = 'http://npm-registry.herokuapp.com';


const query = querystring(window.location.search.slice(1)).q;

if (query) {
  window.fetch(url.resolve(registry, query))
    .then((response) => {
      if (response.status >= 400) {
        document.write(response.status < 500 ? 'Package does not exist' : 'Internal server error');
      }
      else {
        return response.json();
      }
    })
    .then((info) => {
      if (!info.repository) {
        return document.write('Package does not have a repository');
      }
      const repo = githubUrl(info.repository.url);
      document.write(`Redirecting to ${repo}...`);
      window.location.replace(repo);
    });
}
else {
  document.write('<form method="get"><input type="text" name="q"><input type="submit" value="Go"></form>');
}
