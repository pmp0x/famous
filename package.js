var path = Npm.require('path');
var fs = Npm.require('fs');

Package.describe({
	summary: 'Famo.us integration in meteor',
	name: 'mjn:famous',
	version: '0.3.4',
	git: 'https://github.com/mj-networks/famous.git'
});

Package.onUse(function (api) {
  api.add_files('src/functionPrototypeBind.js', 'client');
  api.add_files('src/classList.js', 'client');
  api.add_files('src/requestAnimationFrame.js', 'client');

  api.add_files('src/famous.css', 'client');
	api.add_files('src/famous-global.js', 'client');
	api.add_files('src/export.js', 'client');

	api.export('famous');
});

Package.onTest(function (api) {
	api.use('mjn:famous');
	api.use('tinytest');

	api.add_files('test/famous-tests.js', 'client');
});
