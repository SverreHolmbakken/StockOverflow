import { API_KEY } from "../env.js";

let currentFetchValue = 'TSLA';

export default async function fetchStockAPI() {
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
		renderHTML()
		console.log(output.price)
		console.log(output)
	}
}

function renderHTML() {
	
}