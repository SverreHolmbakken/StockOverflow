export default {
	title: 'Settings',
	name: 'settings',
	type: 'document',
	fields: [
		{
			title: 'Frontpage',
			name: 'frontpage',
			type: 'object',
			fields: [
				{
					title: 'Site Title',
					name: 'siteTitle',
					type: 'string',
				},
				{
					title: 'Site Favicon',
					name: 'siteFavicon',
					type: 'image',
				},
				{
					title: 'Site Banner Text',
					name: 'siteBannerText',
					type: 'string',
				},
				{
					title: 'Site Banner Visible',
					name: 'siteBannerVisible',
					type: 'boolean',
				},
				{
					title: 'Site Banner Closeable',
					name: 'siteBannerCloseable',
					type: 'boolean',
				},
			]
		}
		// {
		// 	title: 'Site Title',
		// 	name: 'siteTitle',
		// 	type: 'string',
		// },
		// {
		// 	title: 'Site Description',
		// 	name: 'siteDescription',
		// 	type: 'string',
		// },
		// {
		// 	title: 'Site Keywords',
		// 	name: 'siteKeywords',
		// 	type: 'string',
		// },
		// {
		// 	title: 'Site URL',
		// 	name: 'siteUrl',
		// 	type: 'string',
		// },
		// {
		// 	title: 'Site Logo',
		// 	name: 'siteLogo',
		// 	type: 'image',
		// },
		// {
		// 	title: 'Site Favicon',
		// 	name: 'siteFavicon',
		// 	type: 'image',
		// },
		// {
		// 	title: 'Site Banner',
		// 	name: 'siteBanner',
		// 	type: 'image',
		// },
		// {
		// 	title: 'Site Banner Text',
		// 	name: 'siteBannerText',
		// 	type: 'string',
		// },
		// {
		// 	title: 'Site Banner Link',
		// 	name: 'siteBannerLink',
		// 	type: 'string',
		// },
		// {
		// 	title: 'Site Banner Link Text',
		// 	name: 'siteBannerLinkText',
		// 	type: 'string',
		// },
		// {
		// 	title: 'Site Banner Active',
		// 	name: 'siteBannerActive',
		// 	type: 'boolean',
		// },
		// {
		// 	title: 'Site Banner Closeable',
		// 	name: 'siteBannerCloseable',
		// 	type: 'boolean',
		// }
	]
}