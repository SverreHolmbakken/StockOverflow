// This loader can be used when objects being fetched 
function displayLoading(section) {
	const portfolioSpinner = document.createElement('img');
	portfolioSpinner.className = 'loading-spinner'
	
	portfolioSpinner.src = "/_app/assets/icons/loader.svg"
	
	section.append(portfolioSpinner)
}

function hideLoading() {
	const portfolioSpinner = document.querySelector('.loading-spinner');
	portfolioSpinner.remove()
}

export { displayLoading }
export { hideLoading }