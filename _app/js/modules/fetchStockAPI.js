import { API_KEY } from "../env.js";
import { hideLoading } from "./portfolio.js";

const userData = JSON.parse(localStorage.getItem('stockList'));
console.log(userData)

// function displayListOfStocks() {
// 	userData.forEach(stock => {
// 		async function fetchStockAPICopy() {
// 			let currentFetchValue = stock;
// 			let stockTicker = currentFetchValue;
// 			const baseURL = 'https://realstonks.p.rapidapi.com';
// 			const options = {
// 				method: 'GET',
// 				headers: {
// 					'X-RapidAPI-Key': `${API_KEY}`,
// 					'X-RapidAPI-Host': 'realstonks.p.rapidapi.com'
// 				}
// 			};
			
// 			const endpoint = `
// 			${baseURL}/
// 			${stockTicker}
// 			`;
			
// 			const response = await fetch(endpoint, options);
		
			
// 			try  {
// 				hideLoading()
// 				await handleResponse(response)
// 			} catch (error) {
// 				console.log(error)
// 			}
// 		}
// 		fetchStockAPICopy()
// 	});
// }
// console.log(displayListOfStocks())

export default async function fetchStockAPI(userDataStockTicker) {
	let currentFetchValue = 'CTXR';
	let stockTicker = currentFetchValue;
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
	${stockTicker}
	`;
	
	const response = await fetch(endpoint, options);

	
	try  {
		hideLoading()
		await handleResponse(response)
	} catch (error) {
		console.log(error)
	}
}

async function handleResponse(response) {
	if (response.ok) {
		const output = await response.json();
		// 
		// API function placeholder
		// 
		// console.log(fetchStockAPI())
		renderHTML(output)
		console.log(output.price)
		console.log(output)
		return output
	}
}

function renderHTML(APIOutput) {
	const userData = JSON.parse(localStorage.getItem('stockList'));
	const portfolioTableBody = document.querySelector('.portfolio__table-body');
	const marketValueText = document.querySelector('.portfolio__market-value-text');
	console.log(marketValueText)
	let marketValueTotal = 0;

	userData.forEach(localData => {
		marketValueTotal += Number(localData.quantity * APIOutput.price)
	})
	marketValueText.innerText = `$${Math.ceil(marketValueTotal)}`;

	if (userData) {
		userData.forEach(localData => {
			const totalGainCaltulation = (localData.quantity * APIOutput.price) - (localData.quantity * localData.cost);
			const totalGainCaltulationPercent = (APIOutput.price / localData.cost - 1) * 100;
			const marketValue = localData.quantity * APIOutput.price;
			
			console.log(localData.stockTicker, localData.quantity, localData.cost)
			const stockTableRow = document.createElement('tr');
			const stockSymbol = document.createElement('td');
			const stockPrice = document.createElement('td');
			const stockChange = document.createElement('td');
			const stockQuantity = document.createElement('td');
			const stockCost = document.createElement('td');
			const stockValue = document.createElement('td');
			const stockTotalGain = document.createElement('td');
			const editButtonBlock = document.createElement('td');
	
			stockSymbol.innerText = localData.stockTicker;
			stockPrice.innerText = APIOutput.price;
			stockChange.innerText = `${APIOutput.change_percentage}%`;
			stockQuantity.innerText = localData.quantity;
			stockCost.innerText = localData.cost;
			stockValue.innerText = marketValue.toLocaleString('en-US');
			stockTotalGain.innerText = `${totalGainCaltulation.toFixed(1).toLocaleString('en-US')} (${totalGainCaltulationPercent.toFixed(2)}%)`;
			editButtonBlock.innerHTML = `
				<button class="primary-button__small">
					Edit
				</button>`;
	
			stockSymbol.className = 'stock-info';
			stockPrice.className = 'stock-info';
			stockChange.className = 'stock-info';
			stockQuantity.className = 'stock-info';
			stockCost.className = 'stock-info';
			stockValue.className = 'stock-info';
			stockTotalGain.className = 'stock-info';
			editButtonBlock.className = 'stock-info edit-button';
			
			stockTableRow.append(
				stockSymbol,
				stockPrice,
				stockChange,
				stockQuantity,
				stockCost,
				stockValue,
				stockTotalGain,
				editButtonBlock,
			);
	
			portfolioTableBody.append(stockTableRow)
		})
	}
}


async function connectAPItoLocalStorage() {
	const localData = JSON.parse(localStorage.getItem('stockList'));
	localData.forEach(element => {
			const userDataStockTicker = element.ticker;
			fetchStockAPI(userDataStockTicker);
			// console.log(fetchStockAPI())
		}
	);
}

// connectAPItoLocalStorage()