import { displayLoading, hideLoading } from "../util/loading-spinner.js";
import fetchStockAPI from "./fetchStockAPI.js";
import stockDialog from "./stockDialog.js";

const portfolioGainRow = document.querySelector('.portfolio__total-gain-row');
const localData = localStorage.getItem('stockList');
const portfolioSection = document.querySelector('.portfolio');

export default function portfolio() {
	displayLoading(portfolioSection);
	stockDialog();
	
	if (localData) {
		const clearLocalStorageButton = document.createElement('button');
		
		clearLocalStorageButton.addEventListener('click', handleClearLocalStorage)
		
		clearLocalStorageButton.innerText = 'Clear all';
		clearLocalStorageButton.className = 'primary-button remove-button';
		
		portfolioGainRow.append(clearLocalStorageButton);
		
		function handleClearLocalStorage() {
			localStorage.clear()
			console.log('clear localstorage')
			location.reload()
		}
		
	} else {
		const noLocalStorageText = document.createElement('h2');
		hideLoading(portfolioSection);
		
		noLocalStorageText.innerText = `Click 'Add stock' to start your journey`;
		
		noLocalStorageText.className = 'add-stock-reminder__text h2';
		
		portfolioSection.append(noLocalStorageText)
	}
}