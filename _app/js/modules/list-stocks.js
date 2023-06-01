import { API_KEY } from "../env.js";
import { hideLoading } from "../util/loading-spinner.js";

const userData = JSON.parse(localStorage.getItem('stockList'));
const portoliosSection = document.querySelector('.portfolio');
const errorText = document.createElement('h2');
errorText.className = 'error-text';


// For each object in the array, fetch the API for stock data
export default function listStocks() {
	if (userData && portoliosSection) {
		listOfStockDisplay()
	}
	
	// Fetches the API and returns the data
	async function listOfStockDisplay() {
		Promise.all(userData.map(stockTicker => fetchStockAPI(stockTicker)))
		.then(() => {
			hideLoading()
			renderTotalsContainer()
		})
	}
	
	// Calculates the total market value and total gain
	async function renderTotalsContainer() {
		let totalMarketValue = [];
		let totalGain = [];
		const listOfStockValue = document.querySelectorAll('.stock__value');
		const listOfStockGain = document.querySelectorAll('.stock__total-gain-number');
	
		// Regex removes all non-numeric characters
		listOfStockValue.forEach(element => {
			totalMarketValue.push(Number(element.innerText.replace(/[^0-9.-]+/g,"")))
		})
	
		listOfStockGain.forEach(element => {
			totalGain.push(Number(element.innerText.replace(/[^0-9.-]+/g,"")))
		})
		
		// Sum of all values in the array
		const totalValueSum = totalMarketValue.reduce((a, b) => a + b, 0);
		const totalGainSum = totalGain.reduce((a, b) => a + b, 0);
		
		const portfolioMarketValue = document.querySelector('.portfolio__market-value-text');
		const portfolioTotalGain = document.querySelector('.portfolio__total-gain-text');
	
		portfolioMarketValue.innerText = `$${totalValueSum.toLocaleString('en-US', {maximumFractionDigits: 2})}`;
		portfolioTotalGain.innerText = `$${totalGainSum.toLocaleString('en-US', {maximumFractionDigits: 2})}`;
	
		// Calculates the total gain percentage
		const totalGainPercentage = (totalValueSum - (totalValueSum - totalGainSum)) / (totalValueSum - totalGainSum) * 100;
	
		// Changes the color of the total gain text depending on the value
		if (totalGainSum > 0) {
			portfolioTotalGain.style.color = '#2DA700';
			portfolioTotalGain.innerHTML = `+${portfolioTotalGain.innerHTML} (${totalGainPercentage.toFixed(2)})%`
		} else if (totalGainSum < 0) {
			portfolioTotalGain.style.color = '#A71400';
			portfolioTotalGain.innerHTML = `${portfolioTotalGain.innerHTML} (${totalGainPercentage.toFixed(2)})%`
		} else {
			portfolioTotalGain.style.color = '#2E2C2F';
			portfolioTotalGain.innerHTML = `${portfolioTotalGain.innerHTML}`
		}
	}
	
	// Fetches the API and returns the data
	async function fetchStockAPI(stockTicker) {
		let currentFetchValue = stockTicker.stockTicker;
		
		const baseURL = 'https://realstonks.p.rapidapi.com';
		const options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': `${API_KEY}`,
				'X-RapidAPI-Host': 'realstonks.p.rapidapi.com'
			}
		};
		
		const endpoint = `
		${baseURL}/
		${currentFetchValue}
		`;
		
		const response = await fetch(endpoint, options);
		
		try  {
			await handleResponse(response)
		} catch (error) {
			console.log(error)
		};
	
		async function handleResponse(response) {
			if (response.ok) {
				const output = await response.json();
				renderHTML(output, stockTicker)
			} else if (response.status === 404) {
				errorText.innerText = '404 - Stock not found';
				throw new Error('404 - Stock not found');
			} else if (response.status > 499) {
				errorText.innerText = '500 - Server error';
				throw new Error('500 - Server error');
			} else if (response.status === 504) {
				errorText.innerText = '504 - Gateway timeout';
				throw new Error('504 - Gateway timeout');
			}
			portoliosSection.appendChild(errorText);
		}
	}
	
	function renderHTML(APIOutput, localUserData) {
		const portfolioTableHead = document.querySelector('.portfolio__thead');
		const portfolioTableBody = document.querySelector('.portfolio__table-body');
	
		// Calculations
		const totalGainCalculation = ((localUserData.quantity * APIOutput.price) - (localUserData.quantity * localUserData.cost));
		const totalGainCalculationText = totalGainCalculation.toLocaleString('en-US', {maximumFractionDigits: 2});
		const totalGainCalculationPercent = ((APIOutput.price / localUserData.cost - 1) * 100).toLocaleString('en-US', {maximumFractionDigits: 2});
		const marketValue = localUserData.quantity * APIOutput.price;
	
		// Creating HTML elements
		const stockTableRow = document.createElement('tr');
		const stockSymbol = document.createElement('td');
		const stockPrice = document.createElement('td');
		const stockChange = document.createElement('td');
		const stockQuantity = document.createElement('td');
		const stockCost = document.createElement('td');
		const stockValue = document.createElement('td');
		const stockTotalGain = document.createElement('td');
		const stockTotalGainNumber = document.createElement('div');
		const stockTotalGainPercent = document.createElement('div');
		
		// Populate text
		stockSymbol.innerText = localUserData.stockTicker;
		stockPrice.innerText = APIOutput.price;
		stockChange.innerText = `${APIOutput.change_percentage}%`;
		stockQuantity.innerText = localUserData.quantity;
		stockCost.innerText = localUserData.cost;
		stockValue.innerText = marketValue.toLocaleString('en-US');
		stockTotalGainNumber.innerText = totalGainCalculationText;
		stockTotalGainPercent.innerText = totalGainCalculationPercent;
		
		
		// Adding classes to HTML elements
		if (totalGainCalculation > 0) {
			stockTotalGainNumber.className = 'stock__total-gain-number stock__total-gain-number--positive';
			stockTotalGainPercent.className = 'stock__total-gain-percent stock__total-gain-percent--positive';
		} else if (totalGainCalculation < 0) {
			stockTotalGainNumber.className = 'stock__total-gain-number stock__total-gain-number--negative';
			stockTotalGainPercent.className = 'stock__total-gain-percent stock__total-gain-percent--negative';
		} else {
			stockTotalGainNumber.className = 'stock__total-gain-number';
			stockTotalGainPercent.className = 'stock__total-gain-percent';
			stockTotalGainPercent.style.display = 'none';
		}
		stockSymbol.className = 'stock__name stock-info';
		stockPrice.className = 'stock__price stock-info';
		stockChange.className = 'stock__change stock-info';
		stockQuantity.className = 'stock__quantity stock-info';
		stockCost.className = 'stock__cost stock-info';
		stockValue.className = 'stock__value stock-info';
		stockTotalGain.className = 'stock__total-gain stock-info';
		
		
		// Appending HTML elements
		stockTotalGain.append(
			stockTotalGainNumber,
			stockTotalGainPercent
		);

		
		/**
		 * @todo Fix this mess
		*/
		// Mobile version
		const mobileVersion = window.matchMedia('(max-width: 550px)');
		if (mobileVersion.matches) {
			console.log('mobile');
			const mobileTableRow1 = document.createElement('tr');
			const mobileTableRow2 = document.createElement('tr');
			const mobileTableRow3 = document.createElement('tr');

			portfolioTableHead.style.display = 'none';

			(mobileTableRow1).className = 'mobile__table-row';
			(mobileTableRow2).className = 'mobile__table-row';
			(mobileTableRow3).className = 'mobile__table-row';

			stockPrice.className = 'stock__price stock-info stock-info--mobile';
			stockSymbol.innerHTML = `<h2>${localUserData.stockTicker}</h2><p>Name</p>`;
			stockPrice.innerHTML = `<h2>${APIOutput.price}</h2><p>Price</p>`;
			stockChange.innerHTML = `<h2>${APIOutput.change_percentage}%</h2><p>Change</p>`;
			stockQuantity.innerHTML = `<h2>${localUserData.quantity}</h2><p>Quantity</p>`;
			stockCost.innerHTML = `<h2>${localUserData.cost}</h2><p>Cost / Share</p>`;
			stockValue.innerHTML = `<h2>${marketValue.toLocaleString('en-US')}</h2><p>Market Value</p>`;
			stockTotalGain.innerHTML = `<h2 class="mobile__total-gain">${totalGainCalculationText} (${totalGainCalculationPercent}%)</h2><p class="mobile__total-gain-text">Total Gain</p>`;

			mobileTableRow1.append(
				stockSymbol,
				stockPrice,
				stockChange,
			);

			mobileTableRow2.append(
				stockQuantity,
				stockCost,
				stockValue,
			);

			mobileTableRow3.append(
				stockTotalGain,
			);

			portfolioTableBody.append(
				mobileTableRow1,
				mobileTableRow2,
				mobileTableRow3,
			);
		} else {
			stockTableRow.append(
				stockSymbol,
				stockPrice,
				stockChange,
				stockQuantity,
				stockCost,
				stockValue,
				stockTotalGain,
			);
		}
				
		portfolioTableBody.append(stockTableRow);
	}
	
}
// export { renderHTML };