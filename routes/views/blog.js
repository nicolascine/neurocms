var keystone = require('keystone'),
	async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// Init locals
	locals.section = 'blog';
	locals.filters = {
		category: req.params.category
	};
	locals.data = {
		primerPost: [],
		dostresPost: [],
		posts: [],
		categories: []
	};
	// Load all categories
	view.on('init', function(next) {
		
		keystone.list('PostCategory').model.find().sort('name').exec(function(err, results) {
			
			if (err || !results.length) {
				return next(err);
			}
			
			locals.data.categories = results;
			
			// Load the counts for each category
			async.each(locals.data.categories, function(category, next) {
				
				keystone.list('Post').model.count().where('category').in([category.id]).exec(function(err, count) {
					category.postCount = count;
					next(err);
				});
				
			}, function(err) {
				next(err);
			});
			
		});
		
	});
	
	// Load the current category filter
	view.on('init', function(next) {
		
		if (req.params.category) {
			keystone.list('PostCategory').model.findOne({ key: locals.filters.category }).exec(function(err, result) {
				locals.data.category = result;
				next(err);
			});
		} else {
			next();
		}
		
	});
	
	// Load the posts
	view.on('init', function(next) {

		Post = keystone.list('Post');
		var k = Post.model.find()
				.where('state', 'published')
				.sort('-publishedDate')
				.populate('author categories')
				.limit(1);

		var z =	keystone.list('Post')
					.model
					.find({}, {}, 
						{ 
							skip:1,
							limit: 2,
							where:{'state' : 'published'},
							sort:'-publishedDate',
							populate:'author categories'
						});	
/*
		var q = keystone.list('Post').paginate({
				page: req.query.page || 1,
				perPage: 10,
				maxPages: 10
			})
			.where('state', 'published')
			.sort('-publishedDate')
			.populate('author categories');
*/


		var q =	keystone.list('Post')
					.model
					.find({}, {}, 
						{ 
							skip:3,
							where:{'state' : 'published'},
							sort:'-publishedDate',
							populate:'author categories'
						});	
			
		if (locals.data.category) {
			k.where('categories').in([locals.data.category]);
			z.where('categories').in([locals.data.category]);
			q.where('categories').in([locals.data.category]);
		}

		//first posts
		k.exec(function(err, results) {
			locals.data.primerPost = results;
		});
		
		// two min posts
		z.exec(function(err, results) {
			locals.data.dostresPost = results;

		});	

		//all posts
		q.exec(function(err, results) {
			locals.data.posts = results;
			next(err);
		});


	});
	
	// Render the view
	view.render('blog', {layout: 'blog'});
	
};
