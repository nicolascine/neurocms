var keystone	= require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	// Init locals
	locals.section = 'buscar';
	locals.data = {
		resultados	: [],
		busqueda	: req.query.b
	};
	// Load all categories
	view.on('init', function(next) {

	var x = keystone.list('Post').model.find()
			.where('state', 'published')
			.sort('-publishedDate').
			populate('author categories');

		if (locals.data.busqueda) {
			var regex = new RegExp(locals.data.busqueda, 'i');
			x.where( 'title', regex );
		}

		x.exec(function(err, results) {
			locals.data.resultados = results;
			next(err);
		});

	});

	// Render the view
	view.render('buscar', {layout: 'blog'});
	
};