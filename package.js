var path = Npm.require('path');
var fs = Npm.require('fs');

Package.describe({
  "summary": "Famo.us",
	name : 'mjnetworks:famous',
	version : '0.2.2'
});

Package.onUse(function (api) {
  api.add_files('famous.js', 'client');
  api.export('famous');
});

Package.onTest(function (api) {
	api.use('mjnetworks:famous');
	api.use('tinytest');

	api.add_files('test/famous-tests.js', 'client');
});
