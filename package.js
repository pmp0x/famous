var path = Npm.require('path');
var fs = Npm.require('fs');

Package.describe({
	summary: 'Famo.us integration in meteor',
	name: 'mjn:famous',
	version: '0.3.0-1',
	git: 'https://github.com/mj-networks/famous'
});

Package.onUse(function (api) {
	api.add_files('famous.js', 'client');
	api.export('famous');
});

Package.onTest(function (api) {
	api.use('mjn:famous');
	api.use('tinytest');

	api.add_files('test/famous-tests.js', 'client');
});
