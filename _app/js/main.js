import header from "./modules/header.js";
import { readURL } from "./util/read-url.js";
import getArticleList from "./modules/get-article-list.js";
import renderArticlePage from "./modules/render-article-page.js";
import portfolio from "./modules/portfolio.js";

const portfolioSection = document.querySelector('.portfolio');
const blogSection = document.querySelector('.blog');

if (portfolioSection) {
	portfolio()
}

if (blogSection) {
	getArticleList()
}

if (readURL() !== undefined) {
	renderArticlePage()
}

header();