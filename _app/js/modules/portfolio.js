import fetchStockAPI from "./fetchStockAPI.js";
import stockDialog from "./stockDialog.js";

const portfolioGainRow = document.querySelector('.portfolio__total-gain-row');
const localData = localStorage.getItem('stockList');

let spinner = true;
export default function portfolio() {
	displayLoading()
	console.log(spinner)
	
	
	fetchStockAPI();
	stockDialog();
}

const portfolioSection = document.querySelector('.portfolio');
const portfolioSpinner = document.createElement('img');

function displayLoading() {
	portfolioSpinner.className = 'portfolio__spinner'
	
	portfolioSpinner.src = "../_app/assets/icons/loader.svg"
	
	portfolioSection.append(portfolioSpinner)
}

function hideLoading() {
	portfolioSpinner.remove()
}

export {hideLoading}

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

	noLocalStorageText.innerText = `Click 'Add stock' to start your journey`;

	noLocalStorageText.className = 'add-stock-reminder__text h2';

	portfolioSection.append(noLocalStorageText)
}
