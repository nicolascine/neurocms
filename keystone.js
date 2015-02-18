// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Require keystone
var keystone = require('keystone'),
	handlebars = require('express-handlebars'),
	keystoneRest = require('keystone-rest');


// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	'env':	process.env.NODE_ENV || "development",
	'name': 'NeuroCms',
	'brand': 'neurobits',
	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'hbs',
	'custom engine': handlebars.create({
		layoutsDir: 'templates/views/layouts',
		partialsDir: 'templates/views/partials',
		defaultLayout: 'default',
		helpers: new require('./templates/views/helpers')(),
		extname: '.hbs'
	}).engine,
	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
	
	//config vars
	'mongo': process.env.MONGO_URI || 'mongodb://localhost/neurocms',
	'mandrill api key': process.env.MANDRILL_KEY,
	'cloudinary config': process.env.CLOUDINARY_URL,
	'cloudinary prefix': 'neurobits',
	'cloudinary folders': true,
	'cookie secret': process.env.COOKIE_SECRET || 'AxR|"V$P+GpgkR2;EfDG{.IBa{i*wA,#7V;m9>PTkR=!rV}ikTUB`"h<H/N1kq|A',

	//for REST API
	'cors allow origin'  : 'http://nicolascine.github.com',
	'cors allow methods' : 'GET',
	'cors allow headers' : 'Content-Type, Authorization'

});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

// Load your project's Routes

keystone.set('routes', require('./routes'));

// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.


// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
	'posts': ['posts', 'post-categories'],
	'galleries': 'galleries',
	'enquiries': 'enquiries',
	'users': 'users'
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();

// inicializa rutas REST - previene error
keystoneRest.registerRoutes(keystone.app);




