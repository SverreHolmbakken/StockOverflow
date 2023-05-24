import header from "./modules/header.js";
import portfolio from "./modules/portfolio.js";

const portfolioSection = document.querySelector('.portfolio');

if (portfolioSection) {
	portfolio()
}

header();
import { readURL } from "./util/read-url.js";
import getArticleList from "./modules/get-article-list.js";
import renderArticlePage from "./modules/render-article-page.js";

const blogSection = document.querySelector('.blog');

if (blogSection) {
	getArticleList()
}

if (readURL() !== undefined) {
	renderArticlePage()
}
