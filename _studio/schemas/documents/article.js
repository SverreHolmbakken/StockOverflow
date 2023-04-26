export default {
	title: 'Article',
	name: 'article',
	type: 'document',
	fields: [
		{
			title: 'Title',
			name: 'title',
			type: 'string',
		},
		{
			title: 'Slug',
			name: 'slug',
			type: 'slug',
			options: {
				source: 'title'
			}
		},
		{
			title: 'Author',
			name: 'author',
			type: 'reference',
			to: { type: 'author' }
		},
		{
			title: 'Image',
			name: 'image',
			type: 'image',
		},
		{
			title: 'Content',
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }]
		},
		{
			title: 'Tags',
			name: 'tags',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [
						{ type: 'tags'}
					]
				}
			]
		}
	]
}