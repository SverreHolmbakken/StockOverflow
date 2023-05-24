import { sanity } from '../sanity.js';

export default async function getArticleList() {
	const articlesContainer = document.querySelector('.article__list');
	let articleList = null;

	async function fetchArticles() {
		const query = `*[_type == 'article'] {
			title,
			'image': image.asset->url,
			'slug': slug.current,
		 }`;
	
		return await sanity.fetch(query);
	}

	async function setCurrentArticlesList() {
		articleList = await fetchArticles();
	}

	async function initialize() {
		await setCurrentArticlesList();
		renderArticleList();
	}

	function renderArticleList() {
		articleList.forEach(article => {			
			const articleItem = document.createElement('a');
			const articleImage = document.createElement('img');
			const articleTitle = document.createElement('h1');

			articleItem.className = 'article__item';
			articleImage.className = 'article__item-image';
			articleTitle.className = 'article__item-title h1';

			articleImage.src = article.image;
			articleTitle.innerText = article.title;
			articleItem.href = `/blog/article/?${article.slug}`
		
			articleItem.append(
				articleImage,
				articleTitle
			);

			articlesContainer.append(articleItem);
		});
	};

	initialize();
}