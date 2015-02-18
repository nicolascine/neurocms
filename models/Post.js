var keystone = require('keystone'),
	Types = keystone.Field.Types,
	keystoneRest = require('keystone-rest');


/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Post.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true, restSelected: false },
	author: { type: Types.Relationship, ref: 'User', index: true, restSelected: false},
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.CloudinaryImage, restSelected: false },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400, restSelected: false},
	},
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true, restSelected: false }
});

Post.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';


Post.register();

// Expose User model via REST api
keystoneRest.addRoutes(Post, 'get');






