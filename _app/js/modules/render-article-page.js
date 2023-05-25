import { sanity } from "../sanity.js";
import { displayLoading, hideLoading } from "../util/loading-spinner.js";
import { readURL } from "../util/read-url.js";

export default function renderArticlePage() {
	const slug = readURL();

	
	let articles = [];

	async function fetchArticleContent() {
		const query = `*[slug.current == '${slug}'] {
			title,
			'image': image.asset->url,
			'author': author->,
			'slug': slug.current,
			content,
			'tags': tags[] {
				_type == 'reference' => @->,  
			},
			_createdAt,
			_updatedAt
		}`;

		return await sanity.fetch(query)
	}

	async function setCurrentArticle() {
		articles = await fetchArticleContent()
	}
	
	async function initialize() {
		await setCurrentArticle();
		renderHTML();
	}
	
	function renderHTML() {
		const articlePage = document.querySelector('.article');
		articles.forEach(article => {
			const articleCreateDate = new Date(article._createdAt);
			const dateOptions = { year: 'numeric', month: 'long', day: 'numeric'}

			const articleImage = document.createElement('img');
			const articleTitle = document.createElement('h1');
			const articleByline = document.createElement('p');
			const articleTextContent = document.createElement('div');
			const tagsContainer = document.createElement('div');
			const tagsListContainer = document.createElement('ul');
			const tagTiltle = document.createElement('h2');

			article.content.forEach(element => {
				const articleTextElement = document.createElement('p');
				articleTextElement.innerText = element.children[0].text;

				if (element.style === 'h2') {
					articleTextElement.className = 'h2-bold';
				}

				articleTextContent.append(articleTextElement)
			})

			article.tags.forEach(element => {
				const tagElement = document.createElement('button');
				tagElement.innerText = element.name;
				tagElement.className = 'tag-button'

				tagsListContainer.append(tagElement)
			})
			
			articleImage.src = article.image;
			articleTitle.innerText = article.title;
			articleByline.innerText = `${articleCreateDate.toLocaleDateString('no-NO', dateOptions)} ● Written by ${article.author.name}`
			tagTiltle.innerText = 'Tags'

			
			articleTitle.className = 'article__title h1';
			articleImage.className = 'article__image';
			articleTextContent.className = 'article__text-content';
			articleByline.className = 'article__byline';
			tagsContainer.className = 'article__tags-container';
			tagsListContainer.className = 'article__tags-list';
			tagTiltle.className = 'article__tag-title h1';

			tagsContainer.prepend(
				tagTiltle,
				tagsListContainer
			)

			articlePage.append(
				articleImage,
				articleTitle,
				articleByline,
				articleTextContent,
				tagsContainer,
			)
		})
	}

	initialize()
}